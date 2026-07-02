const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.deleteGuest = async function (event) {
  const body = JSON.parse(event.body || '{}');
  const { email } = body;

  if (!email) {
    return jsonResponse(400, {
      message: 'Email is required',
    });
  }

  await db.send(
    new DeleteCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        email,
      },
    })
  );

  return jsonResponse(200, {
    message: 'Guest deleted successfully',
    email,
  });
};