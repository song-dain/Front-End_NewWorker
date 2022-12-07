import { GET_SURVEY, GET_SURVEYS, POST_SURVEY, PUT_SURVEY, POST_SURVEYSUBMIT, DELETE_SURVEY } from "../modules/SurveyModule";

export const callSurveyAPI = ({surNo, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/survey/surveyList/${surNo}?page=${currentPage}`;

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
            console.log('[SurveyAPICalls] callSurveyAPI result : ', result);

            dispatch({ type: GET_SURVEYS, payload: result.data });
        }
    }

}

//상세 페이지
export const callSurveyDetailAPI = ({surNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/survey/surveyDetail/${surNo}`;

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
            console.log('[SurveyAPICalls] callSurveyDetailAPI result : ', result);

            dispatch({ type: GET_SURVEY, payload: result });
        }
    }

}

// //수정하기
// export const callNoticeUpdateAPI = ({form}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notices/register`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method : "PUT",
//             headers : {
//                 "Content-Type" : "application/json",
//                 "Accept": "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
//             }, 
//             body : JSON.stringify({
//                 notNo : form.notNo,
//                 notTitle : form.notTitle,
//                 notContent : form.notContent
//             })
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[NoticeAPICalls] callNoticeUpdateAPI result : ', result);

//             dispatch({ type: PUT_NOTICE, payload: result });
//         }
//     }

// }

//등록하기
export const callSurveyRegistAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/survey/survey/register`;

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
            console.log('[SurveyAPICalls] callSurveyRegistAPI result : ', result);
            dispatch({ type: POST_SURVEY, payload: result.data });
            
        }
    }

}

//제출하기
export const callSurveySubmitAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/survey/survey/submit`;

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
            console.log('[SurveyAPICalls] callSurveySubmitAPI result : ', result);
            dispatch({ type: POST_SURVEYSUBMIT, payload: result.data });
            
        }
    }

}

/* 설문 삭제 */
export const callSurveyDeleteAPI = ({ surNo }) => {
    console.log('[surveyAPICalls] surNo 설문 삭제 : ', surNo);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/survey/surveyDetail/delete/${surNo}`;

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
            console.log('[noticeAPICalls] callSurveyDeleteAPI result : ', result);
            dispatch({ type: DELETE_SURVEY, payload: result });
        }
    }

}


// export const callNoticeDetailForAdminAPI = ({notNo}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notices/noticeList/${notNo}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method : "GET",
//             headers : {
//                 "Content-Type" : "application/json",
//                 "Accept" : "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[NoticeAPICalls] callNoticeDetailForAdminAPI RESULT : ', result);
//             dispatch({ type: GET_NOTICE, payload : result.data });
//         }
//     }
// }