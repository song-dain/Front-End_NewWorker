import LoginCSS from './Login.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callLoginAPI } from "../../api/EmployeeAPICalls";


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useSelector(state => state.employeeReducer);

    useEffect(() => {
            if(window.localStorage.getItem('accessToken') !== null) {
                console.log("[Login] 로그인 성공 {}", login);
                navigate("/", { replace : true })
            }
        }
        ,[login]
    )

    const[form, setForm] = useState({
        employeeId: '',
        employeePwd: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickIdInquiryHandler = () => {
        navigate("/idInquiry", {replace:true});
    }

    const onClickPwdInquiryHandler = () => {
        navigate("/pwdInquiry", {replace:true});
    }


    const onClickHandler = () => {
        dispatch(callLoginAPI({
            form : form
        }))
    }

    return (
        <div>
            <div className={ LoginCSS.loginDiv }>
                <div className={ LoginCSS.icon }>
                    <img src="img/nwiconbig.png"/>
                </div>
                <input type="text" className={ LoginCSS.idinput } name="employeeId" placeholder="아이디" autoComplete='off' onChange={ onChangeHandler }/>
                <input type="password" className={ LoginCSS.pwdinput } name="employeePwd" placeholder="패스워드" autoComplete='off' onChange={ onChangeHandler }/>
                <button className={ LoginCSS.loginbtn } onClick={ onClickHandler }>로그인</button>
                <table className={ LoginCSS.quiryText }>
                    <td onClick={ onClickIdInquiryHandler }>아이디 찾기 | </td>
                    <td onClick={ onClickPwdInquiryHandler }>  비밀번호 찾기 |</td>
                    <td> 비밀번호 변경 </td>
                    </table>
            </div>
        </div>
    );
}

export default Login;