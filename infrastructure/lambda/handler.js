const {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
  loginAdmin,
} = require('./controllers');

const { emptyResponse, jsonResponse } = require('./utils/response');

exports.main = async function (event) {

  if (event.path === '/admin/login' && event.httpMethod === 'POST') {
  return loginAdmin(event);
  }

  if (event.httpMethod === 'OPTIONS') {
    return emptyResponse();
  }

  if (event.httpMethod === 'GET') {
    return getGuests(event);
  }

  if (event.httpMethod === 'POST') {
    return createGuest(event);
  }

  if (event.httpMethod === 'PUT') {
    return updateGuest(event);
  }

  if (event.httpMethod === 'DELETE') {
    return deleteGuest(event);
  }

  return jsonResponse(405, {
    message: 'Method not allowed',
  });
};