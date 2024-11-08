# Node.js Authentication & Movie Management API

This is a Node.js REST API project for user authentication, user management, and CRUD operations on a movie database using MongoDB. The API is secured with JWT-based authentication, ensuring that users must be logged in to access movie-related endpoints.

## Table of Contents

- [Features](#features)

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)

  - [Environment Variables](#environment-variables)

- [Usage](#usage)

  - [Authentication](#authentication)

  - [Movie Management](#movie-management)

- [API Endpoints](#api-endpoints)

  - [User Authentication & Management](#user-authentication--management)

  - [Movies API](#movies-api)

- [Testing with Postman](#testing-with-postman)

---

## Features

- **User Authentication**: JWT-based login and signup, providing access tokens for authenticated requests.

- **User Management**: Update user profiles including fields like email, name, and about.

- **Movie CRUD Operations**: Create, read, update, and delete movies from a MongoDB database, with optional filtering and pagination.

- **Role-based Security**: Access to movie endpoints requires user authentication.

---

## Getting Started

### Prerequisites

- Node.js and npm

- MongoDB instance (local or cloud)

### Installation

1\. Clone the repository:

```bash

git clone https://github.com/your-username/your-repo-name.git

   cd your-repo-name
```

2\. Install dependencies:

```bash
   npm install
```

### Environment Variables

Create a `.env` file with the following environment variables:

```plaintext

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PORT=your_preferred_port

```

## Usage

1\. **Run the API server**:

```bash
   npm start
```

2\. The server should now be running on `http://localhost:<PORT>`.

### Authentication

The API requires users to be authenticated via JWT tokens. Obtain a token by logging in or signing up, and include it in requests to endpoints under `/api/movies` for secure access.

### Movie Management

Once logged in, users can use their token to access and manage movies in the database, performing actions like fetching, adding, updating, or deleting movies.

---

## API Endpoints

### User Authentication & Management

#### POST `/api/login`

- **Description**: Log in a user to obtain a JWT token.

- **Request**:

  - Body:

```json

    {

      "email": "user@example.com",

      "password": "your_password"

    }

```

- **Responses**:

  - `200 OK`: Returns access and refresh tokens.

  - `400 Bad Request`: Invalid email or password.

  - `404 Not Found`: User not found.

#### POST `/api/signup`

- **Description**: Register a new user and obtain a JWT token.

- **Request**:

  - Body:

```json

    {

      "name": "User Name",

      "email": "user@example.com",

      "password": "your_password"

    }

```

- **Responses**:

  - `200 OK`: Signup successful, tokens issued.

  - `400 Bad Request`: Email already registered or missing fields.

#### PATCH `/api/update`

- **Description**: Update user details (name, email, and about).

- **Request**:

  - Header: `Authorization: Bearer <JWT_TOKEN>`

  - Body:

```json

    {

      "name": "New Name",

      "email": "new_email@example.com",

      "about": "Updated information"

    }

```

- **Responses**:

  - `200 OK`: User information updated successfully.

  - `400 Bad Request`: Missing fields or invalid data.

  - `404 Not Found`: User not found.

#### POST `/api/verify`

- **Description**: Verify the validity of JWT and refresh tokens.

- **Request**:

  - Body:
```json

    {

      "jwttoken": "<JWT_TOKEN>",

      "refreshtoken": "<REFRESH_TOKEN>"

    }

```

- **Responses**:

  - `200 OK`: Tokens are valid.

  - `400 Bad Request`: Token expired or invalid.

### Movies API

> **Note**: Requires JWT token in the `Authorization` header.

#### GET `/api/movies`

- **Description**: Retrieve a paginated list of movies.

- **Request**:

  - Query Parameters:

    - `limit`: Number of movies per page (default: 10).

    - `page`: Page number to fetch (default: 1).

    - `category`: Filter movies by category.

    - `q`: Search query for movie title or description.

- **Responses**:

  - `200 OK`: Returns a list of movies.

  - `400 Bad Request`: Invalid request parameters.

#### POST `/api/movies`

- **Description**: Add a new movie to the database.

- **Request**:

  - Header: `Authorization: Bearer <JWT_TOKEN>`

  - Body:

```json

    {

      "name": "Movie Title",

      "description": "Description of the movie",

      "category": "Genre",

      "thumbnail": "URL to the thumbnail image"

    }

```

- **Responses**:

  - `201 Created`: Movie added successfully.

  - `400 Bad Request`: Missing required fields.

#### PATCH `/api/movies/{id}`

- **Description**: Update details of an existing movie by ID.

- **Request**:

  - Header: `Authorization: Bearer <JWT_TOKEN>`

  - Path Parameter: `id` of the movie to update.

  - Body:
```json

    {

      "name": "Updated Title",

      "description": "Updated description",

      "category": "Updated category",

      "thumbnail": "Updated thumbnail URL"

    }

```

- **Responses**:

  - `200 OK`: Movie updated successfully.

  - `400 Bad Request`: Bad request, missing required fields.

  - `404 Not Found`: Movie not found.

#### DELETE `/api/movies/{id}`

- **Description**: Delete a movie from the database by ID.

- **Request**:

  - Header: `Authorization: Bearer <JWT_TOKEN>`

  - Path Parameter: `id` of the movie to delete.

- **Responses**:

  - `200 OK`: Movie deleted successfully.

  - `404 Not Found`: Movie not found.

---

## Testing with Postman

- **Login/Signup**: Use `/api/login` and `/api/signup` to obtain a JWT.

- **Bearer Token**: For endpoints under `/api/movies`, add the JWT as a Bearer token in the `Authorization` section in Postman.

---

## License

This project is open-source and available under the MIT License.

---
Contact
For any inquiries or issues, please contact the developer at rsp112004@gmail.com