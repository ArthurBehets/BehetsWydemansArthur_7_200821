create database groupomania;

use groupomania;

create table grade (
grade varchar(32) NOT NULL,
rights char(3),
primary key(grade)
);

create table user(
userId smallInt unsigned auto_increment,
email varchar(256) UNIQUE,
password varchar(32),
firstname varchar(256),
lastname varchar(256),
grade varchar(256) NOT NULL,
primary key(userId),
CONSTRAINT fk_user_grade
foreign key (grade)
references grade(grade)
);

create table category(
categoryId smallint auto_increment not null,
categoryName varchar(32) not null,
primary key(categoryId)
);


CREATE TABLE article(
articleId smallint auto_increment NOT NULL,
userId smallint unsigned NOT NULL,
categoryId smallint NOT NULL,
url  varchar(256),
legend varchar(256),
likes smallint NOT NULL default 0,
publicationDate datetime not null,
primary key(articleId),
CONSTRAINT fk_article_user 
foreign key (userId)
references user(userId),
CONSTRAINT fk_article_category
foreign key(categoryId)
references category(categoryId)
);

CREATE TABLE comment (
commentId smallint auto_increment NOT NULL,
userId smallint unsigned NOT NULL,
articleId smallint NOT NULL,
message varchar (8000) NOT NULL,
likes smallint default 1, 
primary key (commentId),
foreign key (userId)
references user(userId),
foreign key (articleId)
references article(articleId)
);

CREATE TABLE articleUserLiked (
articleId smallint NOT NULL,
userId smallint unsigned NOT NULL,
primary key(articleId, userId),
foreign key(articleId) references article(articleId),
foreign key(userId) references user(userId)
);

CREATE TABLE commentUserLiked (
commentId smallint NOT NULL,
userId smallint unsigned NOT NULL,
primary key(commentId, userId),
foreign key(commentId) references comment(commentId),
foreign key(userId) references user(userId)
);



