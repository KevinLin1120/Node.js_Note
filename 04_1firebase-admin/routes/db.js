var express = require('express');
var router = express.Router();
const firebaseAdmin = require("../module/firebase");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/create",async function(req,res, next){  
    try{
        res.send(await firebaseAdmin.createDt(req));
    } catch(e) {
        console.log(e);
        res.send(e);
    }
});

router.post("/readAll", async function(req,res, next){  
    try{
        res.send(await firebaseAdmin.readDtAll());
    } catch(e) {
        console.log(e);
        res.send(e);
    }
});

router.get("/read/:id", async function(req,res, next){  
    try{
        res.send(await firebaseAdmin.readDt(req));
    } catch(e) {
        console.log(e);
        res.send(e);
    }
});

router.post("/update", async function(req,res, next){  
    try{
        res.send(await firebaseAdmin.updateDt(req));
    } catch(e) {
        console.log(e);
        res.send(e);
    }
});

router.post("/delete", async function(req,res, next){  
    try{
        res.send(await firebaseAdmin.deleteDt(req));
    } catch(e) {
        console.log(e);
        res.send(e);
    }
});

module.exports = router;
