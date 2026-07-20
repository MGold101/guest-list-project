const { getGuests } = require('./getGuests');
const { createGuest } = require('./createGuest');
const { updateGuest } = require('./updateGuest');
const { deleteGuest } = require('./deleteGuest');
const { loginAdmin } = require('./loginAdmin');
const { getSignupStatus } = require('./getSignupStatus');

module.exports = {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
  loginAdmin,
  getSignupStatus,
};