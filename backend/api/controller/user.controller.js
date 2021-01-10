const User = require('../model/user');
module.exports = {
  create: (req, res) => {
    User.create(req.body, (error, result) => {
      if (error) {
        return;
      }
      User.login(req.body, (e, r) => {
        if (e) {
          return;
        }
        let data = {
          user_id: r[0].user_id,
          name: r[0].name,
          email: r[0].email,
        };
        data = JSON.stringify(data);
        res.json(data);
      });
    });
  },
  login: (req, res) => {
    User.login(req.body, (error, result) => {
      let data = {
        user_id: result[0].user_id,
        name: result[0].name,
        email: result[0].email,
      };
      data = JSON.stringify(data);
      res.json(data);
    });
  },
};
