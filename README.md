# Currency Exchange App

The Currency Exchange App is a full stack application that provides currency conversion rates and allows users to view the highest and lowest rates within a specified date range. The backend interacts with the ExchangeRateAPI to fetch real-time conversion rates, and the frontend enables users to interact with the application.

## Features

### Currency Conversion
- Pulls currency conversion rates from the ExchangeRateAPI.
- Allows users to select a currency and date to view conversion rates.

### Find Extremes
- Users can choose a pair of currencies and a date range.
- The app finds the highest and lowest conversion rates within that range.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- Docker installed for creating the MariaDB database container.

#### Environment Variables
Create a `.env` file in the `src/api` directory with the following placeholders:
```ER_API_KEY=YOUR_EXCHANGE_RATE_API_KEY
DB_USER=YOUR_DATABASE_USER
DB_NAME=YOUR_DATABASE_NAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

#### Install Dependencies:
Navigate to the `src/api` directory. Run `npm install` to install the required dependencies.

### Create Database:
Create a Docker container for MariaDB by running the following command:
    ```bash
    docker run --name mariadb -e MYSQL_ROOT_PASSWORD=your_root_password -e MYSQL_DATABASE=YOUR_DATABASE_NAME -e MYSQL_USER=YOUR_DATABASE_USER -e MYSQL_PASSWORD=YOUR_DATABASE_PASSWORD -p 3306:3306 -d mariadb
    ```

#### Start the Server:
Run `node src/api/server.js` to start the backend server.

### Running the Frontend

#### Install Dependencies:
Navigate to the `src/app` directory. Run `npm install` to install the required dependencies.

#### Start the Frontend Server:
Run `npm start` to start the frontend server. The application should now be running on `http://localhost:3000`.

## Notes
- The app minimizes API calls by checking the database first before fetching from the API.
- Customize the frontend to interact with these endpoints.
