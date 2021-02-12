INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

INSERT INTO categories(name) VALUES
('Животные'),
('Игры'),
('Разное');

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(user_id, title, announce, full_text) VALUES
(1, 'Заголовок1', 'Тестовый пост', 'Лалалалалаллалалалал'),
(2, 'Заголовок2', 'Тестовый пост', 'Лалалалалаллалалалал'),
(1, 'Заголовок3', 'Тестовый пост', 'Лалалалалаллалалалал'),
(2, 'Заголовок4', 'Тестовый пост', 'Лалалалалаллалалалал'),
(1, 'Заголовок5', 'Тестовый пост', 'Лалалалалаллалалалал');
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(4, 1),
(5, 3);
ALTER TABLE articles_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, user_id, article_id) VALUES
('Купи мой гараж', 2, 1),
('Купи, кому говорю', 2, 1),
('Плохой гараж', 1, 2),
('Не куплю', 1, 2),
('Купи крокодила', 1, 3),
('Отличный крокодил', 1, 3),
('Не куплю крокодила', 2, 4),
('Дрянной крокодил', 2, 4),
('Пожалей крокодила', 2, 5),
('Держать негде', 1, 5);
ALTER TABLE comments ENABLE TRIGGER ALL;
