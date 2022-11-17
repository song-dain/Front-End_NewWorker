import { NavLink } from "react-router-dom";
import NavCSS from "./Navbar.module.css";
import "../../fonts/Font.css";

// import { decodeJwt } from '../../utils/tokenUtils';


function Navbar() {

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

                    {/* 관리자로 로그인 했을시 생성되는 네브 목록
                    <li id="slideToggleBtn7">직원관리</li> */}
                    {/* { decoded === "ROLE_ADMIN" && <li><NavLink to="/product-management">로그인</NavLink></li>}  */}
                </div>



            </div>
        </div>
    );
}

export default Navbar;