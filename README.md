# Echo Project Documentation

## Project Overview
Echo is a modular monolith application designed to provide a secure, multi-tenant environment for organization management and file storage. The system is built with a focus on type safety, scalability, and local-first development infrastructure.

## Core Architecture
The application follows a Service-Repository pattern within an Express.js framework, utilizing TypeScript for end-to-end type safety.

### 1. Identity and Access Management (IAM)
The project implements a multi-tenant hierarchy:
- Organizations: The top-level entity representing a company or group.
- Users: Individual accounts that can belong to one or multiple organizations.
- Memberships: A relational table that handles the many-to-many relationship between users and organizations, ensuring strict data isolation.

### 2. Echo Drive (File Storage Extension)
The file storage system is designed to be compatible with Amazon S3 but runs locally for development.
- Object Storage: Powered by MinIO running in a Podman container.
- Metadata Management: File details (size, mime-type, original name) are stored in PostgreSQL via Drizzle ORM.
- Security: Files are stored using a UUID-based key system to prevent collisions and are accessed via time-limited presigned URLs.

## Technical Stack
- Backend: Node.js with Express.js
- Language: TypeScript
- Database: PostgreSQL
- ORM: Drizzle ORM
- File Handling: Multer (Memory Storage)
- Storage Engine: MinIO (S3 Compatible)
- Infrastructure: Podman (Fedora-native containerization)
- Validation: Zod

## Infrastructure Setup

### Storage Engine
The storage engine is containerized to ensure environmental consistency.
- Port 9000: API communication.
- Port 9001: Web Console for administrative tasks.
- Persistence: Data is mapped to the host directory ~/minio_data with SELinux labeling (:Z) enabled for Fedora compatibility.

### Database Schema
The relational schema includes:
- Users table for authentication.
- Organizations table for multi-tenancy.
- Files table for object metadata tracking, including foreign key constraints linking files to their respective owners and organizations.

## Security Implementation
1. UUID Obfuscation: Physical filenames are never stored on disk. Instead, a Version 4 UUID is generated for every upload.
2. Path Isolation: Files are prefixed with the Organization ID in the storage bucket to provide logical partitioning of data.
3. Presigned URLs: Direct access to the storage bucket is blocked. Users must request a temporary, signed URL from the Echo API to view or download content.

## Development Environment
To maintain the project on Fedora:
1. Ensure the PostgreSQL service is active: sudo systemctl start postgresql.
2. Ensure the MinIO container is active: podman start echo-storage.
3. Synchronize database changes: npx drizzle-kit push.
4. Execute the development server: npm run dev.

## API Specification
- POST /api/auth: Handles user registration and organizational onboarding.
- POST /api/files/upload: Accepts multipart/form-data for object storage.
- GET /api/files/:id/download: Generates a temporary S3 presigned URL for secure retrieval.

