BEGIN TRANSACTION;

drop table if exists users, friend_request, friend, transactions, account cascade;

CREATE TABLE account(
                        account_id SERIAL,
                        balance DECIMAL(12, 4),

                        CONSTRAINT PK_account_account_id PRIMARY KEY (account_id)
);

CREATE TABLE users(
                      user_id SERIAL,
                      username VARCHAR(50) NOT NULL UNIQUE,
                      password_hash VARCHAR(200) NOT NULL,
                      role VARCHAR(50) NOT NULL,
                      account_id INT NOT NULL,
                      email VARCHAR(200),
                      birth_date DATE NOT NULL,
                      first_name VARCHAR(50) NOT NULL,
                      last_name VARCHAR(50) NOT NULL,
                      phone_number VARCHAR(50) NOT NULL,
                      address VARCHAR(50) NOT NULL,
                      city VARCHAR(50) NOT NULL,
                      state VARCHAR(50) NOT NULL,
                      zipcode VARCHAR(50) NOT NULL,
                      profile_picture bytea,

                      CONSTRAINT PK_user_user_id PRIMARY KEY (user_id),
                      CONSTRAINT FK_user_account_id FOREIGN KEY (account_id) REFERENCES account (account_id)
);

CREATE TABLE friend_request(
                               request_id SERIAL,
                               sender_id INT NOT NULL,
                               receiver_id INT NOT NULL,
                               status VARCHAR(50),

                               CONSTRAINT PK_friend_request_request_id PRIMARY KEY (request_id),
                               CONSTRAINT FK_friend_request_sender_id FOREIGN KEY (sender_id) REFERENCES account (account_id),
                               CONSTRAINT FK_friend_request_receiver_id FOREIGN KEY (receiver_id) REFERENCES account (account_id)
);

CREATE TABLE friend(
                       id SERIAL,
                       friend_account_id INT NOT NULL,
                       friend_id INT NOT NULL,

                       CONSTRAINT PK_friend_id PRIMARY KEY (id),
                       CONSTRAINT FK_friend_friend_account_id FOREIGN KEY (friend_account_id) REFERENCES account (account_id),
                       CONSTRAINT FK_friend_friend_id FOREIGN KEY (friend_id) REFERENCES account (account_id)
              
);

CREATE TABLE transactions(
                             transaction_id SERIAL,
                             acting_id INT NOT NULL,
                             target_id INT NOT NULL,
                             amount DECIMAL(12, 4),
                             status VARCHAR(50) NOT NULL,
                             type_id INT NOT NULL,
                             comment VARCHAR(50),
                             date_time TIMESTAMP WITH TIME ZONE NOT NULL,

                             CONSTRAINT PK_transaction_transaction_id PRIMARY KEY (transaction_id),
                             CONSTRAINT FK_transaction_acting_id FOREIGN KEY (acting_id) REFERENCES account (account_id),
                             CONSTRAINT FK_transaction_target_id FOREIGN KEY (target_id) REFERENCES account (account_id)
);

COMMIT TRANSACTION;

