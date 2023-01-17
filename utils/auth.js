const admin = require("firebase-admin");
const firebase_service = require("../firebase_service.json");

admin.initializeApp({credential: admin.credential.cert(firebase_service),
storageBucket: "lab3-13761.appspot.com"});
// 
const db = admin.firestore();
// exports.db = admin.firestore();
exports.db = db;
exports.bucket = admin.storage().bucket();
