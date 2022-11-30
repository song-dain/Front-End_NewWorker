import { GET_EMPLOYEE, POST_APPROVAL } from "../modules/ApprovalModule";



export const callEmpListAPI = ({depNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/findApprover/${depNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: GET_EMPLOYEE, payload: result.data });
        }
    }
}

export const callAppRegisttAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/regist`;

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
            console.log('[AppRegistAPICalls] callAppRegistAPI result : ', result);
            dispatch({ type: POST_APPROVAL, payload: result.data });
            alert('결재 상신 완료');
            window.location.reload();

        }
    }
}

