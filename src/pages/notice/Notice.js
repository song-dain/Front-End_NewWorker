import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NoticeCSS from "./Notice.module.css";
import { callNoticeAPI } from '../../api/NoticeAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';


import React from "react";

function Notice() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const notices = useSelector(state => state.noticeReducer);
    const noticeList = notices.data;
    const pageInfo = notices.pageInfo;

    /* 페이징 버튼 */
    const pageNumber = [];
    if (pageInfo) {
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callNoticeAPI({
                notNo: params.notNo,
                currentPage: currentPage
            }));
        }
        , [currentPage]
    )

    const onClickNoticeInsert = () => {
        console.log('[notice] onClickNoticeInsert');
        navigate("/notice-registration", { replace: false })
    }

    const onClickTableTr = (notNo) => {
        navigate(`/noticeDetail/${notNo}`, { replace: true });
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    return (

        
        <div className={NoticeCSS.notice}>
            <h1 className={NoticeCSS.text}>전사 공지</h1>

            <div className={NoticeCSS.tableBox}>
                <div className={NoticeCSS.buttonDiv}>
                    {decoded === "ROLE_ADMIN" && <button
                        onClick={onClickNoticeInsert}
                    >
                        공지 등록
                    </button>}
                </div>
                <table className={NoticeCSS.notice1}>
                    <colgroup>
                        <col width="10%" />
                        <col width="50%" />
                        <col width="10%" />
                        <col width="20%" />
                        
                    </colgroup>
                    <thead>
                        <tr className={NoticeCSS.notice_tr}>
                            <th className={NoticeCSS.notice_td2}>번호</th>
                            <th className={NoticeCSS.notice_td2}>제목</th>
                            <th className={NoticeCSS.notice_td3}>작성자</th>
                            <th className={NoticeCSS.notice_td4}>작성일</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Array.isArray(noticeList) && noticeList.map(
                                (noticeList) => (
                                    <tr className={NoticeCSS.notice_tr}
                                        key={noticeList.notNo}
                                        onClick={() => onClickTableTr(noticeList.notNo)}
                                    >
                                        <th>{noticeList.notNo}</th>
                                        <th>{noticeList.notTitle}</th>
                                        <th>{noticeList.employee.employeeName}</th>
                                        <th>{noticeList.notDate}</th>
                                        
                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

            {/* 페이징버튼 */}
            <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                {
                    Array.isArray(noticeList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={NoticeCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? { backgroundColor: 'lightgray' } : null}
                                className={NoticeCSS.pagingBtn1}
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(noticeList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                        className={NoticeCSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }
            </div>
        </div>
    );
}

export default Notice;