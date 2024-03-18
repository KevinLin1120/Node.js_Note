require("dotenv").config();

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
    getFirestore,
    doc/* create doc */,
    collection /* define the collection, which will be retrieved from*/,
    setDoc/* push the created doc into DB */,
    getDocs /* get collection from db */,
    addDoc,
    deleteDoc,
    query /* filter the data, to query */,
    where /* condition to filter for query */
} = require("firebase/firestore"); // To connect to fireStore
// For file storage
// https://firebase.google.com/docs/storage/web/start?authuser=1
const { getStorage, ref, uploadBytes } = require("firebase/storage");
// const admin = require("firebase-admin");
// const multer = require('multer');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

let app;
let db;
// Get a reference to the storage service, which is used to create references in your storage bucket
let storage;
// Create a storage reference from our storage service
// let storageRef;
// let imageRef;
// let testImgRef;

// Initialize Firebase
const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore();

        // storage = getStorage();
        // storageRef = ref(storage, 'images/test_photo.png');
        // imageRef = ref(storage, 'images');
        // testImgRef = ref(storage, 'images/test.png');

        return app;
    } catch (e) {
        console.log(e, "firebase initialize Firebase app");
    }
}

const getFirebaseApp = () => {
    return app;
}

// const analytics = getAnalytics(app);

// Create data
const createData = async () => {
    const data = {
        key1: "test",
        key2: 132,
        key3: new Date()
    };
    // Create data
    try {
        // doc(parm1, parm2, parm3)
        // parm1: connection to the firestore
        // parm2: collection name
        // parm3: unique id
        const document = doc(db, "testCollection", "unique-id-2");

        // Upload the data
        let dataUpdated = await setDoc(document, data);
        return dataUpdated;
    } catch (e) {
        console.log(e, "firebase upload data");
    }
}

// Read data
const readData = async (from, to) => {
    try {
        // parm1: connection, parm2: collection name
        const collectionRef = collection(db, "testCollection");

        // Retrieve data
        const dataArr = [];

        // Create the data filter
        // const q = query(collectionRef); // All data
        const q = query(collectionRef, where("key1", "==", "test"));

        // Find the data
        const docSnap = await getDocs(q);

        docSnap.forEach((doc) => {
            dataArr.push(doc.data());
        });
        return dataArr;
    } catch (e) {
        console.log(e, "firebase get the data");
    }
}

// Update Data
const updateData = async () => {
    try {
        const document = doc(db, "testCollection/unique_id"); // id 可以寫在 collection 斜線後，或另外一個參數（參考上方）
        const docData = {
            description: 'A delicious vanilla latte',
            price: 4.41,
            milk: 'Whole',
            vegan: false,
        }
        await setDoc(document, docData, { merge: true });
    } catch (e) {
        console.log(e, "firebase update the data");
    }
}

// Delete Data
const deleteData = async () => {
    const document = doc(db, "testCollection", 'unique-id-2');
    await deleteDoc(document);
}

const uploadImg = async () => {
    try {
        // 讀取本地檔案
        const fs = require('fs');
        const fileData = fs.readFileSync('./public/images/test.png');

        console.log(fileData);

        // 上傳檔案
        uploadBytes(testImgRef, fileData)
            .then((snapshot) => {
                console.log("檔案已成功上傳");
            })

    } catch (e) {
        console.error("上傳錯誤：", e);
    }
}

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    createData,
    readData,
    updateData,
    deleteData,
    uploadImg
};