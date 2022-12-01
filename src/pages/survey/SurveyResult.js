import SurveyCSS from "./Survey.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callSurveyAPI } from '../../api/SurveyAPICalls';



import React from "react";

function SurveyResult() {

    



    const surveys = useSelector(state => state.surveyReducer);
    const surveyList = surveys.data;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);



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


        <div className={SurveyCSS.survey}>
            <h1 className={SurveyCSS.text}>설문조사</h1>
            <div className={SurveyCSS.roll}>
                <div className={SurveyCSS.rolling}>
                


                </div>




            </div>
        </div>
    );
}

export default SurveyResult;