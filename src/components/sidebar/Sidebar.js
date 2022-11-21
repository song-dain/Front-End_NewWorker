import SidebarCSS from "./Sidebar.module.css";
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div>

            <div>
                <div className={SidebarCSS.HeaderlistUl}>
                    <div>

                        <img src="static/images/logo.png" alt="로고" />


                        <h1>CodingSpike</h1>

                    </div>
                    <div>

                        <div className={SidebarCSS.HeaderProfile}>
                            {/* 값을 불러와서 사진이 넣어지게 나중에 설정 */}

                        </div>
                    </div>
                    {/* IT부서와 이름 직급은 나중에 값 수정해야 함. */}
                    <div className={SidebarCSS.ProfileDiv}>
                        IT부서 | 이땡땡대리
                    </div>
                    <div className={SidebarCSS.HeaderHomebtn}>

                        <button
                            className={SidebarCSS.LogoBtn}
                        >
                            <LanguageIcon color="primary" fontSize="small" />HOME
                        </button>
                    </div>


                </div>
            </div>


            <div className={SidebarCSS.NavlistUl}>

                <div className={SidebarCSS.NavlistDiv}>
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

            <div className={SidebarCSS.FooterlistUl}>

                {/* 로그인했을때만 노출되도록 나중에 설정값 변경 */}

                <button
                    className={SidebarCSS.LogoutBtn}

                >
                    로그아웃
                    <LogoutIcon className={SidebarCSS.footIcon} />
                </button>



            </div>

        </div>

    );

}

export default Sidebar;