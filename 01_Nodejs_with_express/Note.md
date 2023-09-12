
# Node.js with express

## Why express?

1. Node.js 可以使用原生 Js 建立 **server** 及 **路徑**，但不易維護。

2. express 提供：

    - routes
    - middleware
    - render：畫面渲染
    - template

## How to start?

1. 建立資料夾，名稱為「專案名稱」

2. 生成 package.json：進入資料夾，terminal 打 `npm init -y`
    - `-y`：一切皆 yes

3. 下載 express：`npm i express --save`

4. 下載 nodemon：`npm i nodemon --g`
    - nodemon：程式有修改會重啟服務
    - `--g`：不管終端機在哪個路徑皆可使用

5. 在 package.js > scripts，寫 `"start": "nodemon server.js"`

6. 專案資料夾新增 server.js（相關後端服務使用）

7. 寫一些 code

8. 啟動服務：`npm start` 或 `nodemon start`
