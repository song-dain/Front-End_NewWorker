import { GET_DRAFTER, GET_EMPLOYEE, POST_APPROVAL, GET_DRAFTER_APPROVAL, GET_APPROVER_APPROVAL, GET_APPROVER } from "../modules/ApprovalModule";



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


export const callDrafterApprovalListAPI = ({currentPage = 1 }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/draft?page=${currentPage}`;

    return async (dispatch, getState) => {

        console.log("상신함 조회 동작 확인");

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AppRegistAPICalls] callDrafterApprovalListAPI result : ', result);
            dispatch({ type: GET_DRAFTER, payload: result.data });

        }
    }
}


export const callDrafterApprovalDetailAPI = ({appNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/drafterDetail/${appNo}`;

    return async (dispatch, getState) => {

        console.log("기안자 결재 문서 상세 조회 동작 확인");

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
            console.log('callDrafterApprovalDetailAPI result : ', result)
            dispatch({ type: GET_DRAFTER_APPROVAL, payload: result.data });
        }
    }
}


export const callApproverApprovalListAPI = ({currentPage = 1 }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/approver?page=${currentPage}`;

    return async (dispatch, getState) => {

        console.log("수신함 조회 동작 확인");

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AppRegistAPICalls] callApproverApprovalListAPI result : ', result);
            dispatch({ type: GET_APPROVER, payload: result.data });

        }
    }
}



export const callApproverApprovalDetailAPI = ({appNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/approverDetail/${appNo}`;

    return async (dispatch, getState) => {

        console.log("결재자 결재 문서 상세 조회 동작 확인");

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
            console.log('callApproverApprovalDetailAPI result : ', result)
            dispatch({ type: GET_APPROVER_APPROVAL, payload: result.data });
        }
    }
}