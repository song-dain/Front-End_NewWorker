import NoticeRegistrationCSS from './NoticeRegistration.module.css';
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
        surStartDate: '',
        surEndDate: '',
        ansContent: '',
        questionItem1: '',
        questionItem2: '',
        questionItem3: '',
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
        formData.append("ansContent[0].questionItem", form.questionItem1); //질문항목1
        formData.append("ansContent[1].questionItem", form.questionItem2); //질문항목2
        formData.append("ansContent[2].questionItem", form.questionItem3); //질문항목3
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
        <div >
            <h1>설문조사</h1>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                설문제목 : <input
                                    name='surTitle'
                                    placeholder='제목을 입력하세요.'

                                    onChange={onChangeHandler}
                                /></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr >
                            <td>

                                설문설명 :
                                <input
                                    name='surContent'
                                    placeholder='내용을 입력하세요.'

                                    onChange={onChangeHandler}
                                />

                            </td>

                        </tr>
                        <tr>
                            <td><label>부서</label></td>
                            <td>
                                <select name="depNo" onChange={ onChangeHandler }>
                                    <option value={10}>인사팀</option>
                                    <option value={20}>총무팀</option>
                                    <option value={30}>영업팀</option>
                                    <option value={40}>IT사업팀</option>
                                </select>
                            </td>
                        </tr>
                        <tr >
                            <td>

                                설문기간 :
                                <input
                                    type="date"
                                    name='surStartDate'


                                    onChange={onChangeHandler}
                                />
                                ~
                                <input
                                    type="date"
                                    name='surEndDate'


                                    onChange={onChangeHandler}
                                />

                            </td>

                        </tr>
                        
                        <tr>
                            <td>

                                <button

                                    onClick={onClickImageUpload}
                                >
                                    파일 첨부
                                </button>
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
                            </td>
                        </tr>

                        <tr>
                            <th>
                                설문제목 : <input
                                    name='surTitle'
                                    placeholder='제목을 입력하세요.'

                                    onChange={onChangeHandler}
                                /></th>
                        </tr>
                        <tr>
                            <th>
                                설문항목 : <input
                                    name='questionItem1'
                                    type='text'
                                    placeholder='항목을 입력하세요1.'
                                    onChange={onChangeHandler}
                                />
                            </th>

                        </tr>
                        <tr>
                            <th>
                                <input
                                    name='questionItem2'
                                    type='text'
                                    placeholder='항목을 입력하세요2.'
                                    onChange={onChangeHandler}
                                />
                            </th>

                        </tr>
                        <tr>
                            <th>
                                <input
                                    name='questionItem3'
                                    type='text'
                                    placeholder='항목을 입력하세요3.'
                                    onChange={onChangeHandler}
                                />
                            </th>

                        </tr>




                    </tbody>


                </table>
                <div>
                    <button

                        onClick={() => navigate(`/Survey`)}
                    >
                        목록으로
                    </button>
                    <button

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
