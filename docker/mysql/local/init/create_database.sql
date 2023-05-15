DROP USER IF EXISTS 'tsunagu';
CREATE USER 'tsunagu'@'%' IDENTIFIED BY 'jS9HmCXE';
CREATE DATABASE IF NOT EXISTS express;
GRANT ALL ON express.* TO 'tsunagu'@'%';