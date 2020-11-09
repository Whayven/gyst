const { default: Axios } = require("axios")

module.exports = {
  getBills: async (req, res) => {
    const { userid } = req.session;
    const db = req.app.get("db");

    await db.bills.get_all_bills({ userid })
    .then((bills) => {
      return res.status(200).send(bills);
    })
    .catch(err => res.status(500).send(err))
  },
  addBill: async (req, res) => {
    const { userid } = req.session;
    const { cost, date, name, type } = req.body;
    const db = req.app.get("db");

    await db.bills.create_bill({ cost, date, name, type, userid })
    .then((bills) => {
      return res.status(200).send(bills)
    })
    .catch(err => res.status(500).send(err));
  },
  deleteBill: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");

    await db.bills.delete_bill({ id })
    .then((bills) => res.status(200).send(bills))
    .catch(err => res.status(500).send(err));

  }
}