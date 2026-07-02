const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.createGuest = async function (event) {
  const body = JSON.parse(event.body || '{}');

  const guest = {
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
  };

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
};