CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  bio TEXT
);

INSERT INTO users (id, username, email, bio)
VALUES
  (1, 'kanhaiya', 'kanhaiya@example.com', 'Fullstack developer profile (MySQL data).'),
  (2, 'alex', 'alex@example.com', 'Frontend focused profile (MySQL data).'),
  (3, 'sam', 'sam@example.com', 'Backend focused profile (MySQL data).')
ON DUPLICATE KEY UPDATE
  username = VALUES(username),
  email = VALUES(email),
  bio = VALUES(bio);
