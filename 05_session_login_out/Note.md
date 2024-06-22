# Session Login/out sample

## Steps

1. 準備 routes（參考 routes > index.js）

2. 建立寫入資料庫的 Schema（參考 model > member.js）

- 要先建立 model 資料夾
  
- schema 為 key-type pair

3. 設定 mongoose for 資料庫連線使用

- 安裝 `npm i mongoose`

- 載入 `const mongoose = require("mongoose");`（在 member.js 中）

- 設定連線資訊，將連線資訊寫在 .env 中

ex. mongodbUrl="mongodb://...../db_name"

- 在 app.js 中設定 mongoose

  - 需使用 dotenv

4. 在 app.js 中設定使用 session
