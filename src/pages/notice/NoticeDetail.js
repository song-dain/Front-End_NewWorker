import NoticeDetailCSS from './NoticeDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    callNoticeDetailAPI,
    callNoticeUpdateAPI,
    callNoticeDeleteAPI
} from '../../api/NoticeAPICalls';

function NoticeDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const notices = useSelector(state => state.noticeReducer);
    const noticeDetail = notices.data
    


    const [updateMode, setUpdateMode] = useState(false);
    const [form, setForm] = useState({});


    useEffect(
        () => {
            console.log('[NoticeDetail] notNo : ', params.notNo);

            dispatch(callNoticeDetailAPI({
                notNo: params.notNo
            }));
        }
        , []
    );

    console.log(noticeDetail);
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    

    /* 수정 모드 변경 이벤트 */
    const onClickUpdateModeHandler = () => {
        setUpdateMode(true);
        setForm({
            
            notTitle: noticeDetail.notTitle,
            notContent : noticeDetail.notContent

        });
    }

    /* 공지사항 수정 버튼 클릭 이벤트 */
    const onClickNoticeUpdateHandler = () => {
        console.log('[noticeDetail] onClickNoticeUpdateHandler Start!!');

        const formData = new FormData();

        
        formData.append("notTitle", form.notTitle);
        formData.append("notContent", form.notContent);

        dispatch(callNoticeUpdateAPI({
            form: form
        }));

        alert("글이 수정되었습니다.")

        navigate(`/Notice`, { replace: true });
        // window.location.reload();

        console.log('[noticeDetail] onClickNoticeUpdateHandler End!!');
    }

    //삭제하기
    const onClickNoticeDeleteHandler = () => {
        dispatch(callNoticeDeleteAPI({
            notNo: params.notNo
        }));

        alert("글이 삭제되었습니다.")

        navigate(`/Notice`, { replace: true });
        window.location.reload();
    }



    return (
        <div className={NoticeDetailCSS.noticeDetail}>
            <h1 className={NoticeDetailCSS.text}>전사 공지</h1>
            {noticeDetail &&
                <div className={NoticeDetailCSS.tableBox}>
                    <table className={NoticeDetailCSS.detailTable}>
                        <thead className={NoticeDetailCSS.detailThead}>
                            <tr>
                                <th><input
                                    className={NoticeDetailCSS.noticeTitle}
                                    name='notTitle'
                                    placeholder='제목'
                                    readOnly={updateMode ? false : true}
                                    style={{ backgroundColor: 'white' }}
                                    onChange={onChangeHandler}
                                    value={(!updateMode ? noticeDetail.notTitle : form.notTitle) || ''}
                                    disabled
                                /></th>
                                <th><input
                                    className={NoticeDetailCSS.noticeEmpNo}
                                    placeholder='작성자'
                                    readOnly={true}
                                    style={{ backgroundColor: 'white' }}
                                    value={noticeDetail && noticeDetail.employee?.employeeName || ''}
                                    disabled
                                /></th>
                                <th><input
                                    className={NoticeDetailCSS.noticeDate}
                                    placeholder='작성일'
                                    readOnly={true}
                                    style={{ backgroundColor: 'white' }}
                                    value={noticeDetail && noticeDetail.notDate || ''}
                                    disabled
                                /></th>

                            </tr>
                        </thead>
                        <tbody>
                            
                                    <tr>
                                        <td>
                                            <img src={noticeDetail.noticeImageUrl} alt="테스트" />
                                            <textarea
                                                className={NoticeDetailCSS.noticeContent}
                                                name='notContent'
                                                readOnly={updateMode ? false : true}
                                                style={{ backgroundColor: 'white' }}
                                                onChange={onChangeHandler}
                                                value={(!updateMode ? noticeDetail.notContent : form.notContent) || ''}
                                                
                                            >
                                            </textarea>
                                        </td>
                                    </tr>
                            
                        </tbody>
                    </table>
                </div>
            }

            {noticeDetail &&
                <div className={NoticeDetailCSS.backBtnBox}>
                    <button
                        className={NoticeDetailCSS.backBtn}
                        onClick={() => navigate(`/Notice`)}
                    >
                        목록으로
                    </button>

                    {!updateMode &&
                        <button
                            className={NoticeDetailCSS.backBtn}
                            onClick={onClickUpdateModeHandler}
                        >
                            수정모드
                        </button>
                    }
                    {updateMode &&
                        <button
                            className={NoticeDetailCSS.backBtn}
                            onClick={onClickNoticeUpdateHandler}
                        >
                            수정 저장하기
                        </button>
                    }
                    {!updateMode &&
                        <button
                            className={NoticeDetailCSS.backBtn}
                            onClick={onClickNoticeDeleteHandler}
                        >
                            삭제
                        </button>
                    }




                </div>
            }
        </div>

    );
}

export default NoticeDetail;
