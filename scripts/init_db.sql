DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS memes CASCADE;
DROP TABLE IF EXISTS attachments CASCADE;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE attachments (
    id serial PRIMARY KEY,
    filepath text NOT NULL,
    filesize integer NOT NULL,
    created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE memes (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    description text NOT NULL,
    attachment_id integer NOT NULL REFERENCES attachments(id),
    created_at timestamp NOT NULL DEFAULT now()
);
