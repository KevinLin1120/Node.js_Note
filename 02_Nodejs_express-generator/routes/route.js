// 引入 express 模組
var express = require('express');
// 使用 express 方法 Router() 新增一個路由器
var router = express.Router();

/// 基本款
// parm1: 路徑，parm2: 回調函數
router.get('/', function(req, res) {
    res.render('index',{ title: "Route page"});
});

/// 路徑加上參數 
// Way1 -> Query
// localhost:3000/route/myRouter?sID=s1092060
router.get("/myRouter", function(req, res){
    // 以下兩個一樣
    // res.json({"Hi": req.query['sID']});
    res.json({"Hi": req.query.sID});
});

// Way2 -> Params
// localhost:3000/route/myRouter:s1092060
router.get("/myRouter:sID", function(req, res){
    // 以下兩個一樣
    // res.json({"Hi": req.params['sID']});
    res.json({"Hi": req.params.sID});
});

// Note: response 可以回傳 (參考 Note.md)
// 1. res.send()
// 2. res.json()

module.exports = router;