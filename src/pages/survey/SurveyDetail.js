import SurveyDetailCSS from './SurveyDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { callSurveyDetailAPI } from '../../api/SurveyAPICalls';


function SurveyDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const surveys = useSelector(state => state.surveyReducer);
    const params = useParams();
    const surveyDetail = surveys.data;
    const [form, setForm] = useState({});

    useEffect(
        () => {
            console.log('[SurveyDetail] surNo : ', params.surNo);

            dispatch(callSurveyDetailAPI({
                surNo: params.surNo
            }));
        }
        , []
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };



    return (
        <div className={SurveyDetailCSS.surveyDetail}>
            <h1 className={SurveyDetailCSS.text}>설문조사</h1>
            {surveyDetail &&
                <div className={SurveyDetailCSS.surveyMain}>
                    <table className={SurveyDetailCSS.surTable}>
                        <thead className={SurveyDetailCSS.surThead}>
                            <tr>
                                <td>
                                    제목 :
                                    <input
                                        className={SurveyDetailCSS.surTitle}
                                        name='surTitle'
                                        placeholder='제목'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={surveyDetail.surTitle || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    작성자 :
                                    <input
                                        className={SurveyDetailCSS.surName}
                                        placeholder='작성자'
                                        readOnly={true}
                                        style={{ backgroundColor: 'white' }}
                                        value={surveyDetail && surveyDetail.employee?.employeeName || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    작성일 :
                                    <input
                                        className={SurveyDetailCSS.surDate}
                                        placeholder='작성일'
                                        readOnly={true}
                                        style={{ backgroundColor: 'white' }}
                                        value={surveyDetail && surveyDetail.surDate || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    설문기간 :
                                    <input
                                        className={SurveyDetailCSS.surStartDate}
                                        placeholder='설문기간'
                                        readOnly={true}
                                        style={{ backgroundColor: 'white' }}
                                        value={surveyDetail && surveyDetail.surStartDate || ''}
                                        disabled
                                    />
                                    ~
                                    <input
                                        className={SurveyDetailCSS.surEndDate}
                                        placeholder='설문기간'
                                        readOnly={true}
                                        style={{ backgroundColor: 'white' }}
                                        value={surveyDetail && surveyDetail.surEndDate || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                        </thead>
                        <tbody className={SurveyDetailCSS.surTbody}>
                            <tr>
                                <td>

                                    <input
                                        className={SurveyDetailCSS.surNo}
                                        name='surNo'
                                        placeholder='설문번호'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={surveyDetail.surNo || ''}
                                        disabled
                                    />.
                                    <input
                                        className={SurveyDetailCSS.surTitle}
                                        name='surTitle'
                                        placeholder='설문제목'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={surveyDetail.surTitle || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot className={SurveyDetailCSS.surTfoot}>
                        <tr>
                                <td>

                                    <input
                                        className={SurveyDetailCSS.surNo}
                                        name='surNo'
                                        placeholder='설문번호'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={surveyDetail.surNo || ''}
                                        disabled
                                    />.
                                    <input
                                        className={SurveyDetailCSS.surTitle}
                                        name='surTitle'
                                        placeholder='설문제목'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={surveyDetail.surTitle || ''}
                                        disabled
                                    />
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }

            <div className={SurveyDetailCSS.backBtnBox}>
                <button
                    className={SurveyDetailCSS.backBtn}
                    onClick={() => navigate(`/Survey-regi`)}
                >
                    제출하기
                </button>
                <button
                    className={SurveyDetailCSS.backBtn}
                    onClick={() => navigate(`/Survey`)}
                >
                    목록으로
                </button>


                <button
                    className={SurveyDetailCSS.backBtn1}
                    onClick={() => navigate(`/survey-update/${surveyDetail.surNo}`, { replace: false })}
                >
                    수정하기
                </button>





            </div>




        </div>
    );
}

export default SurveyDetail;
