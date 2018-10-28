/**
 * @Author: brandonmdiaz
 */

const { Router } = require('express');
const mailer = require('../mail');
const { ResetPassword } = require('../models');
const { Auth } = require('../middlewares');
const { UserMdl, TokenMdl } = require('../models'); // for model handling

const router = Router();


router.get('/password_reset', (req, res) => {
  const userEmail = req.query.email;
  // validar email.
  if (ResetPassword.validEmail(userEmail)) {
    // revisamos que el usuario exista usando su email
    ResetPassword.findUser(userEmail).then((result) => {
      this.user = result;
      if (this.user === undefined) {
        res.send('error');
      } else {
        // creamos token
        Auth.generateToken(this.user, 'recover').then((results) => {
          const token = results.hash;
          const mailOptions = {
            to: `${userEmail}`,
            subject: 'Reset Password',
            text: `/auth/recover/?q=${token}`,
            html: `<b>Recuperando contraseña, espera un segundo
            /auth/recover/?q=${token} </b>`,
          }; // fin mailOptions
          mailer.sendMail(mailOptions);
          res.send('lo logramos');
        }).catch((e) => {
          console.log(e);
        });
      } // fin else
    }).catch((e) => {
      console.log(e);
    });
  } else {
    res.send('error');
  }
});

router.post('/recover', async (req, res) => {
  const token = req.query.q;
  const tokenStatus = await TokenMdl.active(token);
  if (tokenStatus === 'ACTIVE') {
    // obtenemos el id del usuario
    try {
      this.userId = await TokenMdl.get(token);
    } catch(e) {
      console.log(e);
    }
    this.userId = this.userId[0].user_id;
    // Obtenemos todos los datos del usuario
    let user = await UserMdl.get('*', this.userId);
    // cambiamos el password del usuario
    user.password = req.body.password;
    // creamos un modelo con todos los datos del usuario
    user = new UserMdl(user);
    // modificamos el usuario
    await user.update(this.userId);
    res.send('Modificado con exito');
  } else {
    res.send('token no existe');
  }
});
module.exports = router;
