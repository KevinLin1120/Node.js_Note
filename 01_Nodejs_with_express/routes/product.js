const express = require("express");
const router = express.Router();

// 可以在每次請求送出後，將請求路徑輸出來知道使用者在瀏覽哪個頁面
router.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})

router.get("/", (req, res) => {
    res.send("Product Index");
})

router.get("/A", (req, res) => {
    res.send("Product A");
})

router.get("/B", (req, res) => {
    res.send("Product B");
})

// Dynamic param of route
router.get("/:PID", (req, res) => {
    res.send(`Product Id: ${req.params.PID}`)
})

// Multiple params
router.get("/user/:userId/goods/:PID", (req, res) => {
    res.send(`<h1>Welcome ${req.params.userId}! <br> Here is product ${req.params.PID}</h1>`)
})

module.exports = router;