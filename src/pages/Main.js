import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainCSS from "./Main.module.css";
import { callUnreadMessageAPI } from "../api/MessageAPICalls";

function Main() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unread = useSelector(state => state.messageReducer);

    useEffect(() => {
        const isLogin = window.localStorage.getItem('accessToken');
        // 로그인 되어 있지 않으면 로그인 화면으로 보내기 
        // 시간까지 확인해서 유효성 확인하는게 좋음
        if(!isLogin) {
            navigate('login', { replace : true });
        }

        dispatch(callUnreadMessageAPI());

        
    }, []
    );

    const onClickUnreadMessage = () => {
        navigate('/message/receive', { replace : true });
    }

    return(
        <div className={MainCSS.main}>
           <div
                className={MainCSS.unreadMessage}
                onClick={ () => onClickUnreadMessage() }
           >읽지 않은 메시지가 <span className={MainCSS.unreadNum}>{unread.unreadMessage}</span> 건 있습니다.</div>
        </div>
    );
}

export default Main; 