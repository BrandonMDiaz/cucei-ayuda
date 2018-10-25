// FIXME Los atributos usados para documentacion son en minusculas y de estos solo author es valido
/**
 * @Author: root
 * @Date:   2018-09-18T09:46:30-05:00
 * @Last modified by:   schwarze_falke
 * @Last modified time: 2018-10-07T22:29:13-05:00
 */

const { Router } = require('express');

const bodyParser = require('body-parser');

const usersRouter = require('./users');
const subjectRouter = require('./subject');
const forumRouter = require('./forum');
const mapRouter = require('./map');
const buildingRouter = require('./building');
const mailer = require('../mail');

const router = Router();

// FIXME Estos middlewares deben ir en app.js
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => res.send('Welcome to QCInf!'));
router.get('/email', (req, res) => {
  let mailOptions = {
    to: 'ruiztyler97@gmail.com',
    subject: 'Hello testing',
    text: 'Aqui viene url al que se le concatena el token (dsfdsafsafdsa/${token})',
    html: '<b>Hello world?</b>'
    //en los parametros recives
  };
  mailer.sendMail(mailOptions);
  res.send('lo logramos');
});
router.use('/users', usersRouter);
router.use('/subject', subjectRouter);
router.use('/topics', forumRouter);
router.use('/map', mapRouter);
router.use('/building', buildingRouter);

module.exports = router;
