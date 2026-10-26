# Guest List Manager - Frontend

This directory contains the frontend of the Guest List Manager, developed using Next.js, React, JavaScript and Tailwind CSS. It provides the public guest registration interface and the administrator interface for managing event guests.

For the full project overview, architecture and development background, see the [main README](../README.md).

## Features

- Guest registration form with Zod validation.
- Feedback for duplicate registrations and invalid inputs.
- Guest capacity restrictions.
- Administrator login and protected functionality.
- Guest management, including adding, editing and deleting records.
- Searching and sorting guests by first name, last name and email.
- CSV export of guest records.
- Real-time guest list updates using Pusher.
- Toast notifications when guests register through the public form.

## Frontend Structure

The frontend follows Atomic Design principles to organise reusable interface components.

```text
src/
├── app/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── context/
├── hooks/
├── services/
└── utils/
```

The `app` directory contains the application's pages and API routes. Components are organised into atoms, molecules and organisms, while contexts, hooks, services and utilities help separate application functionality from the interface.

## Running Locally

Install the dependencies from the `frontend` directory:

```bash
npm install
```

Create a `.env.local` file using `.env.example` as a reference:

```dotenv
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

A configured backend API and valid Pusher credentials are required for the relevant functionality to work correctly.

## Backend Integration

The frontend communicates with the AWS backend through Amazon API Gateway. Administrator requests are handled through Next.js API routes, while Pusher provides real-time updates when guest records change.

For information about the backend and AWS infrastructure, see the [Infrastructure README](../infrastructure/README.md).