const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');
const { ZodError } = require('zod');

const { jsonResponse } = require('../utils/response');
const { guestSchema } = require('../validation/guestSchema');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.createGuest = async function (event) {
  try {
    const body = JSON.parse(event.body || '{}');

    const validatedGuest = guestSchema.parse(body);

    const guest = {
      id: randomUUID(),
      ...validatedGuest,
    };

    const existingGuest = await db.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': guest.email,
        },
      })
    );

    if (existingGuest.Items?.length > 0) {
      return jsonResponse(409, {
        message: 'A guest with this email already exists',
      });
    }

    await db.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: guest,
      })
    );

    return jsonResponse(201, {
      message: 'Guest added successfully',
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
      message: 'An unexpected error occurred while creating the guest.',
    });
  }
};