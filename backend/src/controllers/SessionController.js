const User = require('../models/User');

// funções para controller: index, show, store, update, destroy
// index - listar
// show - mostrar um
// store - criar
// update - atualizar
// destroy - remover

module.exports = {
  async store(req, res) {
    const { email } = req.body; // desestruturação

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }
    
    return res.json(user);
  }
};
