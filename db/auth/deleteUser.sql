DELETE FROM service
WHERE user_id = $2;

DELETE from permianuser
WHERE user_id = $1;