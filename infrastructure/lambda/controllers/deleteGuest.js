const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { ZodError } = require('zod');

const { jsonResponse } = require('../utils/response');
const { guestIdSchema } = require('../validation/guestSchema');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.deleteGuest = async function (event) {
  try {
    const body = JSON.parse(event.body || '{}');

    const { id } = guestIdSchema.parse(body);

    await db.send(
      new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id,
        },
      })
    );

    return jsonResponse(200, {
      message: 'Guest deleted successfully',
      id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonResponse(400, {
        message: error.issues[0].message,
      });
    }

    console.error(error);

    return jsonResponse(500, {
      message: 'An unexpected error occurred while deleting the guest.',
    });
  }
};