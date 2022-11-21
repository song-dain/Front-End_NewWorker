import { NavLink, useNavigate } from "react-router-dom";
import HeaderCSS from "./Header.module.css";
// import { decodeJwt } from '../../utils/tokenUtils';
import LanguageIcon from '@mui/icons-material/Language';
import "../../fonts/Font.css";
import $ from 'jquery';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CoPresentIcon from '@mui/icons-material/CoPresent';

function Header() {

    const navigate = useNavigate();

    /* 로고 클릭 시 메인 페이지로 이동 */
    const onClickHomeHandler = () => {
        navigate("/", { replace: true });
    }

    // $(function () {
    //     $("#slideToggleBtn").on("click", function () {


    //         $("#divBox").fadeToggle("fast");

    //     });
    // });

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
        <>
            {/* 1.근태관리 부분 */}
            <div className={HeaderCSS.divBox} id="divBox">

                <div className={HeaderCSS.mui}>
                    <li>
                        <AssignmentIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>근태관리</li>
                </div>
                <div>

                    <ul>
                        <li className={HeaderCSS.sideTitle1}> ㅇ근태 관리</li>
                        <li className={HeaderCSS.smallTitle}>일일 근태 등록</li>
                        <li className={HeaderCSS.smallTitle}>월간 근태 현황</li>
                    </ul>
                    <ul>
                        <li className={HeaderCSS.sideTitle2}>ㅇ휴가 관리</li>
                        <li className={HeaderCSS.smallTitle}>연차 신청</li>
                        <li className={HeaderCSS.smallTitle}>연차 조회</li>
                    </ul>
                </div>

            </div>
            {/* 2.전자결재 부분 */}
            <div className={HeaderCSS.divBox} id="divBox1">

                <div className={HeaderCSS.mui}>
                    <li>
                        <AssignmentIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>전자결재</li>
                </div>
                <div className={HeaderCSS.smallBox}>

                    <ul>
                        <li className={HeaderCSS.smallTitle}>결재 작성</li>
                        <li className={HeaderCSS.smallTitle}>상신함</li>
                        <li className={HeaderCSS.smallTitle}>수신함</li>
                    </ul>

                </div>

            </div>

            {/* 3.주소록 부분 */}
            <div className={HeaderCSS.divBox} id="divBox2">
                <div className={HeaderCSS.mui}>
                    <li>
                        <CoPresentIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>직원관리</li>
                </div>
                <div className={HeaderCSS.smallBox}>

                    <ul>
                        <li className={HeaderCSS.smallTitle}>직원 조회</li>
                        {/* 관리자로 로그인시 보이게끔 작업할 것 */}
                        <li className={HeaderCSS.smallTitle}>직원 등록</li>

                    </ul>

                </div>
            </div>
            {/* 3.메세지 부분 */}
            <div className={HeaderCSS.divBox} id="divBox3">

                <div className={HeaderCSS.mui}>
                    <li>
                        <EmailIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>메시지</li>
                </div>
                <div className={HeaderCSS.smallBox}>

                    <ul>
                        <li className={HeaderCSS.smallTitle}><NavLink to="/emp/message/write">새 메시지 작성</NavLink></li>
                        <li className={HeaderCSS.smallTitle}><NavLink to="/emp/message/receive">받은 메시지함</NavLink></li>
                        <li className={HeaderCSS.smallTitle}><NavLink to="/emp/message/send">보낸 메시지함</NavLink></li>
                        <li className={HeaderCSS.smallTitle}><NavLink to="/emp/message/impo">중요 메시지함</NavLink></li>
                        <li className={HeaderCSS.smallTitle}><NavLink to="/emp/message/bin">휴지통</NavLink></li>
                    </ul>

                </div>

            </div>
            {/* 4.캘린더 부분 */}
            <div className={HeaderCSS.divBox} id="divBox4">

                <div className={HeaderCSS.mui}>
                    <li>
                        <CalendarMonthIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>캘린더</li>
                </div>
                <div className={HeaderCSS.smallBox}>

                    <ul>
                        <li className={HeaderCSS.smallTitle}>새 일정 추가</li>
                        <li className={HeaderCSS.smallTitle}>내 캘린더</li>

                    </ul>

                </div>

            </div>
            {/* 5.설문조사 부분 */}
            <div className={HeaderCSS.divBox} id="divBox5">

                <div className={HeaderCSS.mui}>
                    <li>
                        <AssignmentIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>설문조사</li>
                </div>
                <div>
                    <ul>
                        <li className={HeaderCSS.sideTitle1}> ㅇ설문</li>
                        <li className={HeaderCSS.smallTitle}>진행중인 설문</li>
                        <li className={HeaderCSS.smallTitle}>마감된 설문</li>
                        <li className={HeaderCSS.smallTitle}>내가 만든 설문</li>
                    </ul>

                </div>

            </div>
            {/* 7.직원 관리 부분 / 관리자 로그인 시 */}
            <div className={HeaderCSS.divBox} id="divBox7">

                <div className={HeaderCSS.mui}>
                    <li>
                        <CoPresentIcon className={HeaderCSS.sideIcon} color="action" fontSize="large" />
                    </li>
                    <li>직원관리</li>
                </div>
                <div className={HeaderCSS.smallBox}>

                    <ul>
                        <li className={HeaderCSS.smallTitle}>직원 조회</li>
                        <li className={HeaderCSS.smallTitle}>직원 등록</li>

                    </ul>

                </div>

            </div>


            <div className={HeaderCSS.HeaderDiv}>
                <div className={HeaderCSS.HeaderlistUl}>
                    <div>

                        <img src="static/images/logo.png" alt="로고" />


                        <h1>CodingSpike</h1>

                    </div>
                    <div className={HeaderCSS.HeaderDiv1}>

                        <div className={HeaderCSS.HeaderProfile}>
                            {/* 값을 불러와서 사진이 넣어지게 나중에 설정 */}

                        </div>
                    </div>
                    {/* IT부서와 이름 직급은 나중에 값 수정해야 함. */}
                    <div className={HeaderCSS.ProfileDiv}>
                        <NavLink to="">IT부서</NavLink> | <NavLink to="">이땡땡대리</NavLink>
                    </div>
                    <div className={HeaderCSS.HeaderHomebtn}>

                        <button
                            className={HeaderCSS.LogoBtn}
                            onClick={onClickHomeHandler}
                        >
                            <LanguageIcon color="primary" fontSize="small" />HOME
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
}

export default Header;