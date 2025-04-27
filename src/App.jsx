import { useState } from "react";
import Logo from "./assets/hand.png";
import "./App.css";

import Ranking from "./components/Ranking/Ranking";

function App() {
    return (
        <>
            <div className="navbar">
                <div className="logo-container">
                    <div className="logo">
                        <img src={Logo} className="logo hand" alt="logo" />
                    </div>
                    <h1 className="title">每天練一手</h1>
                </div>
                <div className="menu-container">
                    <div className="menu">
                        <ul>
                            <li>首頁</li>
                            <li>排行榜</li>
                            {/* <li></li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <Ranking />
        </>
    );
}

export default App;
