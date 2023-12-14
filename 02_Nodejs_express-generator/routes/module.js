var express = require('express');
var router = express.Router();
let test = require("../modules/test");

/* GET home page. */
router.get('/', function(req, res, next) {
  /// Only one function in the module
//   res.render('index', { title: 'Only one function: '+test(2, 3) });
});

router.get('/multi', function(req, res, next) {
    /// Multiple function in the module
    res.render('index', { title: 'Multiple function: '+test.multi(2, 5) });
});

module.exports = router;
