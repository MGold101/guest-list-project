const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, DeleteCommand} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
};

exports.main = async function (event) {
  const tableName = process.env.TABLE_NAME;

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'GET') {
    const result = await db.send(
      new ScanCommand({
        TableName: tableName,
      })
    );

    return {
      statusCode: 200,
      headers,
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
      headers,
      body: JSON.stringify({
        message: 'Guest added successfully',
        guest,
      }),
    };
  }

  if (event.httpMethod === 'DELETE') {
    const email = event.queryStringParameters?.email;

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: 'Email is required',
        }),
      };
    }

    await db.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          email,
        },
      })
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Guest deleted successfully',
      }),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({
      message: 'Method not allowed',
    }),
  };
};