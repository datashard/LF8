CREATE TABLE
    category (id serial primary key, category text not null);

create table
    questions (
        id serial primary key,
        type text not null,
        question text not null,
        difficulty text not null,
        correct_answer text not null,
        wrong_answers text array,
        category integer not null,
        FOREIGN KEY (category) references category (id)
    );

create table
    players (
        id serial primary key,
        username text not null,
        admin boolean NOT NULL DEFAULT false,
        password text not null
    );

create table
    score (
        id serial primary key,
        score bigint not null,
        player integer not null,
        time timestamp not null default current_timestamp,
        FOREIGN KEY (player) references players (id)
    );