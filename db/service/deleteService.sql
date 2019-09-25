DELETE FROM service
WHERE service_id = $1;

SELECT * FROM service
WHERE category_id = $2;