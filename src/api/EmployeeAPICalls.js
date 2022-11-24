import { POST_LOGIN, POST_FINDID, GET_EMPLOYEE, GET_EMPLOYEELIST, PUT_EMPLOYEE } from "../modules/EmployeeModule";

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