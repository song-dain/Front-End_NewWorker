import SidebarCSS from "./Sidebar.module.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callLogoutAPI } from '../../api/EmployeeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import { callUnreadMessageAPI } from "../../api/MessageAPICalls";
import { callEmployeeInfoAPI } from "../../api/EmployeeAPICalls";
import profileImg from "../../img/profileImg.png";
import SubSidebarCSS from "./SubSidebar.module.css";


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
    const employee = useSelector(state => state.employeeReducer);
    const myInfo = useSelector(state => state.employeeReducer);
    const unread = useSelector(state => state.messageReducer);

    /* url 변경될 때마다 안 읽은 메시지 리로드 */
    useEffect(() => {
        dispatch(callUnreadMessageAPI());
        dispatch(callEmployeeInfoAPI());
    }, [window.location.href]
    );

    /* 로그아웃 버튼 이벤트 */
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        dispatch(callLogoutAPI());
        alert('로그아웃되어 로그인 화면으로 이동합니다.');
        navigate('/login', { replace : true });
    }

    // 설문조사 등록이동 버튼 이벤트
    const onClickSurveyInsert = () => {
        console.log('[survey] onClickSurveyInsert');
        navigate("/survey-registration", { replace: false })
    }

    return (

        <div>

            <div>
                <div className={SidebarCSS.HeaderlistUl}>
                    <div>

                        <img src="static/images/logo.png" alt="로고" 
                             onClick={ () => navigate('/', { replace : true }) }
                        />


                        <div
                            onClick={ () => navigate('/', { replace : true }) }
                            className={SidebarCSS.comName}>CodingSpike
                        </div>

                    </div>
                    <div>

                        <div className={SidebarCSS.HeaderProfile}>
                            {/* 값을 불러와서 사진이 넣어지게 나중에 설정 */}
                            <img
                                className={SidebarCSS.HeaderProfile}
                                src={ myInfo.employeeImageUrl ? myInfo.employeeImageUrl : profileImg} />
                        </div>
                    </div>
                    {/* IT부서와 이름 직급은 나중에 값 수정해야 함. */}
                    <div className={SidebarCSS.ProfileDiv}>
                        { myInfo.position && <span className={SidebarCSS.profilename}>
                        {myInfo.dep.depName}<span className={SidebarCSS.section}>｜</span>{myInfo.employeeName}{myInfo.position.positionName}
                        </span> || 'loding'}
                    </div>
                    


                </div>
            </div>


            <div className={SidebarCSS.NavlistUl}>

                <div class="dropdown" className={SidebarCSS.NavlistDiv}>
                    <input type="checkbox" id="sideMenu01"/>
                    <label for="sideMenu01">근태관리<em></em></label>
                        <div>
                            <ul>
                                <li><NavLink to="rest/regist">연차 신청</NavLink></li>
                                <li><NavLink to="rest/list">연차 조회</NavLink></li>
                                {decoded === "ROLE_ADMIN" && <li><NavLink to="rest/list/admin">연차 인가</NavLink></li>}
                            </ul>
                        </div>
                    
                    <input type="checkbox" id="sideMenu02"/>
                    <label for="sideMenu02">전자결재<em></em></label>
                        <div>
                            <ul>
                                <li><NavLink to="approval/regist">결재 작성</NavLink></li>
                                <li><NavLink to="approval/draft">상신함</NavLink></li>
                                <li><NavLink to="approval/approver">수신함</NavLink></li>
                            </ul>
                        </div>
                    <input type="checkbox" id="sideMenu03"/>
                    <label for="sideMenu03"><NavLink to="emp/employeeList">직원조회</NavLink><em></em></label>
                        <div>
                            <ul>
                                <li><NavLink to="emp/employeeList">직원 조회</NavLink></li>
                                {/* 관리자로 로그인시 보이게끔 작업할 것 */}
                                {employee.employeeRole === 'ROLE_ADMIN' && <li className={SubSidebarCSS.smallTitle}><NavLink to="employee/regist">직원 등록</NavLink></li>}
                            </ul>
                        </div>
                    <input type="checkbox" id="sideMenu04"/>
                    <label for="sideMenu04"><NavLink to="message/receive">메시지
                       <span className={SidebarCSS.newMessage}>{unread.unreadMessage}</span></NavLink>
                       <em></em></label>
                       <div>
                            <ul>
                                <li><NavLink to="message/write">새 메시지 작성</NavLink></li>
                                <li><NavLink to="message/receive">받은 메시지함</NavLink></li>
                                <li><NavLink to="message/send">보낸 메시지함</NavLink></li>
                                <li><NavLink to="message/impo">중요 메시지함</NavLink></li>
                                <li><NavLink to="message/bin/receive">휴지통</NavLink></li>
                            </ul>
                        </div>
                    <input type="checkbox" id="sideMenu05"/>
                    <label for="sideMenu05"><NavLink to="calendar">내 캘린더</NavLink><em></em></label>
                        <div>
                            <ul>
                                <li><NavLink to="calendar/add">새 일정 추가</NavLink></li>
                                <li><NavLink to="calendar">내 캘린더</NavLink></li>
                            </ul>
                        </div>
                    <input type="checkbox" id="sideMenu06"/>
                    <label for="sideMenu06"><NavLink to="Notice">전사공지</NavLink><em></em></label>
                        
                    <input type="checkbox" id="sideMenu07"/>
                    <label for="sideMenu07"><NavLink to="Survey">설문조사</NavLink><em></em></label>
                        <div>
                            <ul>
                                <li onClick={onClickSurveyInsert}>설문등록</li>
                                
                                <li className={SubSidebarCSS.smallTitle}><NavLink to="survey/ing">진행중인 설문</NavLink></li>
                            </ul>
                        </div>
                    
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