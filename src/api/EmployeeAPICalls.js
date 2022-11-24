import { POST_LOGIN, POST_FINDID, MAIL_CONFIRM, POST_EMPLOYEE } from "../modules/EmployeeModule";


/* 로그인 */
export const callLoginAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                employeeId : form.employeeId,
                employeePwd : form.employeePwd
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmpAPICalls] callLoginAPI result : ', result);
            window.localStorage.setItem('accessToken', result.data.accessToken);
            dispatch({ type: POST_LOGIN, payload: result });
        }
    }
}


/* 로그아웃 */
export const callLogoutAPI = () => {

    return async (dispatch, getState) => {
        
        dispatch({ type: POST_LOGIN, payload: ''});
        console.log('[EmpAPICalls] callLogoutAPI result : SUCCESS');
    }
}


/* 아이디 찾기 */

export const callFindIdAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/idInquiry`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                employeeName : form.employeeName,
                employeeEmail : form.employeeEmail
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callFindIdAPI result : ', result);
            dispatch({ type: POST_FINDID, payload : result });
        }
    }

}

/* 이메일 인증 */
export const callMailConfirmAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/mailConfirm`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                employeeId : form.employeeId,
                employeeName : form.employeeName,
                employeeEmail : form.employeeEmail
            })
        })
        .then(response => response.json());
        

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callMailConfirmAPI result : ', result);
            dispatch({ type: MAIL_CONFIRM, payload : result });
        }
    }

}

/* 비밀번호 찾기 */
export const callFindPwdAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/PwdInquiry`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                employeeName : form.employeeName,
                employeeEmail : form.employeeEmail
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callFindIdAPI result : ', result);
            dispatch({ type: POST_FINDID, payload : result });
        }
    }

}

/* 직원 등록 */
export const callEmployeeRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/employee/register`;

    return async (dispatch, getState) => {

        console.log("동작 확인");

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form 
         })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callEmployeeRegistAPI result : ', result);
            dispatch({ type: POST_EMPLOYEE, payload : result.data });
            alert('직원 등록 완료');
            window.location.reload();

            
        }else {
            alert('양식을 지켜 작성해 주세요.');
        }
    }

}