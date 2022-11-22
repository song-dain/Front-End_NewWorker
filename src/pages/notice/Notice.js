import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import NoticeCSS from './Notice.module.css';
// import { callNoticeAPI } from '../../api/NoticeAPICalls';

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

    // useEffect(
    //     () => {
    //         dispatch(callNoticeAPI({
    //             productCode : params.productCode,
    //             currentPage : currentPage
    //         }));
    //     } 
    //     ,[currentPage]
    // )

    const onClickTableTr = (notNo) => {
        navigate(`/noticeDetail/${notNo}`, { replace : true });
    }

    return (
        <>
            <div className={ NoticeCSS.reviewTableDiv }>
                <table className={ NoticeCSS.reviewTableCss }>
                    <colgroup>
                        <col width="10%" />
                        <col width="40%" />
                        <col width="20%" />
                        <col width="20%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {
                            Array.isArray(noticeList) && noticeList.map(
                                (notice) => (
                                    <tr
                                        key={ notice.notNo }
                                        onClick={ () => onClickTableTr(notice.notNo) }
                                    >
                                        <td>{ notice.notNo }</td>
                                        <td>{ notice.notTitle }</td>
                                        <td>{ notice.notDate }</td>
                                        <td>{ notice.employee.employeeName }</td>
                                        <td>{ notice.notCount }</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>                     */}
                </table>            
            </div>
            {/* <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            {
                Array.isArray(noticeList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage - 1) }
                    disabled={ currentPage === 1 }
                    className={ NoticeCSS.pagingBtn }
                >
                    &lt;
                </button>
            }    
            {
                pageNumber.map((num) => (
                    <li key={num} onClick={ () => setCurrentPage(num) }>
                        <button
                            style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                            className={ NoticeCSS.pagingBtn }
                        >
                            {num}
                        </button>
                    </li>
                ))
            }
            {
                Array.isArray(noticeList) &&
                <button
                    onClick={ () => setCurrentPage(currentPage + 1) }
                    disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                    className={ NoticeCSS.pagingBtn }
                >
                    &gt;
                </button>
            } 
            </div> */}
        </>
    );
}

export default Notice;
