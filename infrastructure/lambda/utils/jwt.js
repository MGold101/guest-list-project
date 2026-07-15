const jwt = require('jsonwebtoken');

function generateAdminToken() {
  return jwt.sign(
    {
      role: 'admin',
    },
    process.env.ADMIN_JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );
}

module.exports = {
  generateAdminToken,
};