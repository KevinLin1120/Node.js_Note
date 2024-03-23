const admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://nodes-with-firebase.appspot.com"
});

// Auth
const signup = async (req) => {
    const userRecord = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false
    })
    console.log("userRecord: ", userRecord);
    return userRecord;

    // 更新使用者資料用
    // admin.auth().updateUser(userRecord.uid, { option })
}

// Firestore
const db = admin.firestore();

const createDt = (req) => {
    const id = req.body.email;
    const userJson = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }
    // 若想要 uuid，可用 add 直接加 doc 資料
    // const res = db.collection("users").add(userJson);
    const res = db.collection("users").doc(id).set(userJson);
    return res;
}

const readDtAll = async () => {
    const userRef = db.collection("users");
    const result = await userRef.get();
    let resultArr = [];
    result.forEach(doc => {
        resultArr.push(doc.data());
    });
    return resultArr;
}
const readDt = async (req) => {
    const userRef = db.collection("users").doc(req.params.id);
    const result = await userRef.get();
    return result;
}
const updateDt = async (req) => {
    const id = req.body.email;
    const newFirstName = req.body.newFirstName;
    const userRef = db.collection("users").doc(id)
        .update({
            firstname: newFirstName
        });
    return userRef;
}
const deleteDt = async (req) => {
    const id = req.body.id;
    const userRef = await db.collection("users").doc(id)
        .delete();
    return userRef;
}

var bucket = admin.storage().bucket();
bucket.upload("./public/images/test.png");


module.exports = {
    signup,
    createDt,
    readDt,
    readDtAll,
    updateDt,
    deleteDt
}