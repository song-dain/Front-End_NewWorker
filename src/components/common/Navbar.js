import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavCSS from "./Navbar.module.css";
import { callLogoutAPI } from '../../api/EmployeeAPICalls';
import "../../fonts/Font.css";
import { decodeJwt } from '../../utils/tokenUtils';

function Navbar() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null; // 나중에 권한 이용할때

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
        //decoded = ROLE_ADMIN or ROLE_USER 등이 로그인 시 담기게 됨. 즉, 어느 권한을 가지고 있느냐를 판별하는 구간
    }

    /* 로그아웃 버튼 이벤트 */
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        alert('로그아웃되어 로그인 화면으로 이동합니다.');
        navigate('/', { replace : true });
    }

    return (
        <div className={NavCSS.NavbarDiv}>
            <div className={NavCSS.NavlistUl}>

                <div className={NavCSS.NavlistDiv}>
                    <li id="slideToggleBtn">근태관리</li>
                    <li id="slideToggleBtn1">전자결재</li>
                    <li id="slideToggleBtn2">직원조회</li>
                    <li id="slideToggleBtn3">메세지</li>
                    <li id="slideToggleBtn4">캘린더</li>
                    <li id="slideToggleBtn6">전사공지</li>
                    <li id="slideToggleBtn5">설문조사</li>

                </div>



            </div>
        </div>
    );
}

export default Navbar;