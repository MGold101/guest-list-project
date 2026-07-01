const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.main = async function (event) {
  const tableName = process.env.TABLE_NAME;

  if (event.httpMethod === 'GET') {
    const result = await db.send(
      new ScanCommand({
        TableName: tableName,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        guests: result.Items || [],
      }),
    };
  }

  if (event.httpMethod === 'POST') {
    const body = JSON.parse(event.body || '{}');

    const guest = {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    await db.send(
      new PutCommand({
        TableName: tableName,
        Item: guest,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Guest added successfully',
        guest,
      }),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({
      message: 'Method not allowed',
    }),
  };
};