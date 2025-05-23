# Twitter Clone MERN Stack Project

## Overview

This project is a full-featured Twitter clone built using the MERN stack (MongoDB, Express.js, React, Node.js). It implements core Twitter functionalities including user authentication, posting tweets with images, likes, comments, reposts, user profiles, and notifications.

## Technologies Used

### Backend

- **Node.js** and **Express.js** for the server
- **MongoDB** with **Mongoose** for database management
- **JWT** for authentication
- **Cloudinary** for image storage and management
- **bcryptjs** for password hashing

### Frontend

- **React 19** with **TypeScript**
- **Vite** as the build tool
- **React Router** for navigation
- **React Query** for data fetching and state management
- **React Hook Form** with **Zod** for form validation
- **TailwindCSS** for styling
- **Radix UI** components for accessible UI elements
- **Sonner** for toast notifications
- **Theme Provider** for light/dark mode support

## Features

### Authentication

- User registration and login
- Protected routes for authenticated users
- JWT-based authentication with cookies

### Posts

- Create posts with text and/or images
- Like/unlike posts
- Comment on posts
- Repost functionality
- Delete posts (with Cloudinary image cleanup)
- View post details

### User Profiles

- Customizable profile with name, username, bio, profile image, and cover image
- Follow/unfollow users
- View user's posts, likes, and other activity

### Feed

- Home feed with posts from all users
- Following feed with posts from followed users
- Profile-specific feeds

### Notifications

- Receive notifications for likes and follows
- Mark notifications as read

### UI/UX

- Responsive design for mobile and desktop
- Light and dark mode support
- Real-time updates with React Query

## Project Structure

### Backend

```
backend/
├── controllers/       # Route controllers for handling API requests
├── db/                # Database connection setup
├── lib/               # Utility functions
├── middleware/        # Express middleware (auth, etc.)
├── models/            # Mongoose models for MongoDB
├── routes/            # API route definitions
└── server.js          # Main server entry point
```

### Frontend

```
frontend/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images and other assets
│   ├── components/    # Reusable React components
│   ├── constant/      # Constants and configuration
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Page layout components
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── routes/        # Routing configuration
│   ├── services/      # API service functions
│   ├── types/         # TypeScript type definitions
│   └── validations/   # Form validation schemas
└── main.tsx           # Main entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or Atlas)
- Cloudinary account for image storage

### Backend Setup

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/twitter-clone-mern.git
   cd twitter-clone-mern
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory

   ```bash
   cd frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Theme Support

The application includes a theme provider that supports light, dark, and system themes. The theme is stored in localStorage and automatically applied based on user preference or system settings.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user

### Users

- `GET /api/user/:username` - Get user profile
- `PUT /api/user/update` - Update user profile
- `POST /api/user/follow/:id` - Follow a user
- `POST /api/user/unfollow/:id` - Unfollow a user

### Posts

- `GET /api/post/all` - Get all posts
- `GET /api/post/following` - Get posts from followed users
- `GET /api/post/:id` - Get a specific post
- `POST /api/post/create` - Create a new post
- `DELETE /api/post/delete/:id` - Delete a post
- `POST /api/post/like/:id` - Like/unlike a post
- `POST /api/post/comment/:id` - Comment on a post
- `DELETE /api/post/comment/:postId/:commentId` - Delete a comment

### Notifications

- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/read` - Mark notifications as read

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
