import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainCSS from "./Main.module.css";

function Main() {

    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = window.localStorage.getItem('accessToken');
        // 로그인 되어 있지 않으면 로그인 화면으로 보내기 
        // 시간까지 확인해서 유효성 확인하는게 좋음
        if(!isLogin) {
            navigate('login', { replace : true });
        }
    });

    return(
        <div className={MainCSS.main}>
           
        </div>
    );
}

export default Main; 