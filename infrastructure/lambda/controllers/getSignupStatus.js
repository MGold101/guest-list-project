const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const { MAX_GUESTS } = require('../config/guestConfig');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.getSignupStatus = async function () {
  try {
    const result = await db.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
        Select: 'COUNT',
      })
    );

    const guestCount = result.Count || 0;
    const remaining = Math.max(MAX_GUESTS - guestCount, 0);

    return jsonResponse(200, {
      isOpen: guestCount < MAX_GUESTS,
      remaining,
    });
  } catch (error) {
    console.error(error);

    return jsonResponse(500, {
      message: 'An unexpected error occurred while checking signup availability.',
    });
  }
};