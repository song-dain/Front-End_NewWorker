import React from "react";
import SurveyIngCSS from "./SurveyIng.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callSurveyAPI } from '../../api/SurveyAPICalls';


function SurveyIng() {

    const surveys = useSelector(state => state.surveyReducer);
    const surveyList = surveys.data;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const params = useParams();
    const pageInfo = surveys.pageInfo;

    const onClickTableTr = (surNo) => {
        navigate(`/surveyDetail/${surNo}`, { replace: true });
    }

    /* 페이징 버튼 */

    const pageNumber = [];
    if (pageInfo) {
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
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


    return (


        <div className={SurveyIngCSS.survey}>
            <h1 className={SurveyIngCSS.text}>설문조사</h1>
            <div className={SurveyIngCSS.surMain}>
                <div className={SurveyIngCSS.surMainBox}>
                    <button className={SurveyIngCSS.surButton}>
                        진행중인 설문
                    </button>
                </div>
                <div className={SurveyIngCSS.surSubBox}>
                    <div className={SurveyIngCSS.surFlexBox}>
                        {Array.isArray(surveyList) &&
                            surveyList.map((surveyList) => (
                                <table
                                    className={SurveyIngCSS.surTable}
                                    key={surveyList.surNo}
                                    onClick={() => onClickTableTr(surveyList.surNo)}
                                >

                                    <thead className={SurveyIngCSS.surBox}

                                    >
                                        <tr>
                                            <th className={SurveyIngCSS.surIngBox}>진행중</th>
                                        </tr>
                                        <tr>
                                            <th className={SurveyIngCSS.surTitle}>
                                                {surveyList.surTitle}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className={SurveyIngCSS.surDate}>
                                                {surveyList.surStartDate} ~ {surveyList.surEndDate}
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className={SurveyIngCSS.surDep}> {surveyList.dep.depName}</th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <img
                                                    className={SurveyIngCSS.surveyImg}
                                                    src={surveyList.surveyImageUrl}
                                                    alt="썸네일"
                                                />
                                            </th>
                                        </tr>
                                    </thead>

                                </table>
                            ))}
                    </div>
                </div>
                {/* 페이징버튼 */}
                <div style={{ listStyleType: "none", display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    {
                        Array.isArray(surveyList) &&
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={SurveyIngCSS.pagingBtn}
                        >
                            &lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li key={num} onClick={() => setCurrentPage(num)}>
                                <button
                                    style={currentPage === num ? { backgroundColor: 'lightgray' } : null}
                                    className={SurveyIngCSS.pagingBtn1}
                                >
                                    {num}
                                </button>
                            </li>
                        ))
                    }
                    {
                        Array.isArray(surveyList) &&
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                            className={SurveyIngCSS.pagingBtn}

                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default SurveyIng;