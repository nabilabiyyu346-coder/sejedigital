-- =========================
-- TABLE: users
-- =========================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLE: tasks
-- =========================
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status VARCHAR(20) NOT NULL,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);

-- =========================
-- SAMPLE USER (PASSWORD: 123456)
-- hash dibuat pakai bcrypt
-- =========================
INSERT INTO users (name, email, password_hash)
VALUES (
  'Admin',
  'admin@mail.com',
  '$2a$10$CwTycUXWue0Thq9StjUM0uJ8e2JY2w8Z2xYh7Q1Kz0rGUNShUMHbC'
);

-- =========================
-- SAMPLE TASK
-- =========================
INSERT INTO tasks (title, description, status, user_id)
VALUES (
  'Belajar BFF',
  'Mini Project Task Management',
  'todo',
  1
);