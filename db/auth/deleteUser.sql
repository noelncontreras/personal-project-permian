DELETE FROM service
WHERE user_id = $2;

DELETE FROM permianuser
WHERE user_id = $1;