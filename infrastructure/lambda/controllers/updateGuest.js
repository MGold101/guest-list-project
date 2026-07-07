const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.updateGuest = async function (event) {
  const body = JSON.parse(event.body || '{}');

  const guest = {
    id: body.id?.trim(),
    email: body.email?.trim(),
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
  };

  if (!guest.id || !guest.email || !guest.firstName || !guest.lastName) {
    return jsonResponse(400, {
      message: 'ID, first name, last name and email are required',
    });
  }

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
};