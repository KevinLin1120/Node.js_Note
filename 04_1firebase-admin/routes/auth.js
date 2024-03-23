var express = require('express');
var router = express.Router();
const firebaseAdmin = require('../module/firebase');

/* GET home page. */
router.post('/signup', async function(req, res, next) {
    try{
        let resContent = await firebaseAdmin.signup(req);
        console.log("resContent: ", resContent);
        res.send(resContent);    
    } catch(e) {
        console.log("Signup error: ", e);
        res.sendStatus(500);
    }
});

module.exports = router;
