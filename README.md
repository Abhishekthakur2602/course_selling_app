# Course Selling App

A simple course-selling backend built with Node.js, Express, and MongoDB. The application includes user and admin authentication, protected admin course management, and a foundation for browsing and purchasing courses.

## Features

- User signup and signin with password hashing
- Admin signup and signin with separate JWT secrets
- Course creation, update, and deletion for admins
- MongoDB models for users, admins, courses, and purchases
- Input validation using Zod
- JWT-based authentication middleware for protected routes

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Zod for validation
- dotenv for environment variable management

## Project Structure

```text
course_selling_app/
├── index.js
├── schema.js
├── package.json
├── package-lock.json
├── .env
├── middlewares/
│   ├── auth-user.js
│   └── auth_admin.js
├── routes/
│   ├── admin.js
│   ├── course.js
│   └── user.js
└── README.md
```

## Prerequisites

Before running this app, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- A `.env` file configured with required environment variables

## Installation

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following values:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/course_selling_app
JWT_SECRET_USER=your_user_jwt_secret
JWT_SECRET_ADMIN=your_admin_jwt_secret
```

## Running the App

```bash
node index.js
```

The server will start on the port specified in your `.env` file.

## API Endpoints

### User Routes

Base path: `/api/v1/user`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Register a new user |
| POST | `/signin` | Login a user and receive a JWT |
| POST | `/enroll_course` | Placeholder for course enrollment |
| GET | `/purchase-courses` | Placeholder for purchased courses |

### Admin Routes

Base path: `/api/v1/admin`

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/signup` | Register a new admin |
| POST | `/signin` | Login an admin and receive a JWT |
| POST | `/create_course` | Create a course (requires admin auth) |
| PUT | `/course` | Update a course (requires admin auth) |
| DELETE | `/delete_course` | Delete a course (requires admin auth) |

### Course Routes

Base path: `/api/v1/course`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/courses` | Returns a list of courses |
| POST | `/purchase_course` | Placeholder for course purchase flow |

## Authentication

This application uses JWT-based authentication with separate secrets for users and admins:

- `JWT_SECRET_USER` for user authentication
- `JWT_SECRET_ADMIN` for admin authentication

The auth middleware validates the token and attaches the authenticated user/admin ID to the request object.

## Database Models

The app defines the following Mongoose schemas in `schema.js`:

- `User`
- `admin`
- `course`
- `purchase`

## Notes

This project appears to be a learning or demo backend for a course marketplace. Some routes are still scaffolded and may require additional implementation for full checkout and course browsing functionality.

## License

This project is licensed under the ISC license.

## Contributing

Feel free to fork the project and submit PRs for improvements, bug fixes, or additional features.
