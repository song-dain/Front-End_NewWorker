import { useNavigate } from "react-router-dom";

function Rest({ rest : {restNo, restCateType, restFdate, restLdate, restDay, /*employeeNo.employeeRestDay,*/ restOk}}) {

    const navigate = useNavigate();

    const onClickRestListHandler = (restNo) => {

        navigate(`/rest/list/detail/${restNo}`, { replace : false });
    
    }

    return (
        <div
            //className={ EmployeeListCSS.employeeListDiv }
            onClick={ () => onClickRestListHandler(restNo) }
        >
           
            <h5>{ restNo } 
            { restCateType }
            { restFdate }
            { restLdate }
            { restDay }
            {/* { employeeNo.employeeRestDay } */}
            { restOk }</h5>
        </div>
    );
    

}

export default Rest;