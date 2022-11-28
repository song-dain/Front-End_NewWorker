import NoticeDetailCSS from './NoticeDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import {
    callNoticeDetailAPI,
    callNoticeUpdateAPI
} from '../../api/NoticeAPICalls';

function NoticeDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const notices = useSelector(state => state.noticeReducer);
    const noticeDetail = notices.data


    // const [modifyMode, setModifyMode] = useState(false);
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

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickUpdate = (notNo) => {
        navigate(`/notice-update/${notNo}`, { replace: false });
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
                                    // readOnly={modifyMode ? false : true}
                                    style={{ backgroundColor: 'white' }}
                                    onChange={onChangeHandler}
                                    value={noticeDetail.notTitle || ''}
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
                                    <img src={notices.noticeImageUrl} alt="테스트" />
                                    <textarea
                                        className={NoticeDetailCSS.noticeContent}
                                        name='notContent'
                                        // readOnly={modifyMode ? false : true}
                                        style={{ backgroundColor: 'white' }}
                                        onChange={onChangeHandler}
                                        value={noticeDetail.notContent || ''}
                                        disabled
                                    >
                                    </textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }

            <div className={NoticeDetailCSS.backBtnBox}>
                <button
                    className={NoticeDetailCSS.backBtn}
                    onClick={() => navigate(`/Notice`)}
                >
                    목록으로
                </button>
                
                
                <button
                    className={NoticeDetailCSS.backBtn}
                    onClick={() => navigate(`/notice-update/${noticeDetail.notNo}`, { replace: false })}
                >
                    수정하기
                </button>
                




            </div>

        </div>
    );
}

export default NoticeDetail;
