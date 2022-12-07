import SurveyDetailCSS from './SurveyDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import { callSurveyDetailAPI, callSurveySubmitAPI, callSurveyDeleteAPI } from '../../api/SurveyAPICalls';


function SurveyDetail() {



    const navigate = useNavigate();
    const dispatch = useDispatch();
    const surveys = useSelector(state => state.surveyReducer);
    const params = useParams();
    const surveyDetail = surveys.data;
    // const [form, setForm] = useState({
    //     surTitle: '',
    //     surContent: '',
    //     surDate: 0,
    //     surStartDate: 0,
    //     surEndDate: 0,
    //     ansContent1: '',
    //     ansContent2: '',
    //     ansContent3: '',
    //     depNo: 10,

    // });
    const [form, setForm] = useState({});

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if (isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

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

    console.log("surveyDetail", surveyDetail);

    const onClickSurveySubmitHandler = () => {

        const formData = new FormData();

        formData.append("ansNo", form.ansNo);     //설문항목





        dispatch(callSurveySubmitAPI({
            form: formData
        }));
        alert('설문이 제출되었습니다.');
        navigate(`/Survey`, { replace: true });
        // window.location.reload();

        console.log("formData", formData);
    }

    //삭제하기
    const onClickSurveyDeleteHandler = () => {

        dispatch(callSurveyDeleteAPI({
            surNo: params.surNo
        }));

        alert("설문이 삭제되었습니다.")

        navigate(`/Survey`, { replace: true });
        window.location.reload();
    }

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
                                        name='employeeName'
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
                                        name='surDate'
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
                                <th>

                                    {/* <input
                                        className={SurveyDetailCSS.surNo}
                                        name='surNo'
                                        placeholder='설문번호'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={surveyDetail.surNo || ''}
                                        disabled
                                    />. */}
                                    1.
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
                                </th>
                            </tr>
                        </tbody>
                        {surveyDetail &&
                            <tfoot className={SurveyDetailCSS.surTfoot}>
                                <tr>
                                    <td>
                                        <input id="test1" type="radio"
                                            name='ansNo'
                                            onChange={onChangeHandler} />
                                        <label htmlFor="test1">

                                            {Array.isArray(surveyDetail.questionItem) && surveyDetail.questionItem[0].ansContent || ''}
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="test2" type="radio"
                                            name='ansNo'
                                            onChange={onChangeHandler} />
                                        <label htmlFor="test2">
                                            {/* onChange={onChangeHandler}
                                    value= */}
                                            {Array.isArray(surveyDetail.questionItem) && surveyDetail.questionItem[1].ansContent || ''}
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input id="test3" type="radio"
                                            name='ansNo'
                                            onChange={onChangeHandler} />
                                        <label htmlFor="test3">

                                            {/* onChange={onChangeHandler}
                                    value= */}
                                            {Array.isArray(surveyDetail.questionItem) && surveyDetail.questionItem[2].ansContent || ''}
                                        </label>
                                    </td>
                                </tr>
                            </tfoot>
                        }
                    </table>
                </div>
            }

            <div className={SurveyDetailCSS.backBtnBox}>
                <button
                    className={SurveyDetailCSS.backBtn}
                    onClick={onClickSurveySubmitHandler}
                >
                    제출하기
                </button>
                <button
                    className={SurveyDetailCSS.backBtn}
                    onClick={() => navigate(`/Survey`)}
                >
                    목록으로
                </button>

                {decoded === "ROLE_ADMIN" && <button
                    className={SurveyDetailCSS.backBtn1}
                    onClick={onClickSurveyDeleteHandler}
                >
                    삭제하기
                </button>}





            </div>




        </div>
    );
}

export default SurveyDetail;
