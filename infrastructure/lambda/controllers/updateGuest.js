const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');
const { ZodError } = require('zod');

const pusher = require('../utils/pusher');
const { jsonResponse } = require('../utils/response');
const {
  guestWithIdSchema,
} = require('../validation/guestSchema');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.updateGuest = async function (event) {
  try {
    const body = JSON.parse(event.body || '{}');

    const guest = guestWithIdSchema.parse(body);

    const normalizedEmail = guest.email.toLowerCase();
    const existingGuest = await db.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
        ProjectionExpression: 'id, email',
      })
    );

    if (
      existingGuest.Items?.some(
        (item) =>
          item.id !== guest.id &&
          item.email?.toLowerCase() === normalizedEmail
      )
    ) {
      return jsonResponse(409, {
        message: 'A guest with this email already exists',
      });
    }

    await db.send(
      new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: guest.id,
        },
        UpdateExpression:
          'set firstName = :firstName, lastName = :lastName, email = :email',
        ExpressionAttributeValues: {
          ':firstName': guest.firstName,
          ':lastName': guest.lastName,
          ':email': guest.email,
        },
      })
    );

    try {
      await pusher.trigger(
        'guests',
        'guest-updated',
        guest
      );
    } catch (pusherError) {
      console.error(
        'Failed to trigger Pusher guest-updated event:',
        pusherError
      );
    }

    return jsonResponse(200, {
      message: 'Guest updated successfully',
      guest,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonResponse(400, {
        message: error.issues[0].message,
      });
    }

    console.error(error);

    return jsonResponse(500, {
      message:
        'An unexpected error occurred while updating the guest.',
    });
  }
};