DROP TABLE IF EXISTS articles_categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  avatar VARCHAR(50) NOT NULL
);

CREATE TABLE articles(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  announce TEXT NOT NULL,
  full_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  article_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
);

CREATE TABLE articles_categories(
  article_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

