# API Gateway

FRONTEND  - MIDDLE-END - BACKEND

## Overview

- We need an intermediate layer between the client side and the microservices
- Using this middle end, when client sends request we will be able to make decision that which microservice
should actually respond to this request
- We can do message validation, response transformation, rate limiting
- We try to prepare an API Gateway that acts as this middle end.

This project implements an API Gateway using Node.js and Express.js, providing authentication, rate limiting, logging, and request routing to microservices.

## Features

- **Rate Limiting**: Limits requests to 5 per IP within 2 minutes to prevent abuse.
- **Authentication**: Validates JWT tokens for protected routes by communicating with an authentication service.
- **Request Proxying**: Routes requests to appropriate microservices (e.g., booking service).
- **Logging**: Uses Morgan for HTTP request logging.
- **Health Check**: Provides a simple `/home` endpoint for health checks.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/akshaypandey28/API-Gateway.git
   cd API-Gateway
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

   The server will run on port 3005.

2. The API Gateway expects microservices to be running on:
   - Authentication service: `http://localhost:3001`
   - Booking service: `http://localhost:3002`

## API Endpoints

- `GET /home`: Health check endpoint. Returns `{"message":"Ok"}`.
- `/bookingservice/*`: Protected routes that require authentication. Proxies to the booking service after token validation.

## Dependencies

- `express`: Web framework for Node.js.
- `axios`: HTTP client for making requests to the authentication service.
- `express-rate-limit`: Middleware for rate limiting.
- `http-proxy-middleware`: Proxy middleware for routing requests.
- `morgan`: HTTP request logger.
- `nodemon`: Development tool for auto-restarting the server.
- `pm2`: Process manager for production.