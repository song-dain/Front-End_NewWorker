import { GET_EMPLOYEE } from "../modules/ApprovalModule";



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

