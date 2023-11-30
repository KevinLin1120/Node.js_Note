var express = require('express');
var router = express.Router();
let test = require("../modules/test");

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  /// Only one function in the module
  // res.render('index', { title: test(2, 3) }); 
  /// Multiple function in the module
  res.render('index', { title: test.multi(2, 5) });
});

/// Add param to the path 
// localhost:3000/myRouter:s1092060
router.get("/myRouter:s1092060", function(req, res){
  res.json({"Hi": "s1092060"});
})

module.exports = router;
