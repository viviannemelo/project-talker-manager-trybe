const { Router } = require('express');
const crypto = require('crypto');

const loginRoute = Router();
const { validateLogin } = require('../utils/validations');

loginRoute.post('/', validateLogin, async (req, res) => {
   const { email, password } = req.body;
   if (!email && !password) {
       return res.status(404).json({
           message: 'Email e Senha são obrigatórios',
       });
   }
   function randomToken() {
       return crypto.randomBytes(8).toString('hex');
   }
   const token = await randomToken();
   return res.status(200).json({ token });
});

// const randomToken = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// return res.status(200).json({
//     token: randomToken,
// });
// const validToken = [];
// for (let i = 0; i < 16; i += 1) {
//   const characters = (Math.floor(Math.random() * 9));
//   validToken.push(characters);
// }
// return res.status(200).json({
//   token: validToken,
// });

module.exports = loginRoute;