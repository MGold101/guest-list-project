const {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
  loginAdmin,
  getSignupStatus,
} = require('./controllers');

const { emptyResponse, jsonResponse } = require('./utils/response');
const { verifyAdminToken } = require('./utils/verifyAdminToken');

const API_ENABLED = true;

function addSourceToRequest(event, source) {
  const body = JSON.parse(event.body || '{}');

  return {
    ...event,
    body: JSON.stringify({
      ...body,
      source,
    }),
  };
}

exports.main = async function (event) {
  const path = event.path;
  const method = event.httpMethod;

  if (method === 'OPTIONS') {
    return emptyResponse();
  }

  if (!API_ENABLED) {
    return jsonResponse(503, {
      message: 'Service temporarily unavailable.',
    });
  }

  if (path === '/admin/login' && method === 'POST') {
    return loginAdmin(event);
  }

  if (path === '/guest/signup-status' && method === 'GET') {
    return getSignupStatus();
  }

  if (path === '/guest/signup' && method === 'POST') {
    const guestSignupEvent = addSourceToRequest(
      event,
      'guest-signup'
    );

    return createGuest(guestSignupEvent);
  }

  if (path === '/admin/guests') {
    const authentication = verifyAdminToken(event);

    if (!authentication.isAuthorized) {
      return jsonResponse(authentication.statusCode, {
        message: authentication.message,
      });
    }

    if (method === 'GET') {
      return getGuests(event);
    }

    if (method === 'POST') {
      const adminCreateEvent = addSourceToRequest(
        event,
        'admin'
      );

      return createGuest(adminCreateEvent);
    }

    if (method === 'PUT') {
      return updateGuest(event);
    }

    if (method === 'DELETE') {
      return deleteGuest(event);
    }

    return jsonResponse(405, {
      message: 'Method not allowed.',
    });
  }

  return jsonResponse(404, {
    message: 'Route not found.',
  });
};