# Echo Authentication Backend

A robust, multi-tenant authentication system built with TypeScript, Node.js, and PostgreSQL. This project implements a Service-Oriented Architecture (SOA) and Role-Based Access Control (RBAC) to handle complex user-organization relationships.

## Core Features

- Multi-tenancy: Users can belong to multiple organizations with specific roles.
- Role-Based Access Control (RBAC): Preset roles (OWNER, ADMIN, MEMBER) managed via PostgreSQL Enums.
- Secure Authentication: Password hashing using the Argon2 algorithm.
- Database Transactions: Atomic registration flow ensuring data integrity across Users, Organizations, and Memberships.
- Type Safety: End-to-end typing using TypeScript and Zod for runtime validation.
- Modern Tooling: Database management with Drizzle ORM and Drizzle Kit.

## Technical Stack

- Runtime: Node.js (ES Modules)
- Language: TypeScript
- Framework: Express.js
- Database: PostgreSQL
- ORM: Drizzle ORM
- Validation: Zod
- Security: Argon2, JSON Web Tokens (JWT)

## Project Structure

- src/db: Database connection and schema definitions.
- src/services: Business logic and database interaction.
- src/routes: API endpoint definitions.
- src/types: TypeScript interfaces and Zod validation schemas.

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/echo-saas.git

2. Install dependencies:
   npm install

3. Configure environment variables:
   Create a .env file in the root directory and provide the following:
   DATABASE_URL=postgres://username:password@localhost:5432/echo_db
   JWT_SECRET=your_jwt_secret_key
   PORT=6969

## Database Management



This project uses Drizzle Kit for schema synchronization.

Push schema to database:
npx drizzle-kit push

Open Drizzle Studio (Database GUI):
npx drizzle-kit studio

## API Endpoints

### Authentication

POST /api/auth/register
Registers a new user, creates their primary organization, and assigns the OWNER role within a single transaction.

POST /api/auth/login
Authenticates a user and returns a JWT for subsequent requests.

## Development

To start the development server with hot-reloading:
npm run dev

## License

MIT
