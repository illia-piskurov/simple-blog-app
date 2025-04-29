# simple-blog-app

A simple blog with user registration, post creation, commenting, and user profiles. The backend is built with NestJS, and the frontend is developed with NextJS. This project serves as a demonstration of web development fundamentals and creating a functional blog with modern technologies.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

- **`backend/`**: Contains the NestJS application, which is responsible for handling the API, database interactions, and business logic.
- **`frontend/`**: Contains the NextJS application, which is the user interface of the blog.

## Running the Application

Here's how to get the application up and running:

1. **Navigate to the Backend Directory:** 
   ```bash
   cd backend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start the Development Server**
   ```bash
   npm run start:dev
   ```

### Backend (NestJS)
The backend is built with NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. It follows the modular architecture and uses decorators and TypeScript to promote clean, maintainable code.

This backend provides a RESTful API for user authentication, post creation, commenting, and user profile management. It uses:

@nestjs/jwt and passport-jwt for implementing secure JWT-based authentication.

@nestjs/swagger for auto-generating interactive API documentation via Swagger UI.

The application follows best practices for separation of concerns, using services, controllers, and modules to organize business logic, API routing, and data persistence.