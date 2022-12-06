import NoticeRegistrationCSS from './NoticeRegistration.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { callNoticeRegistAPI } from '../../api/NoticeAPICalls';


function NoticeRegistration() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({
        notTitle: '',
        notContent: ''
        
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
    const onClickNoticeRegistrationHandler = () => {

        const formData = new FormData();

        formData.append("notTitle", form.notTitle);     //공지제목
        formData.append("notContent", form.notContent); //공지내용
        


        if (image) {
            formData.append("noticeImage", image);
        }

        dispatch(callNoticeRegistAPI({
            form: formData
        }));
        alert('공지가 등록되었습니다.');
        navigate(`/Notice`, { replace: true });
        // window.location.reload();
    }

    return (
        <div className={NoticeRegistrationCSS.noticeRegistration}>
            <h1 className={NoticeRegistrationCSS.text}>전사 공지</h1>
            <div className={NoticeRegistrationCSS.tableBox}>
                <table className={NoticeRegistrationCSS.registrationTable}>
                    <thead className={NoticeRegistrationCSS.registrationThead}>
                        <tr>
                            <th><input
                                name='notTitle'
                                placeholder='제목을 입력하세요.'
                                className={NoticeRegistrationCSS.noticeTitle}
                                onChange={onChangeHandler}
                            /></th>
                        </tr>
                    </thead>
                    <tbody className={NoticeRegistrationCSS.registrationTbody}>
                        <tr className={NoticeRegistrationCSS.fileBox}>
                            <td>

                                <button
                                    className={NoticeRegistrationCSS.noticeImageButton}
                                    onClick={onClickImageUpload}
                                >
                                    파일 첨부
                                </button>
                            </td>
                        </tr>
                        <tr className={NoticeRegistrationCSS.noticeImageDiv}>
                            <td className={NoticeRegistrationCSS.noticeImageBox}>

                                <input
                                    style={{ display: 'none' }}
                                    type="file"
                                    name='noticeImage'
                                    accept='image/jpg,image/png,image/jpeg,image/gif'
                                    onChange={onChangeImageUpload}
                                    ref={imageInput}
                                />
                                {imageUrl && <img
                                    className={NoticeRegistrationCSS.noticeImage}
                                    src={imageUrl}
                                    alt="preview"
                                />}
                                <input
                                    name='notContent'
                                    placeholder='내용을 입력하세요.'
                                    className={NoticeRegistrationCSS.noticeContent}
                                    onChange={onChangeHandler}
                                />
                                
                            </td>

                        </tr>


                        {/* <tr className={NoticeRegistrationCSS.noticeStatusBox}>
                            <td><label>게시물 활성화 여부</label></td>
                            <td className={NoticeRegistrationCSS.noticeStatus}>
                                <label className={NoticeRegistrationCSS.noticeLabel1}>활성화<input type="radio" name="notStatus" onChange={onChangeHandler} value="Y" /> </label>
                                <label className={NoticeRegistrationCSS.noticeLabel2}>비활성화<input type="radio" name="notStatus" onChange={onChangeHandler} value="N" /></label>
                            </td>

                        </tr> */}

                    </tbody>


                </table>
                <div className={NoticeRegistrationCSS.noticeButtonDiv}>
                    <button
                        className={NoticeRegistrationCSS.noticeButtonDiv1}
                        onClick={() => navigate(`/Notice`)}
                    >
                        목록으로
                    </button>
                    <button
                        className={NoticeRegistrationCSS.noticeButtonDiv2}
                        onClick={onClickNoticeRegistrationHandler}
                    >
                        공지 등록
                    </button>
                </div>
            </div>

        </div>
    );

}

export default NoticeRegistration;
