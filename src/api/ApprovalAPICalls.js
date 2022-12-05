import { json } from "react-router-dom";
import { GET_DRAFTER, GET_EMPLOYEE, POST_APPROVAL, GET_DRAFTER_APPROVAL, GET_APPROVER_APPROVAL, 
        GET_APPROVER, PUT_APPROVER_ACCEPT, PUT_APPROVER_NOT_ACCEPT, PUT_DRAFTER_CHANGE_APP_STATUS,
        POST_REMOVE_APPROVAL } from "../modules/ApprovalModule";


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



export const callAppRegistAPI = ({form}) => {
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


export const callAcceptChangeAPI = ({appLineNo, approvalNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/acceptStatus`;

    return async (dispatch, getState) => {

        console.log("결재자 결재 문서 승인 동작 확인");
        console.log("appLineNo : ", appLineNo);
        console.log("approvalNo : ", approvalNo);

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                    appLineNo : appLineNo,
                    approvalNo : approvalNo 
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('callApproverApprovalDetailAPI result : ', result)
            dispatch({ type: PUT_APPROVER_ACCEPT, payload: result.data });
            window.location.reload();
        }
    }
}


export const callNotAcceptChangeAPI = ({appLineNo, approvalNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/notAcceptStatus`;

    return async (dispatch, getState) => {

        console.log("결재자 결재 문서 승인 동작 확인");
        console.log("appLineNo : ", appLineNo);
        console.log("approvalNo : ", approvalNo);

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                    appLineNo : appLineNo,
                    approvalNo : approvalNo 
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('callApproverApprovalDetailAPI result : ', result)
            dispatch({ type: PUT_APPROVER_NOT_ACCEPT, payload: result.data });
            window.location.reload();
        }
    }
}


export const callAppStatusChangeAPI = ({appLineNo, appNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/appStatus`;

    return async (dispatch, getState) => {

        console.log("기안자 결재 문서 회수 동작 확인");
        console.log("appLineNo : ", appLineNo);
        console.log("appNo : ", appNo);

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                    appLines : [{
                        appLineNo : appLineNo
                    }],
                    appNo : appNo 
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('callApproverApprovalDetailAPI result : ', result)
            dispatch({ type: PUT_DRAFTER_CHANGE_APP_STATUS, payload: result.data });
            window.location.reload();
        }
    }
}


export const callAppRemoveAPI = ({appNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/app/approval/removeApproval`;

    return async (dispatch, getState) => {

        console.log("기안자 결재 문서 삭제 동작 확인");
        console.log("appNo : ", appNo);

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                    appNo : appNo 
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('callremoveApprovalAPI result : ', result)
            dispatch({ type: POST_REMOVE_APPROVAL, payload: result.data });
            alert('결재 문서 삭제에 성공하였습니다.');
        }
    }
}