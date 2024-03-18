var express = require('express');
var router = express.Router();
const { createData, readData, updateData, deleteData } = require('../Modules/firebase');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', async function (req, res, next) {
  await createData();
  res.sendStatus(200);
});

router.get('/delete', async function (req, res, next) {
  await deleteData();
  res.sendStatus(200);
})

module.exports = router;
