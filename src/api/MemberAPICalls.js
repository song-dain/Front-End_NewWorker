import { GET_MEMBER, POST_LOGIN, POST_REGISTER } from "../modules/MemberModule";

// export const callLoginAPI = ({form}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/login`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method : "POST",
//             headers : {
//                 "Content-Type" : "application/json",
//                 "Accept": "*/*"
//             },
//             body : JSON.stringify({
//                 memberId: form.memberId,
//                 memberPassword: form.memberPassword
//             })
//         })
//         .then(response => response.json());

//         if(result.status === 200) {
//             console.log('[MemberAPICalls] callLoginAPI result : ', result);
//             // 클라이언트 측의 localStorage에 로그인 완료 시 발급 된 accessToken을 저장한다.
//             // 이후 토큰이 필요한 요청에는 저장된 토큰을 넣어서 요청하도록 한다.
//             window.localStorage.setItem('accessToken', result.data.accessToken);
//             dispatch({ type: POST_LOGIN, payload: result });
//         }
//     }

// }

export const callLogoutAPI = () => {

    return async (dispatch, getState) => {

        dispatch({ type: POST_LOGIN, payload: ''});
        console.log('[MemberAPICalls] callLogoutAPI result : SUCCESS');
    }
}

