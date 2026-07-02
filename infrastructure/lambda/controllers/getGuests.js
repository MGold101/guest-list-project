const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.getGuests = async function () {
  const result = await db.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  return jsonResponse(200, {
    guests: result.Items || [],
  });
};