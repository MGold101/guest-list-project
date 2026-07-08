const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { ZodError } = require('zod');

const { jsonResponse } = require('../utils/response');
const { guestWithIdSchema } = require('../validation/guestSchema');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.updateGuest = async function (event) {
  try {
    const body = JSON.parse(event.body || '{}');

    const guest = guestWithIdSchema.parse(body);

    await db.send(
      new UpdateCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: guest.id,
        },
        UpdateExpression: 'set firstName = :firstName, lastName = :lastName, email = :email',
        ExpressionAttributeValues: {
          ':firstName': guest.firstName,
          ':lastName': guest.lastName,
          ':email': guest.email,
        },
      })
    );

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

    return jsonResponse(500, {
      message: 'Failed to update guest',
    });
  }
};