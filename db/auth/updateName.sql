UPDATE permianuser
SET name = $2
WHERE user_id = $1
RETURNING *;