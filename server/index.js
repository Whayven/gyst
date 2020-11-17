require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const path = require("path");
const authCtrl = require("./Controllers/authController");
const billCtrl = require("./Controllers/billController");
const userCtrl = require("./Controllers/userController");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.use(express.static(`${__dirname}/../build`));


app.get("/api/auth/me", authCtrl.getSession);
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.post("/api/auth/logout", authCtrl.logout);

app.put("/api/user/profile", userCtrl.updateProfile);

app.get("/api/bills", billCtrl.getBills);
app.post("/api/bills/add", billCtrl.addBill);
app.delete("/api/bills/:id", billCtrl.deleteBill);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(SERVER_PORT, () =>
  console.log(`Server running on port ${SERVER_PORT}`)
);
