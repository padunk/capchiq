CREATE DATABASE capchiq;

-- user data
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

-- contents: photos or videos or sounds
CREATE TABLE idol_contents
(
    content_id UUID PRIMARY KEY,
    content_description TEXT,
    created_on TIMESTAMP NOT NULL,
    modified_on TIMESTAMP,
    created_by VARCHAR(255) REFERENCES user_data(user_id) ON DELETE CASCADE
);

-- following
CREATE TABLE fans_contents
(
    fans_id VARCHAR(255) REFERENCES user_data(user_id) ON DELETE CASCADE,
    subscribe_to VARCHAR(255) REFERENCES user_data(user_id) ON DELETE CASCADE,
    subscribe_on TIMESTAMP NOT NULL
);

-- likes
CREATE TABLE content_likes
(
    content_id UUID REFERENCES idol_contents(content_id),
    creator_id VARCHAR(255) REFERENCES user_data(user_id) ON DELETE CASCADE,
    fans_id VARCHAR(255) REFERENCES user_data(user_id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL
);