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

#### Prerequisites
- Node.js installed on your machine.
- Docker installed for creating the MariaDB database container.

### Development Environment

#### Environment Variables
Create a `.env` file in the `src/api` directory with the following placeholders:
```ER_API_KEY=YOUR_EXCHANGE_RATE_API_KEY
DB_USER=YOUR_DATABASE_USER
DB_NAME=YOUR_DATABASE_NAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
```

#### Create Database:
1. Create a Docker container for MariaDB by running the following command in your terminal:
    ```docker run --name mariadb -e MYSQL_ROOT_PASSWORD=YOUR_DATABASE_PASSWORD -e MYSQL_DATABASE=YOUR_DATABASE_NAME -e MYSQL_USER=YOUR_DATABASE_USER -p 3306:3306 -d mariadb
    ```
2. Connect to the MariaDB container using the following command:
    ```docker exec -it mariadb mariadb -uroot -p'YOUR_DATABASE_PASSWORD'```
3. Inside the MariaDB shell, create the myTable with the specified columns:
    ```CREATE TABLE myTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(255) NOT NULL,
    date DATE,
    rates JSON
    );
    ```

#### Install Dependencies:
Navigate to the `src/api` directory. Run `npm install` to install the required dependencies.

#### Start the Server:
Run `node src/api/server.js` to start the backend server. The backend server should now be running on `http://localhost:5000`.

#### Running the Frontend

#### Install Dependencies:
Navigate to the `src/app` directory. Run `npm install` to install the required dependencies.

#### Start the Frontend Server:
Run `npm start` to start the frontend server. The application should now be running on `http://localhost:3000`.

### Docker Compose

1. run ```docker-compose up```.
2. Connect to the MariaDB container using the following command:
    ```docker exec -it YOUR_CONTAINER_NAME mariadb -uroot -p'YOUR_DATABASE_PASSWORD'```
3. Inside the MariaDB shell, create the myTable with the specified columns:
    ```CREATE TABLE myTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currency VARCHAR(255) NOT NULL,
    date DATE,
    rates JSON
    );
    ```


### Notes
- The app minimizes API calls by checking the database first before fetching from the API.
- Cron Job is setup to always keep the list of Currencies updated.
