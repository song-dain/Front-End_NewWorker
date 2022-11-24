import { useNavigate } from "react-router-dom";

function Employee({ employee : {employeeNo, employeeName, dep, position, employeeEmail, employeePhone, employeeStatus}}) {

    const navigate = useNavigate();

    const onClickEmployeeListHandler = (employeeNo) => {

        navigate(`/emp/employeeList/detail-management/${employeeNo}`, { replace : false });
    
    }

    return (
        <div
            //className={ EmployeeListCSS.employeeListDiv }
            onClick={ () => onClickEmployeeListHandler(employeeNo) }
        >
            <h5>{ employeeName }
            { dep.depName }
            { position.positionName }
            { employeeEmail }
            { employeePhone }
            { employeeStatus }</h5>
        </div>
    );
    

}

export default Employee;