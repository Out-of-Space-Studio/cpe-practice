window.todo = async function () {
    console.log("SUBMITED");
    // alert("SUBMITED");
    writeUserData();
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDUY99IAd5Bmco7b1louPe5_2WoOubOKoY",
    authDomain: "cpe-practice.firebaseapp.com",
    databaseURL:
        "https://cpe-practice-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cpe-practice",
    storageBucket: "cpe-practice.firebasestorage.app",
    messagingSenderId: "402986973872",
    appId: "1:402986973872:web:10bb03e195323d8ad95975",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        "6LcPkykrAAAAABGiapiEcFbZsvFRRreED9HGoJM-"
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
});

async function writeUserData() {
    const db = getDatabase();
    const dt = new Date().toString();
    set(ref(db, `/candidate`), {
        NAME: "test",
    })
        .then(function () {
            console.log("Data written successfully");
            alert(
                "報名成功！\n請於繳費時間內繳納完畢並完成匯款登記，感謝您的配合！\n\n匯款帳號：(822)29954-1144-281"
            );
            window.location.href = "./index.html";
        })
        .catch(function (error) {
            console.error("Error writing data: ", error);
            alert("伺服器發生錯誤，請稍後再試\n錯誤訊息: " + error.message);
        });
}
