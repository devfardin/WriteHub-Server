# WriteHub Server

WriteHub Server is the backend system for managing the WriteHub blogging platform. This server is built using modern web technologies and follows best practices to ensure scalability, security, and performance.

## Technologies Used
- **TypeScript**: For type safety and enhanced development experience.
- **Node.js**: To handle server-side operations.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB with Mongoose**: For database management and modeling.
- Additional Node.js packages for optimized performance and feature implementation.

## Features
### User Management
- **Roles**: 
  - **User**: Can create an account, manage their own blogs, and perform CRUD operations on their own content.
  - **Admin**: Has elevated privileges to manage users and blogs across the platform.
- **Authorization**:
  - Only authorized users can create, update, or delete blogs.
  - Unauthorized access is restricted with secure authentication mechanisms.

### Blog Management
- Users can:
  - Create their own blogs.
  - Update and delete their blogs.
- Admins can:
  - Delete any blog using its blog ID.

### Admin Privileges
- Admins have the power to:
  - Block or delete users.
  - Manage all blogs within the platform.

## Security Features
- **Authentication**: Ensures secure access to the server through JWT-based authentication.
- **Role-Based Access Control**: Restricts functionality based on the user role (User or Admin).

## Data Models
### 1. User
- Name
- Email
- Password
- Role (User/Admin)
- IsBlocked (boolean)

### 2. Blog
- Title
- Content
- Author (linked to the User model)
- Timestamps for created and updated entries

## Getting Started
### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
