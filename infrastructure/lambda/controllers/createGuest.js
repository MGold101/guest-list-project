const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { jsonResponse } = require('../utils/response');
const { randomUUID } = require('crypto');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.createGuest = async function (event) {
  const body = JSON.parse(event.body || '{}');

  const guest = {
    id: randomUUID(),
    email: body.email?.trim(),
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
  };

  if (!guest.email || !guest.firstName || !guest.lastName) {
    return jsonResponse(400, {
      message: 'First name, last name and email are required',
    });
  }

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
};