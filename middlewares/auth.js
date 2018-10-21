/**
 * @Author: Carlos Vara
 * @Date:   2018-10-11T09:27:15-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-18T13:56:37-05:00
 */

const bcrypt = require('bcrypt');
const { UserMdl } = require('../models'); // for model handling
const { TokenMdl } = require('../models'); // for model handling

class Auth {
  static async generateToken(user) {
    this.key = `${user[0].name}${user[0].user_code}ky`;
    console.log(this.key);
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.key, salt, (err, hash) => {
        TokenMdl.create({
          token: hash,
          created_at: new Date(),
          expires: new Date(),
          type: 's',
          exist: 1,
          user_id: user[0].user_code,
        })
          .then(() => hash)
          .catch(e => console.error(`.catch(${e})`));
      });
    });
  }

  register(req, res, next) {
    //  hashear contraseña
    bcrypt(`${req.body.password}`, process.env.SECRET, (err, hash) => {
      req.body.password = hash;
    });
    this.newUser = new UserMdl({ ...req.body });
    this.newUser.save()
      .then(() => {
        this.token = Auth.generateToken(this.newUser);
        res.send(this.token);
        next();
      })
      .catch((e) => {
        console.error(`.catch(${e})`);
        next(e);
      });
  }

  static async login(req, res, next) {
    const user = JSON.parse(JSON.stringify(await UserMdl.get('*', `${req.body.user_id}`)));
    if (user[0].user_code !== undefined) {
      const data = {
        user: user[0].user_code,
        token: null,
      };
      const active = await TokenMdl.active(data);
      if (active === 'NON-ACTIVE') {
        res.send(await Auth.generateToken(user));
        next();
      } else {
        next();
      }
    }
  }

  logout(token, next) {
    this.statusToken = TokenMdl.get(token);
    if (this.statusToken) {
      TokenMdl.destroy(token)
        .then(() => next())
        .catch((e) => {
          console.error(`.catch(${e})`);
          next(e);
        });
    }
  }
}

module.exports = Auth;
