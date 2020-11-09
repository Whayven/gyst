const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");

    const foundUser = await db.users.check_user({ email });
    if (foundUser[0]) {
      return res.status(400).send("Email already in use.");
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    await db.users
      .create_user({ email, hash })
      .then(() => res.status(200).send("Account created successfully."));
  },
  login: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");

    const foundUser = await db.users.check_user({ email });
    if (!foundUser[0]) {
      return res.status(400).send("User not found");
    }

    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }

    delete foundUser[0].password;
    req.session.userid = foundUser[0].user_id;
    res.status(202).send(foundUser[0]);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getSession: async (req, res) => {
    const { userid } = req.session;
    const db = req.app.get("db");
    await db.users
      .get_user({ userid })
      .then((user) => {
        res.status(200).send(user[0]);
      })
      .catch((err) => res.status(500).send(err));
  },
};
