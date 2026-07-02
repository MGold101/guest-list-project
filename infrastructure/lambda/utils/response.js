const headers = {
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

function emptyResponse(statusCode = 200) {
  return {
    statusCode,
    headers,
    body: '',
  };
}

module.exports = {
  jsonResponse,
  emptyResponse,
};