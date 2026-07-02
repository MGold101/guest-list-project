const { getGuests } = require('./getGuests');
const { createGuest } = require('./createGuest');
const { updateGuest } = require('./updateGuest');
const { deleteGuest } = require('./deleteGuest');

module.exports = {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
};