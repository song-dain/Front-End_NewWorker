import SidebarCSS from "./Sidebar.module.css";
import LanguageIcon from '@mui/icons-material/Language';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callLogoutAPI } from '../../api/EmployeeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';




function Sidebar() {

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
                            onClick={() => navigate(`/`)}
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
                    <li id="slideToggleBtn2"><NavLink to="emp/employeeList">직원조회</NavLink></li>
                    <li id="slideToggleBtn3"><NavLink to="message/receive">메시지</NavLink></li>
                    <li id="slideToggleBtn4"><NavLink to="calendar">내 캘린더</NavLink></li>
                    <li id="slideToggleBtn6"><NavLink to="Notice">전사공지</NavLink></li>

                    <li id="slideToggleBtn5"><NavLink to="Survey">설문조사</NavLink></li>

                    {/* 관리자로 로그인 했을시 생성되는 네브 목록
                    <li id="slideToggleBtn7">직원관리</li> */}
                    {/* { decoded === "ROLE_ADMIN" && <li><NavLink to="/product-management">로그인</NavLink></li>}  */}
                </div>



            </div>

            <div className={SidebarCSS.FooterDiv}>
                <div className={SidebarCSS.FooterlistUl}>

                    <button
                        className={SidebarCSS.LogoutBtn}
                        onClick={onClickLogoutHandler}
                    >
                        로그아웃
                        <LogoutIcon className={SidebarCSS.footIcon} />
                    </button>



                </div>
            </div>

        </div>

    );

}

export default Sidebar;