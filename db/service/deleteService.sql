DELETE FROM service
WHERE service_id = $1;

-- SELECT s.service_id, s.category_id, s.user_id, u.user_id FROM service s
-- INNER JOIN category c
-- ON s.category_id = c.category_id
-- INNER JOIN permianuser u
-- ON u.user_id = s.user_id
-- WHERE c.category_id = $1;