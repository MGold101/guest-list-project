const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.deleteGuest = async function (event) {
  const body = JSON.parse(event.body || '{}');
  const id = body.id?.trim();

  if (!id) {
    return jsonResponse(400, {
      message: 'Guest ID is required',
    });
  }

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
};