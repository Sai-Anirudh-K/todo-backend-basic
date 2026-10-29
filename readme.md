# TODO REST API

A REST API for managing TODO tasks built using **Node.js, Express.js, MongoDB, Mongoose, and Zod**.

## Tech Stack

- JavaScript, Node.js, Express.js
- MongoDB and Mongoose
- Zod for request validation

## Features

- Create, read, update, and delete TODOs.
- Toggle TODO completion status.
- Validate request data using Zod.
- Handle errors with appropriate HTTP status codes.
- Store TODOs persistently in MongoDB.

## API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| POST   | `/todos`            | Create a TODO            |
| GET    | `/todos`            | Get all TODOs            |
| GET    | `/todos/:id`        | Get a TODO by ID         |
| PUT    | `/todos/:id`        | Update a TODO            |
| PATCH  | `/todos/:id/toggle` | Toggle completion status |
| DELETE | `/todos/:id`        | Delete a TODO            |

## Setup and Installation

Clone the repository and install dependencies:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd todo-backend
npm install
```

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
PORT=3000
```

Start the server:

```bash
node src/index.js
```

The API runs at `http://localhost:3000`.

## Project Structure

```text
todo-backend/
├── src/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── db.js
│   └── index.js
├── screenshots/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Screenshots

API testing screenshots using Postman are available in the [`screenshots/`](screenshots/) folder.

## License

Created for educational purposes as part of a backend CRUD assignment.
