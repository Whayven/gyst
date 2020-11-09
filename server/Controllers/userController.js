module.exports = {
  updateProfile: async (req, res) => {
    const { userid } = req.session;
    const { income, userName } = req.body;
    const db = req.app.get("db");

    await db.users.update_profile({ income, userName, userid })
    .then((user) => res.status(200).send(user[0]))
    .catch(err => res.status(500).send(err)); 
  }
}