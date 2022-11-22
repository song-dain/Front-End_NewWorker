import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TestCSS from "./Test.module.css";
import { Outlet } from "react-router-dom";

import React from "react";

function Test() {
    // 테스트용
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

    const onClickTableTr = (notNo) => {
        navigate(`/noticeDetail/${notNo}`, { replace : true });
    }

    return (

        // <div className={ TestCSS.test}>
        //     Test

        // <main>
        //     <Outlet />
        // </main>
        // </div>
        <div className={TestCSS.test}>
            <h1 className={TestCSS.text}>전사 공지</h1>
            <div className={TestCSS.tableBox}>

                <table className={TestCSS.test1}>
                    <colgroup>
                        <col width="10%" />
                        <col width="50%" />
                        <col width="10%" />
                        <col width="20%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr className={TestCSS.notice_tr}>
                            <th className={TestCSS.notice_td2}>번호</th>
                            <th className={TestCSS.notice_td2}>제목</th>
                            <th className={TestCSS.notice_td3}>작성자</th>
                            <th className={TestCSS.notice_td4}>작성일</th>
                            <th className={TestCSS.notice_td5}>조회수</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Array.isArray(noticeList) && noticeList.map(
                                (notice) => (
                                    <tr className={TestCSS.notice_tr}
                                        key={notice.notNo}
                                        onClick={() => onClickTableTr(notice.notNo)}
                                    >
                                        <th>{notice.notNo}</th>
                                        <th>{notice.notTitle}</th>
                                        <th>{notice.notNo}</th>
                                        <th>{notice.notDate}</th>
                                        <th>{notice.notCount}</th>
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
                        className={TestCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? { backgroundColor: 'orange' } : null}
                                className={TestCSS.pagingBtn}
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
                        className={TestCSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }
            </div>
        </div>
    );
}

export default Test;