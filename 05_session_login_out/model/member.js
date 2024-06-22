const mongoose = require("mongoose"); // For connecting DB

const memberSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true // Primary key
    },
    pw: {
        type: String,
        required: true
    }
});

const memberModel = mongoose.model("member"/* 資料表 */, memberSchema);

module.exports = memberModel;