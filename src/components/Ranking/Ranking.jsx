import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUY99IAd5Bmco7b1louPe5_2WoOubOKoY",
    authDomain: "cpe-practice.firebaseapp.com",
    projectId: "cpe-practice",
    storageBucket: "cpe-practice.firebasestorage.app",
    messagingSenderId: "402986973872",
    appId: "1:402986973872:web:10bb03e195323d8ad95975",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const uids = [1623349];

function Ranking() {
    const [rankings, setRankings] = useState([]); // Store rankings for all uids
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchRankings() {
            try {
                const results = await Promise.all(
                    uids.map(async (uid) => {
                        const response = await fetch(
                            `https://uhunt.onlinejudge.org/api/ranklist/${uid}/0/0`
                        );
                        const data = await response.json();
                        return data.length > 0 ? data[0] : null;
                    })
                );

                if (isMounted) {
                    setRankings(results.filter((item) => item !== null)); // Filter out null results
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching user rankings:", error);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchRankings();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return <div>Loading user rankings...</div>;
    }

    if (rankings.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div className="ranking section" id="ranking">
            <h1 className="ranking title">User Rankings</h1>
            <ul>
                {rankings.map((user, index) => (
                    <li key={index}>
                        <p>
                            Username: {user.username}({user.name})
                        </p>
                        <p>Problems Solved: {user.ac}</p>
                        <div className="timeline solving">
                            <p>AC in 2 Days: {user.activity[0]}</p>
                            <p>AC in 7 Days: {user.activity[1]}</p>
                            <p>AC in 31 Days: {user.activity[2]}</p>
                            <p>AC in 3 Months: {user.activity[3]}</p>
                            <p>AC in 1 Year: {user.activity[4]}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Ranking;

// async function readUserData() {
//     const dbref = ref(getDatabase());
//     get(child(dbref, `uid/`))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 const correctData = snapshot.val();
//                 console.log("Query Success");
//                 console.log(correctData);
//                 console.log(snapshot);
//                 if (stu.idnumber === correctData.IDNUMBER) {
//                     console.log("Data correct.");
//
//                 } else {
//                     console.log("Data wrong.");
//                     alert("學號或身分證字號錯誤");
//                 }
//             } else {
//                 console.log("No data available");
//                 alert("找不到該學號的資料");
//             }
//         })
//         .catch((error) => {
//             console.error("Error reading data: ", error);
//             alert("伺服器發生錯誤，請稍後再試\n錯誤訊息: " + error.message);
//         });
// }
