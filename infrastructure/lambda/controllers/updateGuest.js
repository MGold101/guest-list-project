const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.updateGuest = async function (event) {
  const body = JSON.parse(event.body || '{}');

  const guest = {
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
  };

  if (!guest.email) {
    return jsonResponse(400, {
      message: 'Email is required',
    });
  }

  await db.send(
    new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        email: guest.email,
      },
      UpdateExpression: 'set firstName = :firstName, lastName = :lastName',
      ExpressionAttributeValues: {
        ':firstName': guest.firstName,
        ':lastName': guest.lastName,
      },
    })
  );

  return jsonResponse(200, {
    message: 'Guest updated successfully',
    guest,
  });
};