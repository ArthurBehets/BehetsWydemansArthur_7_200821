create database groupomania;

use groupomania;

create table user(
userId smallInt unsigned auto_increment,
email varchar(256),
password varchar(32),
firstname varchar(256),
lastname varchar(256),
primary key(userId)
);

create table category(
categoryId smallint not null,
categoryName varchar(32) not null,
primary key(categoryId)
);


CREATE TABLE article(
articleId smallint auto_increment NOT NULL,
userId smallint unsigned NOT NULL,
categoryId smallint NOT NULL,
url  varchar(256),
likes smallint NOT NULL default 1,
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



