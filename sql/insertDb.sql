insert into videoApp.users (id, user_name, birdth_day, avatar, email, password)
values  (1, 'Alice', '1995-08-15', 'https://imgur.com/RrBwvfA.png', 'alice@example.com', '123'),
        (2, 'Bob', '2024-11-20', 'https://imgur.com/RrBwvfA.png', 'bob@gmail.com', '123'),
        (3, 'Charlie', '2024-11-20', 'https://imgur.com/RrBwvfA.png', 'char@gmail.com', '123'),
insert into videoApp.posts (id, type, url, content, upload_at, count_like, count_comment, user_id)
values  (1, 'image', 'https://example.com/images/post1.jpg', 'Alice first post', '2024-11-08 08:00:00', 10, 3, 1),
        (2, 'video', 'https://example.com/videos/post2.mp4', 'Bob cool video', '2024-11-08 09:00:00', 20, 5, 2),
        (3, 'story', 'https://example.com/stories/post3.jpg', 'Charlie story', '2024-11-08 10:00:00', 15, 4, 3);

        insert into videoApp.likes (id, user_id, post_id)
values  (1, 1, 2),
        (2, 2, 1),
        (3, 3, 2),
        (4, 1, 3),
        (5, 2, 3),

insert into videoApp.follows (id_following, id_followed)
values  (2, 1),
        (3, 1),
        (1, 2),
        (1, 3);

insert into videoApp.comments (id, post_id, user_id, text, time)
values  (1, 1, 2, 'Nice post, Alice!', '2024-11-08 08:10:00'),
        (2, 1, 3, 'I agree, this is cool!', '2024-11-08 08:15:00'),
        (3, 2, 1, 'Great video, Bob!', '2024-11-08 09:05:00'),
        (4, 2, 3, 'Very funny, I love it!', '2024-11-08 09:10:00'),
        (5, 3, 1, 'I love this story, Charlie!', '2024-11-08 10:05:00'),

