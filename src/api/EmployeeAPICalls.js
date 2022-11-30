import { POST_LOGIN, POST_FINDID, POST_FINDPWD, POST_UPDATEPWD, GET_EMPLOYEE, GET_EMPLOYEELIST, PUT_EMPLOYEE, MAIL_CONFIRM, POST_EMPLOYEE, GET_EMPLOYEEL_INFO } from "../modules/EmployeeModule";



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

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/pwdInquiry`;

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
                employeeEmail : form.employeeEmail,
                code : form.code
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callFindPwdAPI result : ', result);
            dispatch({ type: POST_FINDPWD, payload : result });
        }
    }

}


/* 비밀번호 변경 */
export const callUpdatePwdAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/pwdUpdate`;

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
                employeeEmail : form.employeeEmail,
                code : form.code,
                employeePwd : form.employeePwd
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callUpdatePwdAPI result : ', result);
            dispatch({ type: POST_UPDATEPWD, payload : result });
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



// 직원조회
export const callEmployeeListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/employeeList?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeListAPICalls] callEmployeeListAPI result : ', result);
            dispatch({ type: GET_EMPLOYEELIST, payload: result.data });
        }
    }
}

// 직원상세조회(관리자영역)
export const callEmployeeDetailAPI = ({employeeNo}) => {
        
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/employeeList/detail-management/${employeeNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                //"Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callEmployeeDetailAPI RESULT : ', result);
            dispatch({ type: GET_EMPLOYEELIST, payload : result.data });
        }
    }

}

//수정
export const callEmployeeUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/employee/${form.get("employeeNo")}`;

    console.log("form", form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                //"Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callEmployeeUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_EMPLOYEE, payload : result.data });
        }
    }
}

// [사이드바, 캘린더] 본인 정보 가져오기
export const callEmployeeInfoAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/employee/empInfo`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[EmployeeAPICalls] callEmployeeInfoAPI RESULT : ', result);
            dispatch({ type: GET_EMPLOYEEL_INFO, payload : result.data });
        }
    }
}