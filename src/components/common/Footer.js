import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callLogoutAPI } from '../../api/EmployeeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import FooterCSS from "./Footer.module.css";
import LogoutIcon from '@mui/icons-material/Logout';
import "../../fonts/Font.css";

function Footer() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    //decoded = ROLE_ADMIN or ROLE_USER 등이 로그인 시 담기게 됨. 즉, 어느 권한을 가지고 있느냐를 판별하는 구간
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* 로그아웃 버튼 이벤트 */
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        alert('로그아웃되어 로그인 화면으로 이동합니다.');
        navigate('/', { replace : true });
    }

    return (
        <div className={FooterCSS.FooterDiv}>
            <div className={FooterCSS.FooterlistUl}>

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