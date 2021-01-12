DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT(20) AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(20) NOT NULL,
    `password` VARCHAR(80) NOT NULL,
    `emailVerifiedAt` DATETIME(6) NULL,
    PRIMARY KEY (`user_id`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `posts`;

CREATE TABLE IF NOT EXISTS `posts` (
    `post_id` INT(40) AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `artist` VARCHAR(20) NOT NULL,
    `category` VARCHAR(10) NOT NULL,
    `body` VARCHAR(140) NOT NULL,
    `user_id` INT(20) NOT NULL,
    PRIMARY KEY (`post_id`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE IF NOT EXISTS `comments` (
    `comment_id` INT(40) AUTO_INCREMENT,
    `body` VARCHAR(140) NOT NULL,
    `user_id` INT(20) NOT NULL,
    `post_id` INT(40) NOT NULL,
    PRIMARY KEY (`comment_id`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `post_likes`;

CREATE TABLE IF NOT EXISTS `post_likes` (
    `post_like_id` INT(20) AUTO_INCREMENT,
    `user_id` INT(20) NOT NULL,
    `post_id` INT(40) NOT NULL,
    PRIMARY KEY (`post_like_id`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `comment_likes`;

CREATE TABLE IF NOT EXISTS `comment_likes` (
    `comment_like_id` INT(20) AUTO_INCREMENT,
    `user_id` INT(20) NOT NULL,
    `comment_id` INT(40) NOT NULL,
    PRIMARY KEY (`comment_like_id`)
)DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
