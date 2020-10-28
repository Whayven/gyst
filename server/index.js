require("dotenv").config();
const express = require("express");
const massive = require("massive");
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);
