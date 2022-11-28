import NoticeUpdateCSS from './NoticeUpdate.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callNoticeDetailForAdminAPI, callNoticeDetailAPI, callNoticeUpdateAPI } from '../../api/NoticeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

function ProductUpdate() {

    const params = useParams();
    const noticeDetail = useSelector(state => state.noticeReducer);



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({
        notTitle: '',
        notContent: ''

    });

    /* 읽기모드와 수정모드를 구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링 시 공지 상세 정보 조회 */
    useEffect(() => {
        dispatch(callNoticeDetailAPI({
            notNo: params.notNo
        }));

    }, []);

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

    /* 수정 모드 변경 이벤트 */
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            notTitle: noticeDetail.notTitle,
            notContent: noticeDetail.notContent

        });


    }

    /* 공지 수정 저장 버튼 클릭 이벤트 */
    const onClickNoticeUpdateHandler = () => {

        const formData = new FormData();

        formData.append("notTitle", form.notTitle);     //공지제목
        formData.append("notContent", form.notContent); //공지내용

        if (image) {
            formData.append("noticetImage", image);
        }

        dispatch(callNoticeUpdateAPI({
            form: formData
        }));
        alert('공지가 수정되었습니다.');
        navigate(`/Notice`, { replace: true });
        // window.location.reload();
    }

    return (
        <div className={NoticeUpdateCSS.noticeRegistration}>
            <h1 className={NoticeUpdateCSS.text}>전사 공지</h1>
            {noticeDetail &&
                <div className={NoticeUpdateCSS.tableBox}>
                    <table className={NoticeUpdateCSS.registrationTable}>
                        <thead className={NoticeUpdateCSS.registrationThead}>
                            <tr>
                                <th><input
                                    name='notTitle'
                                    placeholder='제목을 입력하세요.'
                                    className={NoticeUpdateCSS.noticeTitle}
                                    onChange={onChangeHandler}
                                    value={(!modifyMode ? noticeDetail.notTitle : form.notTitle) || ''}
                                    readOnly={modifyMode ? false : true}
                                    style={!modifyMode ? { backgroundColor: 'gray' } : null}
                                /></th>
                            </tr>
                        </thead>
                        <tbody className={NoticeUpdateCSS.registrationTbody}>
                            <tr className={NoticeUpdateCSS.fileBox}>
                                <td>

                                    <button
                                        className={NoticeUpdateCSS.noticeImageButton}
                                        onClick={onClickImageUpload}
                                        style={!modifyMode ? { backgroundColor: 'gray' } : null}
                                        disabled={!modifyMode}
                                    >
                                        파일 첨부
                                    </button>
                                </td>
                            </tr>
                            <tr className={NoticeUpdateCSS.noticeImageDiv}>
                                <td className={NoticeUpdateCSS.noticeImageBox}>

                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        name='noticeImage'
                                        accept='image/jpg,image/png,image/jpeg,image/gif'
                                        onChange={onChangeImageUpload}
                                        ref={ imageInput }
                                    />
                                    { noticeDetail && <img
                                        className={NoticeUpdateCSS.noticeImage}
                                        src={ (imageUrl == null) ? noticeDetail.noticeImageUrl : imageUrl }
                                        alt="preview"
                                    />}
                                    
                                    <input

                                        name='notContent'
                                        placeholder='내용을 입력하세요.'
                                        className={NoticeUpdateCSS.noticeContent}
                                        onChange={onChangeHandler}
                                        style={!modifyMode ? { backgroundColor: 'gray' } : null}
                                        value={(!modifyMode ? noticeDetail.notContent : form.notContent) || ''}
                                        readOnly={modifyMode ? false : true}
                                    />

                                </td>

                            </tr>



                        </tbody>


                    </table>

                    <div className={NoticeUpdateCSS.noticeButtonDiv}>
                        <button
                            className={NoticeUpdateCSS.noticeButtonDiv1}
                            onClick={() => navigate(`/Notice`)}
                        >
                            목록으로
                        </button>
                        {!modifyMode &&
                            <button
                                onClick={onClickModifyModeHandler}
                            >
                                수정 모드
                            </button>
                        }
                        {modifyMode &&
                            <button
                                onClick={onClickNoticeUpdateHandler}
                            >
                                수정하기
                            </button>
                        }



                    </div>

                </div>
            }
        </div>
    );

}

export default ProductUpdate;