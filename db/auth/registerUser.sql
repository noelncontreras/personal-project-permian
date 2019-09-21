INSERT INTO permianuser (name, username, password)
VALUES ($1, $2, $3)
RETURNING *;