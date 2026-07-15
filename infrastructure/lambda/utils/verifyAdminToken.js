const jwt = require('jsonwebtoken');

function verifyAdminToken(event) {
  const authorizationHeader =
    event.headers?.Authorization ||
    event.headers?.authorization;

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith('Bearer ')
  ) {
    return {
      isAuthorized: false,
      statusCode: 401,
      message: 'Authentication is required.',
    };
  }

  const token = authorizationHeader.slice(7);

  try {
    const payload = jwt.verify(
      token,
      process.env.ADMIN_JWT_SECRET
    );

    if (payload.role !== 'admin') {
      return {
        isAuthorized: false,
        statusCode: 403,
        message: 'You do not have permission to perform this action.',
      };
    }

    return {
      isAuthorized: true,
      payload,
    };
  } catch (error) {
    return {
      isAuthorized: false,
      statusCode: 401,
      message: 'Your session is invalid or has expired.',
    };
  }
}

module.exports = {
  verifyAdminToken,
};