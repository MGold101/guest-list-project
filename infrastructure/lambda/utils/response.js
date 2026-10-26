const allowedOrigins = (process.env.FRONTEND_URLS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

let currentRequestOrigin = null;

function setRequestOrigin(origin) {
  currentRequestOrigin = origin || null;
}

function getHeaders() {
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    Vary: 'Origin',
  };

  if (allowedOrigins.includes(currentRequestOrigin)) {
    headers['Access-Control-Allow-Origin'] = currentRequestOrigin;
  }

  return headers;
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

function emptyResponse(statusCode = 204) {
  return {
    statusCode,
    headers: getHeaders(),
    body: '',
  };
}

module.exports = {
  setRequestOrigin,
  jsonResponse,
  emptyResponse,
};