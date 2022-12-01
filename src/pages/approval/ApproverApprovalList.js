import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callApproverApprovalListAPI } from '../../api/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

function ApproverApprovalList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approval = useSelector(state => state.approvalReducer);
    const approvalList = approval.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callApproverApprovalListAPI({
                currentPage: currentPage
            }));
        }
        , [currentPage]
    );

    const pageInfo = approval.pageInfo;
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    const onClickApproverApprovalDetail = (appNo) => {
        navigate(`/approval/approverDetail/${appNo}`, { replace: true });
    }


    return (
        <div>
            <h1> 수신함 </h1>
            <p>───────────────────────────────────────────────────────────────</p>
            <br/>
            <table>
                <thead>
                    <tr>
                        <td>문서번호</td>
                        <td>제목</td>
                        <td>작성일</td>
                        <td>상태</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(approvalList) && approvalList.map(
                            (approval) => ( 
                                <tr
                                    key={ approval.appNo }
                                    onClick={() => onClickApproverApprovalDetail(approval.appNo)}
                                >
                                    <td>{ approval.appDocNo }</td>
                                    <td>{ approval.appTitle }</td>
                                    <td>{ approval.appCreatedDate }</td>
                                    <td>{ approval.appStatus }</td>
                                </tr>
                                )
                        )
                    }
                </tbody>
            </table>
            <div>
                {
                    Array.isArray(approvalList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? { backgroundColor: 'lightgray' } : null}

                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(approvalList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                    >
                        &gt;
                    </button>
                }
            </div>
        </div>
        
    );


}

export default ApproverApprovalList;