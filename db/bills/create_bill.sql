INSERT INTO bill (cost, due_date, bill_list_id, name, type)

SELECT ${cost}, ${date}, bill_list_id, ${name}, ${type}
FROM bill_list WHERE user_id = ${userid}
RETURNING *;