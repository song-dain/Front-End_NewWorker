import { GET_SURVEY, GET_SURVEYS, POST_SURVEY, PUT_SURVEY } from "../modules/SurveyModule";

export const callSurveyAPI = ({surNo, currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/survey/surveyList`;

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

// //등록하기
// export const callNoticeRegistAPI = ({form}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notices/register`;

//     return async (dispatch, getState) => {
//         console.log(`폼 객체 :`, form);
//         const result = await fetch(requestURL, {
//             method : "POST",
//             headers : {
//                 "Accept": "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
//             },
//             body : form
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[NoticeAPICalls] callNoticeRegistAPI result : ', result);
//             dispatch({ type: POST_NOTICE, payload: result.data });
//         }
//     }

// }


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