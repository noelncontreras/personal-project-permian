UPDATE service
SET service_description = $3,
    file_url = $4
WHERE service_id = $2;

SELECT s.service_id, s.category_id, s.user_id, s.service_description, s.file_url, u.user_id, u.name FROM service s
INNER JOIN category c
ON s.category_id = c.category_id
INNER JOIN permianuser u
ON u.user_id = s.user_id
WHERE c.category_id = $1;