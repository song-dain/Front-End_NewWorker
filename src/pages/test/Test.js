import TestCSS from "./Test.module.css";
import { Outlet } from "react-router-dom";

import React from "react";

function Test() {
// 테스트용
    return(

        <div className={ TestCSS.test}>
            Test
        
        <main>
            <Outlet />
        </main>
        </div>
    );
}

export default Test;