import { POST_REST, GET_RESTLIST, PUT_REST, GET_RESTOKLIST } from "../modules/RestModule";

//휴가등록
export const callRestRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/regist`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")/*추가 */
            },
       
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RestAPICalls] callRestRegistAPI result : ', result);
            dispatch({ type: POST_REST, payload: result.data });
        

        }
    }
}

//휴가조회
export const callRestListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/list?page=${currentPage}`;

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
            console.log('[RestAPICalls] callRestListAPI result : ', result);
            dispatch({ type: GET_RESTLIST, payload: result.data });
        }
    }

}

//휴가 상세조회
export const callRestDetailAPI = ({restNo}) => {
        
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/list/detail/${restNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RestAPICalls] callRestDetailAPI RESULT : ', result);
            dispatch({ type: GET_RESTLIST, payload : result.data });
        }
    }

}
//수정
export const callRestUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/regist`;

    console.log("form", form);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RestAPICalls] callRestUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_REST, payload : result.data });
        }
    }
}

//휴가인가조회
export const callRestOkListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/list/admin?page=${currentPage}`;

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
            console.log('[RestAPICalls] callRestOkListAPI result : ', result);
            dispatch({ type: GET_RESTOKLIST, payload: result.data });
        }
    }

}

//휴가인가상세조회
export const callRestOkDetailAPI = ({restNo}) => {
        
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/list/admin/detail/${restNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RestAPICalls] callRestOkDetailAPI RESULT : ', result);
            dispatch({ type: GET_RESTLIST, payload : result.data });
        }
    }

}

//휴가승인버튼
export const callRestOkButtonAPI = ({restNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/list/admin/detail/${restNo}`;
    

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RestAPICalls] callRestUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_REST, payload : result.data });
        }
    }
}

//휴가반려버튼
export const callRestNoButtonAPI = ({restNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/rest/list/admin/detail/No/${restNo}`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RestAPICalls] callRestUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_REST, payload : result.data });
        }
    }
}