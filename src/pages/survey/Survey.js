import SurveyCSS from "./Survey.module.css";
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callSurveyAPI } from '../../api/SurveyAPICalls';


import React from "react";

function Survey() {

    const surveys = useSelector(state => state.surveyReducer);
    const surveyList = surveys.data;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const onClickTableTr = (surNo) => {
        navigate(`/surveyDetail/${surNo}`, { replace: true });
    }

    useEffect(
        () => {
            dispatch(callSurveyAPI({
                notNo: params.notNo,
                currentPage: currentPage
            }));
        }
        , [currentPage]
    )




    // 슬라이드 배너 코드
    let interval;
    let activeIndex = 1;

    $(document).ready(function () {
        interval = setInterval(changeActiveIndex, 2500);
        $('.listButtonItem').on('click', function () {
            // list button의 색상 변경
            const index = $(this).index();
            activeIndex = index;
            changeActiveIndex();
            clearInterval(interval);
            // animation 재설정을 위해 animation을 잠시 제거한다.
            $('.banner').css('animation', 'none');
            // animation 재설정
            $('.banner').animate({ marginLeft: `${-100 * index}%` }, 1, function () {
                //1초의 시간 여유(해당 이미지로 이동하는 animation을 위한 시간)를 두고 다시 animation을 설정한다.
                setTimeout(function () {
                    $('.banner').css('animation', `animation${index + 1} 10s infinite`)

                    interval = setInterval(changeActiveIndex, 2500);
                }, 1000)
            })
        })
    })
    function changeActiveIndex() {
        if (activeIndex > 3) {
            activeIndex %= 4;
        }
        changeActiveBtn();
        activeIndex += 1;
    }
    function changeActiveBtn() {
        $('.listButtonItem').removeClass('active');
        $(`.listbutton span:eq(${activeIndex})`).addClass('active');
    }






    return (


        <div className={SurveyCSS.survey}>
            <h1 className={SurveyCSS.text}>설문조사</h1>
            <div className={SurveyCSS.roll}>
                <div className={SurveyCSS.rolling}>

                    <div className={SurveyCSS.bannerBox}>
                        <div className={SurveyCSS.banner}>
                            <div data-index={1}><a href="#">
                                <img src="static/images/logo.png" alt="로고" />
                            </a></div >
                            <div data-index={2}><a href="#">
                                <img src="static/images/logo.png" alt="로고" />
                            </a></div>
                            <div data-index={3}><a href="/event/eventPage">
                                <img src="static/images/logo.png" alt="로고" />
                            </a></div>
                            <div data-index={4}><a href="#">
                                <img src="static/images/logo.png" alt="로고" />
                            </a></div>
                        </div >
                        <div className={SurveyCSS.listbutton}>
                            <span className={SurveyCSS.listButtonItem}></span>
                            <span className={SurveyCSS.listButtonItem}></span>
                            <span className={SurveyCSS.listButtonItem}></span>
                            <span className={SurveyCSS.listButtonItem}></span>
                        </div>
                    </div>
                </div>

                <div className={SurveyCSS.surMain}>

                    <div className={SurveyCSS.surMainBox}>
                        <button className={SurveyCSS.surButton}>
                            진행중인 설문
                        </button>
                    </div>
                    <div className={SurveyCSS.surSubBox}>
                        <div className={SurveyCSS.surFlexBox}>
                            {/* <table className={SurveyCSS.surBox}>
                                <thead>
                                    <button className={SurveyCSS.surIngBox}>진행중</button>
                                </thead>
                                <tbody>
                                    {
                                        Array.isArray(surveyList) && surveyList.map(
                                            (surveyList) => (
                                                <tr
                                                    key={surveyList.surNo}
                                                    onClick={() => onClickTableTr(surveyList.surNo)}
                                                >
                                                    <th >{surveyList.surTitle}</th>
                                                    <th >{surveyList.surStartDate} ~ {surveyList.surEndDate}</th>
                                                    <th >{surveyList.dep.depName}</th>
                                                    <img src={surveyList.surveyImageUrl} alt="썸네일" />
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table> */}
                            <table>

                                <thead className={SurveyCSS.surFlexBox1}>
                                    {
                                        Array.isArray(surveyList) && surveyList.map(
                                            (surveyList) => (
                                                <tr
                                                    key={surveyList.surNo}
                                                    onClick={() => onClickTableTr(surveyList.surNo)}
                                                >
                                                    
                                                    <tbody className={SurveyCSS.surBox}>

                                                    
                                                    

                                                        <td className={SurveyCSS.surIngBox}>진행중</td>
                                                        <tr className={SurveyCSS.surTitle}>{surveyList.surTitle}</tr>
                                                        <tr >{surveyList.surStartDate} ~ {surveyList.surEndDate}</tr>
                                                        <tr>{surveyList.dep.depName}</tr>
                                                        <td>

                                                            <img src={surveyList.surveyImageUrl} alt="썸네일" />
                                                        </td>
                                                        
                                                    
                                                    </tbody>
                                                </tr>
                                            )
                                        )
                                    }
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Survey;