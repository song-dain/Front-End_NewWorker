import { GET_NOTICE, GET_NOTICES, POST_NOTICE, PUT_NOTICE, DELETE_NOTICE } from "../modules/NoticeModule";

//조회하기
export const callNoticeAPI = ({notNo, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/noticeList`;

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
            console.log('[NoticeAPICalls] callNoticeAPI result : ', result);

            dispatch({ type: GET_NOTICES, payload: result.data });
        }
    }

}

//상세 조회하기
export const callNoticeDetailAPI = ({notNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/noticeDetail/${notNo}`;

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
            console.log('[NoticeAPICalls] callNoticeDetailAPI result : ', result);

            dispatch({ type: GET_NOTICE, payload: result });
        }
    }

}

//수정하기
export const callNoticeUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notices/register`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }, 
            body : JSON.stringify({
                notNo : form.notNo,
                notTitle : form.notTitle,
                notContent : form.notContent
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeUpdateAPI result : ', result);

            dispatch({ type: PUT_NOTICE, payload: result });
        }
    }

}

//등록하기
export const callNoticeRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notices/register`;

    return async (dispatch, getState) => {
        console.log(`폼 객체 :`, form);
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeRegistAPI result : ', result);
            dispatch({ type: POST_NOTICE, payload: result.data });
        }
    }

}

/* 공지 삭제 */
export const callNoticeDeleteAPI = ({ notNo }) => {
    console.log('[noticeAPICalls] noticeCode 공지 삭제 : ', notNo);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/noticeDetail/delete/${notNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
            // body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[noticeAPICalls] callNoticeDeleteAPI result : ', result);
            dispatch({ type: DELETE_NOTICE, payload: result });
        }
    }

}

export const callNoticeDetailForAdminAPI = ({notNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notices/noticeList/${notNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[NoticeAPICalls] callNoticeDetailForAdminAPI RESULT : ', result);
            dispatch({ type: GET_NOTICE, payload : result.data });
        }
    }
}