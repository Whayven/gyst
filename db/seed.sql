CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE bill_list (
  bill_list_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE bill (
  bill_id SERIAL PRIMARY KEY,
  cost INTEGER NOT NULL,
  due_date DATE,
  bill_list_id INTEGER REFERENCES bill_list(bill_list_id)
);


