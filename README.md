# Authentication

A self-hosted JWT authentication service

# Requirements

- A PostgreSQL database called "authentication"
- Node.JS

# Installation

- Create a .env file containing the following variables
  - DATABASE_HOST
  - DATABASE_USERNAME
  - DATABASE_PASSWORD
  - DATABASE_PORT

  - JWT_ACCESS_SECRET
  - JWT_REFRESH_SECRET

  - CORS_ORIGIN

  - PORT - The port for the service to be exposed through (OPTIONAL)
- Install dependencies with `npm install`
- Run with `node main.js`