const { jsonResponse } = require('../utils/response');

exports.loginAdmin = async function (event) {
  try {
    const body = JSON.parse(event.body || '{}');

    const username = body.username?.trim();
    const password = body.password?.trim();

    if (!username || !password) {
      return jsonResponse(400, {
        message: 'Username and password are required.',
      });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return jsonResponse(401, {
        message: 'Invalid username or password.',
      });
    }

    return jsonResponse(200, {
      message: 'Login successful.',
    });
  } catch (error) {
    console.error(error);

    return jsonResponse(500, {
      message: 'An unexpected error occurred while logging in.',
    });
  }
};