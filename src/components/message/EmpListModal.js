import { useDispatch, useSelector } from "react-redux";
import { callEmpListAPI } from "../../api/MessageAPICalls";
import { useEffect, useState } from "react";

function EmpListModal({message, setMessage, recipient, setEmpListModal}){

    const dispatch = useDispatch();
    const employee = useSelector(state => state.messageReducer);
    const [ isChange, setIsChange ] = useState(10);

    useEffect(
        () => {
        }
        , [isChange]
    )

    const selectDept = (dept) => {

        dispatch(callEmpListAPI({
            depNo : dept
        }));

        setIsChange(dept);
    }

    const selectEmp = (emp) => {
        recipient(emp.employeeName);
        setMessage({
            ...message,
            recipient : {
                employeeNo : emp.employeeNo
            }
        })
    }

    return(
        <div>
            empListmodal
            <button
                onClick={ () => selectDept(10) }
            >인사팀</button>
            <button
                onClick={ () => selectDept(20) }
            >총무팀</button>
            <button
                onClick={ () => selectDept(30) }
            >영업팀</button>
            <button
                onClick={ () => selectDept(40) }
            >IT사업팀</button>

            {
                Array.isArray(employee) && employee.map(
                    (emp => 
                        <div key={emp.employeeNo}>
                            <button
                                onClick={ () => selectEmp(emp) }
                            >{emp.employeeName}</button>
                        </div>


                    )
                )
            }
            <button
                onClick={() => setEmpListModal(false) }
            >선택 완료</button>
        </div>
    );
}

export default EmpListModal;