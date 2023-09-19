const express = require("express"); // 內含 Http
const app = express(); // 產生服務

const host = '127.0.0.1'; // Only for local testing
const port = 3000;
app.set("view engine", "pug");
const prodoctRouter = require("./routes/product");


// 增加「路由」（通常在 listen 上）
app.get("/", (req, res) => {
    console.log('Index');
    // res.send("Index");
    // res.send("<h1>Index</h1>");
    // res.sendStatus(500);
    // res.status(500).send("Inner server has error.");
    // res.status(200).json({
    //     msg: "Send success!"
    // });
    // res.download('./package.json');

    res.render("index", {
        title: "myExpress",
        message: "This is my first practice."
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "Portfolio",
        name: "Kevin",
        age: 20
    })
});

app.use('/product', prodoctRouter);

app.listen(port, host, () => {
    console.log(`app is running at ${host}: ${port}`);
});

