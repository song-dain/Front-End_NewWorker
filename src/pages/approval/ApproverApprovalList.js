import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callApproverApprovalListAPI } from '../../api/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import ApproverApprovalListCSS from './ApproverApprovalList.module.css';

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
        <div className={ ApproverApprovalListCSS.appList }>
            <h1> 수신함 </h1>
            <p>───────────────────────────────────────────────────────────────</p>
            <div className={ ApproverApprovalListCSS.approverApprovalListDiv }>
                <br/>
                <table className={ ApproverApprovalListCSS.ApprovalTable }>
                    <thead>
                        <tr className={ ApproverApprovalListCSS.ApprovalThead }>
                            <th>문서번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <br/>
                    <br/>
                    <tbody className= { ApproverApprovalListCSS.ApprovalTBody }>
                        {
                            Array.isArray(approvalList) && approvalList.map(
                                (approval) => ( 
                                    <tr className={ ApproverApprovalListCSS.ApprovalTr }
                                        key={ approval.appNo }
                                        onClick={() => onClickApproverApprovalDetail(approval.appNo)}
                                    >
                                        <td>{ approval.appDocNo }</td>
                                        <td>{ approval.appTitle }</td>
                                        <td>{ approval.appCreatedDate }</td>
                                        <td
                                            style={ approval.appStatus == '완료' ? { color : '#4885FF' } : { color : 'black' } }
                                        >{ approval.appStatus }</td>
                                    </tr>
                                    )
                                    
                            )
                        }
                    </tbody>
                </table>
                <div className={ ApproverApprovalListCSS.pageDiv }>
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
        </div>
        
    );


}

export default ApproverApprovalList;