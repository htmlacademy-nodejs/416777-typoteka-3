/* All categories */
SELECT * FROM categories;

/* Non-empty categories */
SELECT id, name FROM categories;
  JOIN articles_categories
  ON id = category_id
  GROUP BY id;

/* Categories with number of articles */
SELECT
  id, name, count(article_id)
FROM categories
  LEFT JOIN articles_categories
  ON id = category_id
  GROUP BY id;

/* Fresh first */
SELECT
  articles.id AS "Идентификатор публикации",
  articles.title AS "Заголовок публикации",
  articles.announce AS "Анонс публикации",
  articles.created_at AS "Дата публикации",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  users.email AS "Контактный email",
  COUNT(comments.id) AS "Количество комментариев",
  STRING_AGG(DISTINCT categories.name, ', ') AS "Наименование категорий"
FROM articles
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
  GROUP BY articles.id, users.id
  ORDER BY articles.created_at DESC;

/* Article details */
SELECT
  articles.*,
  COUNT(comments.id) AS "Количество комментариев",
  STRING_AGG(DISTINCT categories.name, ', ') AS "Категории",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  users.email AS "Контактный email"
FROM articles
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
  LEFT JOIN comments ON comments.article_id = articles.id
  JOIN users ON users.id = articles.user_id
WHERE articles.id = 1
  GROUP BY articles.id, users.id;

/* 5 fresh comments*/
SELECT
  comments.id AS "Идентификатор комментария",
  comments.article_id AS "Идентификатор публикации",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  comments.text AS "Текст комментария"
FROM comments
  JOIN users ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5;

/* Article comments */
SELECT
  comments.id AS "Идентификатор комментария",
  comments.article_id AS "Идентификатор публикации",
  users.first_name AS "Имя автора",
  users.last_name AS "Фамилия автора",
  comments.text AS "Текст комментария"
FROM comments
  JOIN users ON comments.user_id = users.id
WHERE comments.article_id = 1
  ORDER BY comments.created_at DESC;

/* Update article title */
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
