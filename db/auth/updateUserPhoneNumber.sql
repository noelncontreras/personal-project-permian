UPDATE permianuser
SET user_phone_number = $2
WHERE user_id = $1
RETURNING *;