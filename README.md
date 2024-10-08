# Backend Authentication and Authorization System

This project provides a basic backend system for user authentication, authorization, and profile management, built with Node.js, Express.js, and MongoDB. It includes features for signing up, logging in, updating the profile name, and editing the "About" section.

## Features
1. **User Authentication**
   - **Sign Up**: Allows users to create an account with email and password.
   - **Login**: Authenticates users with their credentials and returns a JWT token for secure access.

2. **User Authorization**
   - Secured API endpoints using JSON Web Tokens (JWT) to allow only authenticated users to access certain resources.

3. **Profile Management**
   - **Update Profile**: Users can update their profile name and "About" section after authentication.

## Tech Stack
- **Node.js**: JavaScript runtime environment used for server-side programming.
- **Express.js**: Web framework for Node.js to build APIs and handle HTTP requests.
- **MongoDB**: NoSQL database used for storing user data.
- **JWT (JSON Web Tokens)**: Used for securing the APIs through token-based authentication.

## API Endpoints

1. ### **Sign Up**
   - **URL**: `/api/signup`
   - **Method**: `POST`
   - **Description**: Creates a new user with email and password.
   - **Payload**: 
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**: 
     ```json
     {
       "message": "User created successfully"
     }
     ```

2. ### **Login**
   - **URL**: `/api/login`
   - **Method**: `POST`
   - **Description**: Authenticates the user and provides a JWT token.
   - **Payload**: 
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**: 
     ```json
     {
       "token": "jwt-token"
     }
     ```

3. ### **Update Profile**
   - **URL**: `/api/update`
   - **Method**: `PUT`
   - **Description**: Updates the profile name and "About" section of an authenticated user.
   - **Headers**: Requires `Authorization` header with a valid JWT token.
   - **Payload**: 
     ```json
     {
       "name": "New Name",
       "about": "New About Section"
     }
     ```
   - **Response**: 
     ```json
     {
       "message": "Profile updated successfully"
     }
     ```

## How to Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>

2. **Install Dependencies**:
   ```bash
   npm install
3. **Run the server**:
   ```bash
     npm start
#
The server will start at  http://localhost:5000.
#

 ### **Dependencies**
   - **express**: Web framework for Node.js
   - **mongoose**: MongoDB object modeling tool
   - **jsonwebtoken**: For creating and verifying JWT tokens
   - **bcryptjs**: For password hashing



### License
This project is licensed under the MIT License.

Contact
For any inquiries or issues, please contact the developer at rsp112004@gmail.com