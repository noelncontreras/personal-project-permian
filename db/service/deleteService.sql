DELETE FROM service
WHERE service_id = $1;

-- SELECT * FROM service
-- WHERE category_id = $2;

SELECT s.service_id, s.category_id, s.user_id, s.service_description, u.name FROM service s
INNER JOIN permianuser u
ON s.user_id = u.user_id
WHERE category_id = $2;