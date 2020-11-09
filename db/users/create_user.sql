WITH newUser AS (
  INSERT INTO users (email, password)
VALUES (
  ${email},
  ${hash}
) RETURNING user_id
)
INSERT INTO bill_list (user_id)
SELECT user_id FROM newUser;