const { z } = require('zod');

const guestSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .transform((email) => email.toLowerCase()),
  source: z.enum(['admin', 'guest-signup']).default('admin'),
});

const guestWithIdSchema = guestSchema.omit({
  source: true,
}).extend({
  id: z.string().trim().min(1, 'Guest ID is required'),
});

const guestIdSchema = z.object({
  id: z.string().trim().min(1, 'Guest ID is required'),
});

module.exports = {
  guestSchema,
  guestWithIdSchema,
  guestIdSchema,
};