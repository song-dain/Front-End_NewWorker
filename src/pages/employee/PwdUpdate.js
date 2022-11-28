import LoginCSS from './Login.module.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callUpdatePwdAPI, callMailConfirmAPI } from '../../api/EmployeeAPICalls';

function PwdUpdate() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[form, setForm] = useState({
        employeeId : '',
        employeeName: '',
        employeeEmail: '',
        employeePwd: '',
        code: '' //인증번호
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickEmailCodeHandler = () => {
        dispatch(callMailConfirmAPI({
            form : form
        }));
        console.log("onClickEmailCode form", form)
        alert('인증번호 발송 성공. 메일을 확인해 주세요.');
    }

    const onClickPwdUpdateResultHandler = () => {
        dispatch(callUpdatePwdAPI({
            form : form
        }));
        console.log("onClickPwdUpdateResultHandler", form)
        navigate("/pwdUpdateResult", {replace:true});

    }



    const onClickBackHandler = () => {
        navigate("/login", {replace:true});
    }



    return (

        <div className={ LoginCSS.loginDiv }>
        <div className={ LoginCSS.icon }>
            <img src="img/nwiconbig.png"/>
            <input type="text" className={ LoginCSS.idinput } name="employeeId" placeholder="아이디를 입력하세요." autoComplete='off' onChange={ onChangeHandler }/>
            <br/>
            <input type="text" className={ LoginCSS.idinput } name="employeeName" placeholder="이름을 입력하세요." autoComplete='off' onChange={ onChangeHandler }/>
            <br/>
            <input type="text" className={ LoginCSS.idinput } name="employeeEmail" placeholder="이메일을 입력하세요." autoComplete='off' onChange={ onChangeHandler }/>
            <button className={ LoginCSS.ecodebtn } onClick={ onClickEmailCodeHandler }>인증번호 받기</button>
            <br/>
            <input type="text" className={ LoginCSS.idinput } name="code" placeholder="인증번호를 입력" autoComplete='off' onChange={ onChangeHandler }/>
            <br/>
            <input type="text" className={ LoginCSS.idinput } name="employeePwd" placeholder="새 비밀번호를 입력" autoComplete='off' onChange={ onChangeHandler }/>
            <br/>
            <button className={ LoginCSS.pwdInquirybtn } onClick={ onClickPwdUpdateResultHandler }>비밀번호 변경</button>
            <br/>
            <button className={ LoginCSS.backbtn } onClick={ onClickBackHandler }>돌아가기</button>
        </div>
    </div>

    );

}


export default PwdUpdate;