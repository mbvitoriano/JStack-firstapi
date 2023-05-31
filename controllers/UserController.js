const users = require('../mocks/users');
const produtos = require('../mocks/produtos')


module.exports = {
  listUsers(req, res) {
    const { order } = req.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    res.send(200, sortedUsers);
  },

  getUserById(req, res) {
    const { id } = req.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      return res.send(400, { error: `User was not found!` });
    }

    res.send(200, user);
  }
};