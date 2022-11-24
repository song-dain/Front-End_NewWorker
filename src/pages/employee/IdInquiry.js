import LoginCSS from './Login.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { callFindIdAPI } from'../../api/EmployeeAPICalls';
import { useDispatch } from 'react-redux';


function IdInquiry() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const[form, setForm] = useState({
        employeeName: '',
        employeeEmail: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    const onClickIdInquiryResultHandler = () => {
        dispatch(callFindIdAPI({form}));
        console.log("form", form);
        navigate("/idInquiryResult", {replace:true});
    }

    const onClickBackHandler = () => {
        navigate("/login", {replace:true});
    }


    return (
        <div className={ LoginCSS.loginDiv }>
            <div className={ LoginCSS.icon }>
                <img src="img/nwiconbig.png"/>
                <input type="text" className={ LoginCSS.idinput } name="employeeName" placeholder="이름을 입력하세요." autoComplete='off' onChange={ onChangeHandler }/>
                <br/>
                <input type="text" className={ LoginCSS.idinput } name="employeeEmail" placeholder="이메일을 입력하세요." autoComplete='off' onChange={ onChangeHandler }/>
                <br/>
                <button className={ LoginCSS.idInquirybtn } onClick={ onClickIdInquiryResultHandler }>아이디 찾기</button>
                <br/>
                <button className={ LoginCSS.backbtn } onClick={ onClickBackHandler }>돌아가기</button>
            </div>
        </div>
    );
}


export default IdInquiry;