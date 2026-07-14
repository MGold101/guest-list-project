const sendGrid = require('../utils/sendGrid');

async function sendGuestConfirmationEmail(guest) {
  const message = {
    to: guest.email,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: process.env.SENDGRID_FROM_NAME,
    },
    subject: 'Guest Registration Confirmed',

    text: `
Hi ${guest.firstName},

Thank you for confirming your attendance.

Your registration has been received successfully.

Registration Details

Name: ${guest.firstName} ${guest.lastName}
Email: ${guest.email}
Registration ID: ${guest.id}

We look forward to seeing you.
`.trim(),

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #172121;">
        <h1 style="color: #006D6F;">
          Registration Confirmed
        </h1>

        <p>
          Hi ${guest.firstName},
        </p>

        <p>
          Thank you for confirming your attendance.
        </p>

        <p>
          Your registration has been received successfully.
        </p>

        <h2 style="font-size:18px;">
          Registration Details
        </h2>

        <p>
          <strong>Name:</strong>
          ${guest.firstName} ${guest.lastName}
        </p>

        <p>
          <strong>Email:</strong>
          ${guest.email}
        </p>

        <p>
          <strong>Registration ID:</strong>
          ${guest.id}
        </p>

        <p>
          We look forward to seeing you.
        </p>
      </div>
    `,
  };

  await sendGrid.send(message);
}

module.exports = {
  sendGuestConfirmationEmail,
};