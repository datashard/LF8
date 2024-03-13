drop database if exists quizz;

create database if not exists quizz;

create table
    category (
        id integer not null auto_increment,
        category VARCHAR(255),
        PRIMARY KEY (id)
    ) ENGINE = InnoDB;

create table
    questions (
        id integer not null auto_increment,
        question TEXT not null,
        category VARCHAR(255),
        FOREIGN KEY (category) references category (id)
    ) ENGINE = InnoDB;

create table
    players (
        id integer not null auto_increment,
        username VARCHAR(255) not null,
        password VARCHAR(255) not null,
        PRIMARY KEY (id)
    ) ENGINE = InnoDB;

create table
    score (
        id integer not null auto_increment,
        score bigint not null,
        P player integer not null,
        time datetime not null default current_timestamp(),
        FOREIGN KEY (player) references players (id)
    ) ENGINE = InnoDB;