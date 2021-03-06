INSERT INTO service (category_id, user_id, service_description, file_url)
VALUES ($1, $2, $3, $4);

SELECT s.service_id, s.category_id, s.user_id, s.service_description, s.file_url, u.user_id, u.name FROM service s
INNER JOIN category c
ON s.category_id = c.category_id
INNER JOIN permianuser u
ON u.user_id = s.user_id
WHERE c.category_id = $1;