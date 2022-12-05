import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApproverChoiceModalCSS from './ApproverChoiceModal.module.css';
import { callEmpListAPI } from '../../api/ApprovalAPICalls';


function ApproverChoiceModal({approverListModal, appLines, setAppLines, setApproverListModal}) {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.approvalReducer);
    const [ isChange, setIsChange ] = useState(10);
    const [ lineNum, setLineNum ] = useState(1);


    useEffect(
        () => {
            dispatch(callEmpListAPI({
                depNo : isChange
            }));
        }
        , [isChange]
    )

    /* 부서별 직원 조회 */
    const selectDept = (dep) => {
        dispatch(callEmpListAPI({
            depNo : dep
        }));
    
        setIsChange(dep);
    }


    const selectEmp = (emp) => {
         setAppLines(
             [...appLines, {
                employeeNo : emp.employeeNo,
                employeeName : emp.employeeName,
                appLineTurn : lineNum
             }]
         )
         setLineNum(
            lineNum + 1
         )
         //LineNo 값을 한번쓰면 1씩 증가(AppLineNo 세팅하는 용)

    }
    console.log("appLines : ", appLines);


    console.log(approverListModal);
    console.log("setAppModal :", setApproverListModal);

    return(
        <div className={ ApproverChoiceModalCSS.modal}>
            <div className={ ApproverChoiceModalCSS.modalContainer }>
                <div className={ ApproverChoiceModalCSS.choiceTitle }>결재자 선택</div>
                    <span className={ ApproverChoiceModalCSS.choiceDep }>부서</span>
                    <button onClick={ () => selectDept(10) } className={ ApproverChoiceModalCSS.depBtn }>인사팀</button>
                    <br/>
                    <button onClick={ () => selectDept(20) } className={ ApproverChoiceModalCSS.depBtn }>총무팀</button>
                    <br/>
                    <button onClick={ () => selectDept(30) } className={ ApproverChoiceModalCSS.depBtn }>영업팀</button>
                    <br/>
                    <button onClick={ () => selectDept(40) } className={ ApproverChoiceModalCSS.depBtn }>IT사업팀</button>
                    <br/>
                    <div className={ ApproverChoiceModalCSS.empName }>
                    <span className={ ApproverChoiceModalCSS.choiceEmp }>이름 / 직급</span>
                    {
                        Array.isArray(employee) && employee.map((
                            emp =>
                                <div key={emp.employeeNo}>
                                    <td>
                                        <input type="checkbox" name={emp.employeeName} onClick={ () => selectEmp(emp)} />
                                    </td>
                                    <td>{emp.employeeName} {emp.position.positionName}</td>
                                </div>
                        ))
                    }
                    </div>
                    <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                        </tr>
                    </thead>
            <tbody>
                결재자 확인
            {
                appLines.map((appLines) =>
                    <li>
                        {appLines.employeeName}
                    </li>
                )
            }
            </tbody>
            </table>
            <button onClick={() => setApproverListModal(false) }>확인</button>
            </div>
        </div>

    );




}

export default ApproverChoiceModal;