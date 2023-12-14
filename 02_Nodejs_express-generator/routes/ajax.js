var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ajax', { title: 'Express' });
});

router.post('/queryTest', function(req, res, next) {
    console.log("Get the request from front-end");
    // 回傳請求內容
    res.send(req.body.name);
});

module.exports = router;
