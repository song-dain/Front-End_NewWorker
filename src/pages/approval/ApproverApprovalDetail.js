import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callApproverApprovalDetailAPI, callAcceptChangeAPI, callNotAcceptChangeAPI } from '../../api/ApprovalAPICalls';
import ApprovalDetailCSS from './ApprovalDetail.module.css';



function ApproverApprovalDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approval = useSelector(state => state.approvalReducer);
    const employee = useSelector(state => state.employeeReducer);

    const params = useParams();
    const appNo = params.appNo



    

    useEffect(() => {
        console.log('appNo : ', params.appNo);

        dispatch(callApproverApprovalDetailAPI({
            appNo : appNo
        }));
    }
    , []
    );

    // 승인 상태가 null 이며, 결재활성화여부가 'Y'인 배열의 appLineNo를 서버에 전송
    const index = approval.appLines?.findIndex(idx => idx.acceptActivate == 'Y' && idx.acceptStatus == null);

    const onClickAccChangeHandler = () => {

        dispatch(callAcceptChangeAPI({ 
            appLineNo : approval.appLines[index].appLineNo,
            approvalNo : approval.appLines[index].approvalNo
        }))


    }



    const onClickNotAccChangeHandler = () => {


        dispatch(callNotAcceptChangeAPI({
            appLineNo : approval.appLines[index].appLineNo,
            approvalNo : approval.appLines[index].approvalNo
        }))
    }
    


    return ( 

         approval.appLines &&           
        <div className={ ApprovalDetailCSS.detail }>
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
                        <td>결재상태</td>
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
                    <tr dangerouslySetInnerHTML={ {__html: approval.appContent} }>
                    </tr>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                    <br/>
                    <br/>
                    <tr>
                        결재자
                    </tr>
                    <br/>
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
                { ((approval.appStatus == "대기" || approval.appStatus == "진행중") && approval.appLines[index].employee.employeeNo == employee.employeeNo) && <button onClick={ onClickAccChangeHandler } className={ ApprovalDetailCSS.returnBtn }>승인</button>}
                { ((approval.appStatus == "대기" || approval.appStatus == "진행중") && approval.appLines[index].employee.employeeNo == employee.employeeNo) && <button onClick={ onClickNotAccChangeHandler } className={ ApprovalDetailCSS.deleteBtn }>반려</button>}
                <button onClick={ () => { navigate('/approval/approver') } } className={ ApprovalDetailCSS.cancleBtn }>돌아가기</button>
            </div>
                
        </div>
            
                );
}

export default ApproverApprovalDetail;