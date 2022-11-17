// import {  useNavigate } from "react-router-dom";
import FooterCSS from "./Footer.module.css";
import LogoutIcon from '@mui/icons-material/Logout';
import "../../fonts/Font.css";
// import { decodeJwt } from '../../utils/tokenUtils';
// import { useDispatch } from "react-redux";
// import { callLogoutAPI } from "../../apis/MemberAPICalls";

function Footer() {

    /* localStorage에 저장된 토큰 정보가 있으면 로그인 한 상태이다. */
    // const isLogin = window.localStorage.getItem('accessToken');

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    /* 로그아웃 버튼 이벤트 */
    const onClickLogoutHandler = () => {
        // window.localStorage.removeItem('accessToken');
        // dispatch(callLogoutAPI());
        // alert('로그아웃 후 메인으로 이동합니다.');
        // navigate('/', { replace : true });
    }

    return (
        <div className={FooterCSS.FooterDiv}>
            <div className={FooterCSS.FooterlistUl}>

                {/* 로그인했을때만 노출되도록 나중에 설정값 변경 */}

                <button
                    className={FooterCSS.LogoutBtn}
                    onClick={onClickLogoutHandler}
                >
                    로그아웃
                    <LogoutIcon className={FooterCSS.footIcon} />
                </button>

                
                
            </div>
        </div>
    );
}

export default Footer;