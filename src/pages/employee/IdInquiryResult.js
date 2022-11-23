import LoginCSS from './Login.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { callFindIdAPI } from'../../api/EmployeeAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { POST_FINDID } from '../../modules/EmployeeModule';

function IdInquiryResult() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.employeeReducer);
    const employeeDetail = employee.data;


    useEffect(() => {

        if(employee.status === 200) {
            console.log("[FindId] 아이디 찾기 성공 {}",employee);
        }
    }, []);


    const onClickBackHandler = () => {
        navigate("/", {replace:true});
    }

    
    return (
        <div className={ LoginCSS.loginDiv }>
            <div className={ LoginCSS.icon }>
                <img src="img/nwiconbig.png"/>
                { employeeDetail && 
                <h3> { employeeDetail.employeeName} 님이 찾으시는 아이디는 { employeeDetail.employeeId } 입니다</h3>
                }
                    
                <button className={ LoginCSS.backbtn } onClick={ onClickBackHandler }>돌아가기</button>
            </div>
        </div>
    );
}


export default IdInquiryResult;