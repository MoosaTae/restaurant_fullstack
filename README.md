# Restaurant Reservation application

# Installation

We have 2 ways to install this application:

## 1. Docker

1. Install [docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/install/) if you don't have them already.
2. Run docker compose (-d is for detach)

    ```sh
      docker compose up
    ```

3. (optional) if you want to **rebuild** it
    ```sh
      docker compose down
      docker compose up --build
    ```

## 2. NPM

## Pre-requisities

-   [Node](https://nodejs.org/en/download/package-manager) for frontend, using nextjs
-   [Bun](https://bun.sh/) for backend, using elysiajs with bun

### Frontend

1. Navigate to frontend directory
    ```sh
      cd frontend
    ```
2. Install depencies
    ```sh
      npm install
    ```

### Backend

1. Navigate to backend directory
    ```sh
      cd backend
    ```
2. Install depencies
    ```sh
        bun install
    ```

## Usage

### Frontend

1. Start the frontend development server
    ```sh
      npm start
    ```
2. Open your browser and visit http://localhost:3001

### Backend

1. Start the backend server
    ```sh
        bun run start
    ```
2. Open your browser and visit http://localhost:3000 and `document on`: http://localhost:3000/swagger
