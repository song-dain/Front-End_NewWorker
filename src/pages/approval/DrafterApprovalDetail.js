import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callDrafterApprovalDetailAPI, callAppStatusChangeAPI, callAppRemoveAPI } from '../../api/ApprovalAPICalls';
import ApprovalDetailCSS from './ApprovalDetail.module.css';



function DrafterApprovalDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const approval = useSelector(state => state.approvalReducer);

    const params = useParams();
    const appNo = params.appNo

    const [form, setForm] = useState({
        approvalNo : 0,
        appStatus : ""
    });

    useEffect(() => {
        console.log('appNo : ', params.appNo);

        dispatch(callDrafterApprovalDetailAPI({
            appNo : appNo
        }))
    }
    , []
    );


    const onClickAppStatusChangeHandler = () => {
        dispatch(callAppStatusChangeAPI({
            appNo : appNo,
            appLineNo : approval.appLines[0].appLineNo
        }))
    }

    const onClickAppRemoveHandler = () => {
        dispatch(callAppRemoveAPI({
            appNo : appNo
        }))
        navigate('/approval/draft');
    }

    
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
                            {appLine.employee.employeeName}  {appLine.acceptStatus}
                    </tr>
                    ))}
                    
                    
                </tbody>
            </table>
            <br/>
            <div>
                
                { approval.appStatus === "대기" &&<button onClick={ onClickAppStatusChangeHandler }  className={ ApprovalDetailCSS.returnBtn }>회수</button>}
                { (approval.appStatus === "회수" || approval.appStatus === "반려") && <button onClick={ onClickAppRemoveHandler } className={ ApprovalDetailCSS.deleteBtn }>삭제</button>}
                <button onClick={ () => { navigate('/approval/draft') } } className={ ApprovalDetailCSS.cancleBtn }>돌아가기</button>
            </div>
                
        </div>
            
                );
}

export default DrafterApprovalDetail;