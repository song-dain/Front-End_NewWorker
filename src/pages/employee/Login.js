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
            if(login.status === 200) {
                console.log("[Login] 로그인 성공 {}", login);
                navigate("/main", { replace : true })
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

    const onClickHandler = () => {
        dispatch(callLoginAPI({
            form : form
        }))
    }

    return (
        <div className={ LoginCSS.backgroundDiv }>
            <div className={ LoginCSS.loginDiv }>
                <h1>로그인</h1>
                <input type="text" name="employeeId" placeholder="아이디" autoComplete='off' onChange={ onChangeHandler }/>
                <input type="password" name="employeePwd" placeholder="패스워드" autoComplete='off' onChange={ onChangeHandler }/>
                <button onClick={ onClickHandler }>로그인</button>
            </div>
        </div>
    );
}

export default Login;