const express = require("express"); // 內含 Http
const app = express(); // 產生服務

const host = '127.0.0.1'; // Only for local testing
const port = 3000;


// 增加「路由」（通常在 listen 上）
app.get("/", (req, res) => {
    console.log('Index');
    res.send("Index");
})

app.listen(port, host, () => {
    console.log(`app is running at ${host}: ${port}`);
});

