var express = require('express');
const memberModel = require('../model/member');
var router = express.Router();
const bcrypt = require("bcrypt");

// 登入確認 middleware
const isAuth = (req, res, next) =>{
  if(!req.session.isAuth) {
      console.log("Doesn't have the permission");
      return res.redirect("login");
  }
  next();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Session Demo' });
});

router.get("/login", function(req, res, next) {
  res.render("login", {title: "session login"})
});

router.post("/login", async function(req, res, next) {
  const {email, pw} = req.body;
    
    // 確認是否有已使用者資料
    if(!email || !pw){
        console.log("No data", email, pw);
        return res.redirect("login");
    }

    // 查詢是否有此使用者
    let member = await memberModel.findOne({email});
    if(!member){
        console.log("Member doesn't exits.");
        return res.redirect("login");
    }

    // 密碼正確檢查
    // if(member.pw == pw){
        //     req.session.isAuth = true;
        //     req.session.name = member.id;
        //     res.redirect("/session/member")
        // }

        // 解雜湊
        bcrypt.compare(pw, member.pw, function(err, result) {
          if(err){
              console.log(err)
              res.status(404).json({
                  status:404,
                  reason:''
              })
          }
          req.session.isAuth = true;
          req.session.name = member.id;
          res.redirect("/member");
      });
});

router.get("/register", function(req, res, next) {
  res.render("register", {title: "session register"});
});

router.post("/register", async function(req, res, next) {
  // Whether field not empty
  const {id, email, pw} = req.body;
  if(!id || !email || !pw) {
    console.log("No data", id, email, pw);
    return res.redirect("register");
  }
  // Whether account already exist
  let member = await memberModel.findOne({email});
  if(member) {
    console.log("Email has been registered");
    return res.redirect("register");
  }
  // Create account
  // member = new memberModel({id, email, pw});
  const hashPW = await bcrypt.hash(pw, 10); // Hash the pw
  member = new memberModel({id, email, pw: hashPW});
  const result = await member.save();
  res.redirect("login");
});

router.get("/logout", function(req, res, next) {
  if(req.session){
    console.log(req.session);
    req.session.destroy((err) =>{
        if(err) throw err;
        console.log("Member has logged out");
        // res.clearCookie("")
        return res.redirect("/");
    });
  }
});

router.get("/member", isAuth, (req, res)=>{
  // if(!req.session.isAuth){
  //     console.log("Haven't login");
  //     return res.redirect("login")
  // }
  res.render("member", {title: "Welcome Back, "+req.session.name});
});

module.exports = router;
