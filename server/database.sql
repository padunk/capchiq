CREATE DATABASE capchiq;

CREATE TABLE user_data
(
    user_id VARCHAR(255) PRIMARY KEY,
    user_name VARCHAR (50) UNIQUE NOT NULL,
    email VARCHAR (50) UNIQUE NOT NULL,
    user_bio VARCHAR (255),
    user_twitter VARCHAR (50),
    user_phone_number VARCHAR (15),
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);