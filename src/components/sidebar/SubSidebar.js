import SubSidebarCSS from "./SubSidebar.module.css";

import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CoPresentIcon from '@mui/icons-material/CoPresent';

import $ from 'jquery';

import { NavLink } from "react-router-dom";

function SubSidebar() {

    $(function () {
        $("#slideToggleBtn").on("click", function () {
            $("#divBox").fadeToggle("fast");
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();
            $("#divBox6").hide();
        });
    });

    $(function () {
        $("#slideToggleBtn1").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").fadeToggle("fast");
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();
            $("#divBox6").hide();
        });
    });

    $(function () {
        $("#slideToggleBtn2").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").fadeToggle("fast");
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();
            $("#divBox6").hide();
        });
    });

    $(function () {
        $("#slideToggleBtn3").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").fadeToggle("fast");
            $("#divBox4").hide();
            $("#divBox5").hide();
            $("#divBox6").hide();
        });
    });

    $(function () {
        $("#slideToggleBtn4").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").fadeToggle("fast");
            $("#divBox5").hide();
            $("#divBox6").hide();
        });
    });

    $(function () {
        $("#slideToggleBtn5").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").fadeToggle("fast");
            $("#divBox6").hide();
        });
    });

    $(function () {
        $("#slideToggleBtn6").on("click", function () {
            $("#divBox").hide();
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();
            $("#divBox6").hide();
        });
    });

    return (

        <div className={SubSidebarCSS.sidebar}>

            {/* 1.근태관리 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>근태관리</li>
                </div>
                <div>

                    <ul>
                        <li className={SubSidebarCSS.sideTitle1}>ㅇ근태 관리</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="Test">일일 근태 등록</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="Home">월간 근태 현황</NavLink></li>
                    </ul>
                    <ul>
                        <li className={SubSidebarCSS.sideTitle2}>ㅇ휴가 관리</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="Copy">연차 신청</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}>연차 조회</li>
                    </ul>
                </div>

            </div>
            {/* 2.전자결재 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox1">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>전자결재</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}>결재 작성</li>
                        <li className={SubSidebarCSS.smallTitle}>상신함</li>
                        <li className={SubSidebarCSS.smallTitle}>수신함</li>
                    </ul>

                </div>

            </div>

            {/* 3.주소록 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox2">
                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CoPresentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>직원관리</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}>직원 조회</li>
                        {/* 관리자로 로그인시 보이게끔 작업할 것 */}
                        <li className={SubSidebarCSS.smallTitle}>직원 등록</li>

                    </ul>

                </div>
            </div>
            {/* 3.메세지 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox3">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <EmailIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>메시지</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/receive">새 메시지 작성</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/receive">받은 메시지함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/send">보낸 메시지함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/impo">중요 메시지함</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}>휴지통</li>
                    </ul>

                </div>

            </div>
            {/* 4.캘린더 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox4">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CalendarMonthIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>캘린더</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}>새 일정 추가</li>
                        <li className={SubSidebarCSS.smallTitle}>내 캘린더</li>

                    </ul>

                </div>

            </div>
            {/* 5.설문조사 부분 */}
            <div className={SubSidebarCSS.divBox} id="divBox5">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>설문조사</li>
                </div>
                <div>
                    <ul>
                        <li className={SubSidebarCSS.sideTitle1}> ㅇ설문</li>
                        <li className={SubSidebarCSS.smallTitle}>진행중인 설문</li>
                        <li className={SubSidebarCSS.smallTitle}>마감된 설문</li>
                        <li className={SubSidebarCSS.smallTitle}>내가 만든 설문</li>
                    </ul>

                </div>

            </div>
            {/* 7.직원 관리 부분 / 관리자 로그인 시 */}
            <div className={SubSidebarCSS.divBox} id="divBox7">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CoPresentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>직원관리</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}>직원 조회</li>
                        <li className={SubSidebarCSS.smallTitle}>직원 등록</li>

                    </ul>

                </div>

            </div>

        </div>
    );

}

export default SubSidebar;