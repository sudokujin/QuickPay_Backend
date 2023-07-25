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



ALTER TABLE friend DROP CONSTRAINT IF EXISTS FK_friend_friend_account_id;
ALTER TABLE friend DROP CONSTRAINT IF EXISTS FK_friend_friend_id;

-- Next, add a composite column for the UNIQUE constraint
ALTER TABLE friend
ADD COLUMN friend_pair INT GENERATED ALWAYS AS (LEAST(friend_account_id, friend_id)) STORED,
ADD COLUMN friend_pair_max INT GENERATED ALWAYS AS (GREATEST(friend_account_id, friend_id)) STORED;

-- Then, add the UNIQUE constraint using the composite columns
ALTER TABLE friend
ADD CONSTRAINT UQ_friend_pair UNIQUE (friend_pair, friend_pair_max);

-- Finally, re-add the foreign key constraints
ALTER TABLE friend
ADD CONSTRAINT FK_friend_friend_account_id FOREIGN KEY (friend_account_id) REFERENCES account (account_id),
ADD CONSTRAINT FK_friend_friend_id FOREIGN KEY (friend_id) REFERENCES account (account_id);

INSERT INTO users (username,password_hash,role, account_id, email, birth_date, first_name, last_name, phone_number, address, city, state, zipcode)
VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER', 1, 'test@gmail.com', '1986-12-10', 'Test', 'Example', '123-123-1234', '10 Test Street', 'Tampa', 'Florida', '12345');

INSERT INTO users (username,password_hash,role, account_id, email, birth_date, first_name, last_name, phone_number, address, city, state, zipcode)
VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN', 2,'test@gmail.com', '1986-12-10', 'Test', 'Example', '123-123-1234', '10 Test Street', 'Tampa', 'Florida', '12345');

INSERT INTO account(account_id, balance)
VALUES (1, 0);

INSERT INTO account(account_id, balance)
VALUES(2, 0);
