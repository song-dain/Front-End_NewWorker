import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callApproverApprovalDetailAPI } from '../../api/ApprovalAPICalls';




function ApproverApprovalDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approval = useSelector(state => state.approvalReducer);

    const params = useParams();
    const appNo = params.appNo

    const [form, setForm] = useState({
        appNo : 0,
        appStatus : '',
        acceptStatus : ''
    });

    useEffect(() => {
        console.log('appNo : ', params.appNo);

        dispatch(callApproverApprovalDetailAPI({
            appNo : appNo
        }))
    }
    , []
    );

    
    return ( 

         approval.appLines &&
            
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><h1>{ approval.appTitle }</h1></td>
                    </tr>
                    <tr>
                        <td>{ approval.employee && approval.employee.dep.depName } { approval.employee && approval.employee.employeeName } { approval.employee && approval.employee.position.positionName }</td>
                    </tr>
                    <tr>
                        <td>───────────────</td><td>───────────────</td><td>───────────────</td><td>───────────────</td>
                    </tr>
                    <br/>
                    <tr>
                        <td>문서번호</td>
                        <td>결제상태</td>
                        <td>작성일</td>
                        <td>종료일</td>
                    </tr>
                    <tr>
                        <td>{ approval.appDocNo }</td>
                        <td>{ approval.appStatus }</td>
                        <td>{ approval.appCreatedDate }</td>
                        <td>{ approval.appEndDate }</td>
                    </tr>
                    <br/>
                    <tr>
                        <td><th>내용</th></td>
                    </tr>
                    <br/>
                    <tr>
                        { approval.appContent }
                    </tr>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <tr>
                        첨부 파일
                    </tr>
                    <br/>
                    <br/>
                    <tr>
                        결재자
                    </tr>
                    {
                 approval.appLines.map((appLine) => (
                    <tr>
                            {appLine.employee.employeeName} {appLine.acceptStatus}
                    </tr>
                    ))}
                    
                    
                </tbody>
            </table>
            <br/>
            <div>
                { approval.appStatus === "대기" &&<button name="acceptStatus" value="승인">승인</button>}
                { approval.appStatus === "대기" &&<button name="acceptStatus" value="반려">반려</button>}
                <button onClick={ () => { navigate('/approval/approver') } }>돌아가기</button>
            </div>
                
        </div>
            
                );
}

export default ApproverApprovalDetail;