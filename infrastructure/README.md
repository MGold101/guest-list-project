# Guest List Manager - Backend and Infrastructure

This directory contains the backend and AWS infrastructure for the Guest List Manager. The backend uses Node.js and AWS Lambda to handle guest registration, administrator authentication and guest list management. AWS CDK is used to define and deploy the cloud infrastructure.

For the full project overview and system architecture, see the [main README](../README.md).

## Backend Functionality

- Processes guest registrations and checks for duplicate email addresses.
- Enforces the configured maximum guest capacity.
- Sends registration confirmation emails using SendGrid.
- Handles administrator login and JWT-based authentication.
- Supports adding, editing, deleting and retrieving guest records.
- Stores guest information in Amazon DynamoDB.
- Publishes guest changes through Pusher for real-time administrator updates.

## AWS Services

- **AWS Lambda:** Runs the Node.js backend functionality.
- **Amazon API Gateway:** Provides API endpoints for frontend requests.
- **Amazon DynamoDB:** Stores registered guest records.
- **AWS CDK:** Defines and deploys the application's AWS infrastructure.

The backend also integrates with **SendGrid** for confirmation emails and **Pusher** for real-time guest list updates.

## Project Structure

```text
infrastructure/
├── bin/
├── lib/
├── lambda/
├── test/
├── .env.example
├── package.json
└── README.md
```

The `bin` and `lib` directories contain the AWS CDK application and infrastructure definitions. The `lambda` directory contains the backend code, including guest registration, administrator authentication and guest management functionality.

## Configuration and Deployment

Install the project dependencies from the `infrastructure` directory:

```bash
npm install
```

Create a local environment configuration file using `.env.example` as a reference. The required variables include:

```dotenv
FRONTEND_URLS=
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_JWT_SECRET=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
```

The maximum number of registered guests is configured separately through `MAX_GUESTS` in `lambda/config/guestConfig.js`.

Deployment requires an AWS account, configured AWS credentials and the AWS CDK tooling. The deployment scripts in `package.json` reference a specific AWS CLI profile, so this must be configured or adjusted for the AWS account being used.

Once the AWS environment and external service credentials have been configured, the CDK infrastructure can be bootstrapped and deployed using the project's npm scripts.

Do not commit actual passwords, JWT secrets or API keys to the repository.

## Frontend Integration

The frontend communicates with the backend through Amazon API Gateway. Administrator requests are routed through Next.js API routes, while the backend verifies authentication before allowing protected operations.

For frontend implementation and local development instructions, see the [Frontend README](../frontend/README.md).