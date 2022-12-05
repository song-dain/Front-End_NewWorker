import { useDispatch, useSelector } from "react-redux";
import { callEmpListAPI } from "../../api/MessageAPICalls";
import { useEffect, useState } from "react";
import EmpListMoadlCSS from "./EmpListModal.module.css";

function EmpListModal({message, recipientName, setMessage, recipient, setEmpListModal}){

    const dispatch = useDispatch();
    const employee = useSelector(state => state.messageReducer);
    const [ isChange, setIsChange ] = useState(10);

    useEffect(
        () => {
        }
        , [isChange]
    )

    /* 부서별 직원 조회 */
    const selectDept = (dept) => {

        dispatch(callEmpListAPI({
            depNo : dept
        }));

        setIsChange(dept);
    }

    /* 수신 사원 선택 */
    const selectEmp = (emp) => {
        recipient(emp.employeeName);
        setMessage({
            ...message,
            recipient : {
                employeeNo : emp.employeeNo
            }
        })
    }

    /* 선택 취소 */
    const cancelBtnHandler = () => {
        recipient("");
        setEmpListModal(false);
    }

    return(
        <div className={EmpListMoadlCSS.mrmodal}>
            <div className={EmpListMoadlCSS.mrmcontainer}>
                <div className={EmpListMoadlCSS.mrmtitle}>수신사원검색</div>
                <div className={EmpListMoadlCSS.empName}>
                    <span className={EmpListMoadlCSS.nameposition}>이름 / 직급</span>
                        {
                            Array.isArray(employee) && employee.map(
                                (emp => 
                                    <div key={emp.employeeNo}
                                         className={EmpListMoadlCSS.empInfo}
                                    >
                                        <button
                                            onClick={ () => selectEmp(emp) }
                                            className={EmpListMoadlCSS.empBtn}
                                        >{emp.employeeName} {emp.position.positionName}</button>
                                    </div>
                                )
                            )
                        }
                </div>
                <span className={EmpListMoadlCSS.dep}>부서</span>
                <button
                    onClick={ () => selectDept(10) }
                    className={EmpListMoadlCSS.depBtn}
                >인사팀</button><br/>
                <button
                    onClick={ () => selectDept(20) }
                    className={EmpListMoadlCSS.depBtn}
                >총무팀</button><br/>
                <button
                    onClick={ () => selectDept(30) }
                    className={EmpListMoadlCSS.depBtn}
                >영업팀</button><br/>
                <button
                    onClick={ () => selectDept(40) }
                    className={EmpListMoadlCSS.depBtn}
                >IT사업팀</button>
                <br/>
                <div className={EmpListMoadlCSS.selectInfo}>수신자
                    <input
                        value={recipientName}
                        className={EmpListMoadlCSS.selectEmpName}
                    />
                </div>
                <button
                    onClick={() => setEmpListModal(false) }
                    className={EmpListMoadlCSS.selectBtn}
                >선택</button>
                <button
                    onClick={() => cancelBtnHandler() }
                    className={EmpListMoadlCSS.cancelBtn}
                >취소</button>
            </div>
        </div>
    );
}

export default EmpListModal;