import LoginCSS from './Login.module.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callFindPwdAPI } from '../../api/EmployeeAPICalls';

function PwdInquiry() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[form, setForm] = useState({
        employeeId : '',
        employeeName: '',
        employeeEmail: '',
        code: '' //인증번호
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickEmailCodeHandler = () => {
        
    }

    const onClickPwdInquiryResultHandler = () => {
        dispatch(callFindPwdAPI({
            form : form
        }));
        console.log("form", form)

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
            <button className={ LoginCSS.pwdInquirybtn } onClick={ onClickPwdInquiryResultHandler }>비밀번호 찾기</button>
            <br/>
            <button className={ LoginCSS.backbtn } onClick={ onClickBackHandler }>돌아가기</button>
        </div>
    </div>

    );

}


export default PwdInquiry;