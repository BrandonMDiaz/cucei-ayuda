/**
 * @Author: schwarze_falke
 * @Date:   2018-09-13T13:50:03-05:00
 * @Last modified by:   brandonMdiaz
 * @Last modified time: 2018-09-17T20:32:07-05:00
*/
const express = require('express');
const app = express();

const router = require('./routes');
app.use(router);


app.listen(3000, () => console.log('My cute app is running on port 3000!'));
