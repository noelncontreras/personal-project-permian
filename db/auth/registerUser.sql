INSERT INTO permianuser (name, username, password, user_phone_number)
VALUES ($1, $2, $3, $4)
RETURNING *;