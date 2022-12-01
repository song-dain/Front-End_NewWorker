import { useNavigate } from "react-router-dom";

function RestOk({ RestOk : {restNo, employeeName, depName, restCateTypeNo, restDate, restYn}}) {

    const navigate = useNavigate();

    const onClickRestOkListHandler = (restNo) => {

        navigate(`/rest/list/admin/detail/${restNo}`, { replace : false });
    
 
    }

    return (
        <div
            //className={ EmployeeListCSS.employeeListDiv }
            onClick={ () => onClickRestOkListHandler(restNo) }
        >
           <h5>
            
            {/* <h5>{ restNo }  */}
            {/* { employeeName } */}
            {/* { depName } */}
            {/* { restCateTypeNo } */}
            { restDate }
            {/* { employeeNo.employeeRestDay } */}
            { restYn }</h5>
        </div>
    );
    

}

export default RestOk;