# Nodejs with firebase

## How to start?

### firebase

1. 開專案

### dev env

1. 開一個專案：`express --view=pug PROJECT_NAME`

2. 下載 firebase 套件：`npm install firebase`

3. 新增 .env，並加入以下資料（此資料不會被版控追蹤）

    ``` js
    FIREBASE_API_KEY=,
    FIREBASE_AUTH_DOMAIN=,
    FIREBASE_PROJECT_ID=,
    FIREBASE_STORAGE_BUCKET=,
    FIREBASE_MESSAGE_SENDER_ID=,
    FIREBASE_APP_ID=,
    FIREBASE_MEASUREMENT_ID=
    ```

4. 創建一個資料夾 "Modules"，新增一個檔案 "firebase.js"，並將他給的程式碼貼在裡面（需參考檔案內的改法）

### 連接資料庫

1. 引入 SDK：`const { getFirestore } = require("firebase/firestore"); // To connect to fireStore`

2. 宣告變數 `let firestoreDB`

3. 在初始 firebase app 的地方加入 `firestoreDB = getFirestore();`

4. 在 app.js 呼叫

## Create data

1. 模組方法：參考 Module > firebase.js

2. 路由方法：參考 routes > index.js

## File storage

1. 下載檔案儲存套件：`npm i multer`

## Database structure

- collection

  - document(uniq key)

    - key: value

  - document(uniq key)

    - collection

      - document

Note:

1. Collection 有很多 Document

2. Document 存放 key: value 對，也可以存一個新的 collection

### Ref

<https://youtu.be/sh7xiO7jnV0>

<https://israynotarray.com/nodejs/20221225/1867465275/>
