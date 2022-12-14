import SubSidebarCSS from "./SubSidebar.module.css";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { decodeJwt } from '../../utils/tokenUtils';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SubSidebar() {

    const navigate = useNavigate();
    const employee = useSelector(state => state.employeeReducer);

    const onClickSurveyInsert = () => {
        console.log('[survey] onClickSurveyInsert');
        navigate("/survey-registration", { replace: false })
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if (isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    $(function () {
        $("#slideToggleBtn").on("click", function () {
            $("#divBox").fadeToggle("fast");
            $("#divBox1").hide();
            $("#divBox2").hide();
            $("#divBox3").hide();
            $("#divBox4").hide();
            $("#divBox5").hide();

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

        });
    });


    return (

        <div className={SubSidebarCSS.sidebar}>

            {/* 1.???????????? ?????? */}
            <div className={SubSidebarCSS.divBox} id="divBox">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>????????????</li>
                </div>
                <div>

                    <ul>
                        <li className={SubSidebarCSS.sideTitle1}>????????? ??????</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="att/start">?????? ?????? ??????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}>?????? ?????? ??????</li>
                    </ul>
                    <ul>
                        <li className={SubSidebarCSS.sideTitle2}>????????? ??????</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="rest/regist">?????? ??????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="rest/list">?????? ??????</NavLink></li>
                        {decoded === "ROLE_ADMIN" && <li className={SubSidebarCSS.smallTitle}><NavLink to="rest/list/admin">?????? ??????</NavLink></li>}
                    </ul>
                </div>

            </div>
            {/* 2.???????????? ?????? */}
            <div className={SubSidebarCSS.divBox} id="divBox1">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>????????????</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="approval/regist">?????? ??????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="approval/draft">?????????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="approval/approver">?????????</NavLink></li>
                    </ul>

                </div>

            </div>

            {/* 3.????????? ?????? */}
            <div className={SubSidebarCSS.divBox} id="divBox2">
                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CoPresentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>????????????</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="emp/employeeList">?????? ??????</NavLink></li>
                        {/* ???????????? ???????????? ???????????? ????????? ??? */}
                        {employee.employeeRole === 'ROLE_ADMIN' && <li className={SubSidebarCSS.smallTitle}><NavLink to="employee/regist">?????? ??????</NavLink></li>}

                    </ul>

                </div>
            </div>
            {/* 3.????????? ?????? */}
            <div className={SubSidebarCSS.divBox} id="divBox3">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <EmailIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>?????????</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/write">??? ????????? ??????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/receive">?????? ????????????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/send">?????? ????????????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/impo">?????? ????????????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="message/bin/receive">?????????</NavLink></li>
                    </ul>

                </div>

            </div>
            {/* 4.????????? ?????? */}
            <div className={SubSidebarCSS.divBox} id="divBox4">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <CalendarMonthIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>?????????</li>
                </div>
                <div className={SubSidebarCSS.smallBox}>

                    <ul>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="calendar/add">??? ?????? ??????</NavLink></li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="calendar">??? ?????????</NavLink></li>

                    </ul>

                </div>

            </div>
            {/* 5.???????????? ?????? */}
            <div className={SubSidebarCSS.divBox} id="divBox5">

                <div className={SubSidebarCSS.mui}>
                    <li>
                        <AssignmentIcon className={SubSidebarCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>????????????</li>
                </div>
                <div className={SubSidebarCSS.midleTitle}>
                     <li onClick={onClickSurveyInsert}>
                        ????????????
                    </li>

                </div>
                <div>
                    <ul>
                        <li className={SubSidebarCSS.sideTitle1}> ?????????</li>
                        <li className={SubSidebarCSS.smallTitle}><NavLink to="survey/ing">???????????? ??????</NavLink></li>
                    </ul>

                </div>

            </div>
            

        </div>
    );

}

export default SubSidebar;