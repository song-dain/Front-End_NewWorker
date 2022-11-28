import LoginCSS from './Login.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function PwdInquiryResult() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.employeeReducer);
    const employeeDetail = employee.data;


    useEffect(() => {

        if(employee.status === 200) {
            console.log("[FindPWD] 비밀번호 찾기 성공 {}", employee);
        }
    }, []);

    
    const onClickBackHandler = () => {
        navigate("/login");
    }


    return (
        <div className={ LoginCSS.loginDiv }>
            <div className={ LoginCSS.icon }>
                <img src="img/nwiconbig.png"/>
                <br/>
                <br/>
                <div> 해당 이메일로 임시 비밀번호를 발송하였습니다. </div>
                <br/>
                <button className={ LoginCSS.backbtn } onClick={ onClickBackHandler }>돌아가기</button>
            </div>
        </div>
    );
}


export default PwdInquiryResult;