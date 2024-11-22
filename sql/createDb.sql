-- Tạo bảng Users
create table if not exists users
(
    id         int auto_increment
        primary key,
    username  varchar(100) charset utf8mb3 not null,
    birdth_day date                         null,
    avatar     varchar(255)                 null,
    email      varchar(255)                 not null,
    password   varchar(255)                 not null,
    constraint users_pk_2
        unique (email)
);

-- table posts
create table if not exists posts
(
    id            int auto_increment
        primary key,
    type          varchar(50) charset utf8mb3  null,
    url           varchar(255) charset utf8mb3 null,
    content       varchar(255) charset utf8mb3 null,
    upload_at     datetime                     null,
    count_like    int                          null,
    count_comment int                          null,
    user_id       int                          null,
    constraint posts_users_id_fk
        foreign key (user_id) references users (id)
);

create table if not exists likes
(
    id      int auto_increment
        primary key,
    user_id int null,
    post_id int null,
    constraint likes_posts_id_fk
        foreign key (post_id) references posts (id),
    constraint likes_users_id_fk
        foreign key (user_id) references users (id)
);

create table if not exists follows
(
    id_following int not null,
    id_followed  int not null,
    primary key (id_following, id_followed),
    constraint follows_users_id_fk_followed
        foreign key (id_followed) references users (id),
    constraint follows_users_id_fk_following
        foreign key (id_following) references users (id)
);

create table if not exists comments
(
    id      int auto_increment
        primary key,
    post_id int      not null,
    user_id int      null,
    text    text     null,
    time    datetime null,
    constraint comments_posts_id_fk
        foreign key (post_id) references posts (id),
    constraint comments_users_id_fk
        foreign key (user_id) references users (id)
);

