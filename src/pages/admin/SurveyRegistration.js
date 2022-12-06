import SurveyRegistrationCSS from './SurveyRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { callSurveyRegistAPI } from '../../api/SurveyAPICalls';


function SurveyRegistration() {



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({
        surTitle: '',
        surContent: '',
        surStartDate: 0,
        surEndDate: 0,
        ansContent1: '',
        ansContent2: '',
        ansContent3: '',
        depNo : 10,
    });



    

    useEffect(() => {
        // image 값이 바뀔 때마다 랜더링 -> 파일 첨부가 다시 일어날 때마다 preview 보여주기
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
        [image]);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        
        console.log("ansContent1" , form);
    }
    



    /* 이미지 첨부 버튼 클릭 이벤트 */
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    /* 파일 첨부 시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);

    }
    /* 공지 등록 버튼 클릭 이벤트 */
    const onClickSurveyRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("surTitle", form.surTitle);     //설문제목
        formData.append("surContent", form.surContent); //설문설명
        formData.append("surStartDate", form.surStartDate); //설문시작일
        formData.append("surEndDate", form.surEndDate); //설문종료일
        formData.append("questionItem[0].ansContent", form.ansContent1); //질문항목1
        formData.append("questionItem[1].ansContent", form.ansContent2); //질문항목2
        formData.append("questionItem[2].ansContent", form.ansContent3); //질문항목3
        formData.append("dep.depNo", form.depNo);   //부서

        if (image) {
            formData.append("surveyImage", image);
        }

        dispatch(callSurveyRegistAPI({
            form: formData
        }));
        alert('설문이 등록되었습니다.');
        navigate(`/Survey`, { replace: true });
        // window.location.reload();
        
        console.log("formData" , formData);
    }
    return (
        <div  className={SurveyRegistrationCSS.surveyRegistration}>
            <h1  className={SurveyRegistrationCSS.text}>설문조사</h1>

            <div  className={SurveyRegistrationCSS.tableBox}>
            <h1  className={SurveyRegistrationCSS.text1}>설문등록</h1>
                <table  className={SurveyRegistrationCSS.registrationTable}>
                    <thead className={SurveyRegistrationCSS.registrationThead}>
                        <tr>
                            <th className={SurveyRegistrationCSS.titleTr}>
                                설문 제목  <input
                                    name='surTitle'
                                    placeholder='제목을 입력하세요.'
                                    className={SurveyRegistrationCSS.surveyTitle}
                                    onChange={onChangeHandler}
                                /></th>
                        </tr>
                    </thead>
                    <tbody className={SurveyRegistrationCSS.registrationTbody}>

                        <tr>
                            <th className={SurveyRegistrationCSS.depTr}>질문 대상

                                <select name="depNo" onChange={ onChangeHandler }
                                   className={SurveyRegistrationCSS.surveyDep}

                                >
                                    <option value={10}>인사팀</option>
                                    <option value={20}>총무팀</option>
                                    <option value={30}>영업팀</option>
                                    <option value={40}>IT사업팀</option>
                                </select>
                            </th>
                            
                        </tr>
                        <tr >
                            <th className={SurveyRegistrationCSS.dateTh}>

                                설문기간 
                                <input
                                    type="date"
                                    name='surStartDate'
                                    className={SurveyRegistrationCSS.surveyStartDate}

                                    onChange={onChangeHandler}
                                />
                                &nbsp; ~
                                <input
                                    type="date"
                                    name='surEndDate'
                                    className={SurveyRegistrationCSS.surveyEndDate}

                                    onChange={onChangeHandler}
                                />

                            </th>

                        </tr>
                        <tr >
                            <th className={SurveyRegistrationCSS.titleTr}>

                                설문 설명 

                            </th>
                                <input
                                    name='surContent'
                                    placeholder='내용을 입력하세요.'
                                    className={SurveyRegistrationCSS.surveyContent}
                                    onChange={onChangeHandler}
                                />

                        </tr>
                        
                        <tr>
                            <th className={SurveyRegistrationCSS.fileTh}>
                                <span>첨부 파일

                                <button
                                    
                                    className={SurveyRegistrationCSS.fileBtn}
                                    onClick={onClickImageUpload}
                                >
                                    클릭하여 파일 첨부
                                </button>
                                </span>
                                
                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    name='surveyImage'
                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                    onChange={onChangeImageUpload}
                                    ref={imageInput}
                                />
                                {imageUrl && <img

                                    src={imageUrl}
                                    alt="preview"
                                />}
                            </th>
                        </tr>

                        <tr>
                            <th className={SurveyRegistrationCSS.titleTr}>
                                설문제목  <input
                                    name='surTitle'
                                    placeholder='제목을 입력하세요.'
                                    className={SurveyRegistrationCSS.surveyTitle}
                                    onChange={onChangeHandler}
                                /></th>
                        </tr>
                        <tr>
                            <th className={SurveyRegistrationCSS.ansTr}>
                                설문항목  <input
                                    name='ansContent1'
                                    type='text'
                                    className={SurveyRegistrationCSS.ansTitle}
                                    placeholder='항목을 입력하세요1.'
                                    onChange={onChangeHandler}
                                />
                                
                            </th>

                        </tr>
                        <tr>
                            <th className={SurveyRegistrationCSS.ansTr}>
                                <input
                                    name='ansContent2'
                                    type='text'
                                    className={SurveyRegistrationCSS.ansTitle1}
                                    placeholder='항목을 입력하세요2.'
                                    onChange={onChangeHandler}
                                />
                            </th>

                        </tr>
                        <tr>
                            <th className={SurveyRegistrationCSS.ansTr}>
                                <input
                                    name='ansContent3'
                                    type='text'
                                    className={SurveyRegistrationCSS.ansTitle2}
                                    placeholder='항목을 입력하세요3.'
                                    onChange={onChangeHandler}
                                />
                            </th>

                        </tr>




                    </tbody>


                </table>
                <div className={SurveyRegistrationCSS.surveyButtonDiv}>
                    <button
                        className={SurveyRegistrationCSS.surveyButtonDiv1}
                        onClick={() => navigate(`/Survey`)}
                    >
                        목록으로
                    </button>
                    <button
                        className={SurveyRegistrationCSS.surveyButtonDiv2}
                        onClick={onClickSurveyRegistrationHandler}
                    >
                        공지 등록
                    </button>
                </div>
            </div>


        </div>
    );

}



export default SurveyRegistration;
