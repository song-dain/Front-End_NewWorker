import { GET_EMPLOYEE, POST_SEND_MESSAGE, 
        GET_RECEIVE_MESSAGES, GET_SEARCH_RECEIVE_MESSAGES,
        GET_SEND_MESSAGES, GET_SEARCH_SEND_MESSAGES, PATCH_SEND_CALCEL,
        GET_IMPO_MESSAGES, GET_SEARCH_IMPO_MESSAGE,
        GET_RECEIVE_BIN_MESSAGES, GET_SEND_BIN_MESSAGES,
        PATCH_RECIPIENT_MANAGEMENT, PATCH_SENDER_MANAGEMENT, GET_UNREAD_MESSAGE, PATCH_MESSAGE_READ } from '../modules/MessageModule';
 
export const callEmpListAPI = ({depNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/send/findEmp/${depNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: GET_EMPLOYEE, payload: result.data });
        }
    }
}

export const callSendMessageAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/send`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                messageContent : form.messageContent,
                recipient : {
                    employeeNo : form.recipient.employeeNo
                }
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: POST_SEND_MESSAGE, payload: result.data });
        }
    }
}

export const callReceiveMessageListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/receive?page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_RECEIVE_MESSAGES, payload: result.data });
        }
    }
}

export const callSearchReceiveMessageAPI = ({keyword, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/receive/search?keyword=${keyword}&page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_SEARCH_RECEIVE_MESSAGES, payload: result.data });
        }
    }
}

export const callSendMessageListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/send?page=${currentPage}`;

    return async (dispatch, getState) => {

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
            console.log(result);
            dispatch({ type: GET_SEND_MESSAGES, payload: result.data });
        }
    }
}

export const callSearchSendMessageAPI = ({keyword, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/send/search?keyword=${keyword}&page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_SEARCH_SEND_MESSAGES, payload: result.data });
        }
    }
}

export const callImpoMessageListAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/impo?page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_IMPO_MESSAGES, payload: result.data });
        }
    }
}

export const callSearchImpoMessageAPI = ({keyword, currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/impo/search?keyword=${keyword}&page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_SEARCH_IMPO_MESSAGE, payload: result.data });
        }
    }
}

export const callBinReceiveMessageAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/bin/receive?page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_RECEIVE_BIN_MESSAGES, payload: result.data });
        }
    }
}

export const callBinSendMessageAPI = ({currentPage = 1}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/bin/send?page=${currentPage}`;

    return async (dispatch, getState) => {

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
            dispatch({ type: GET_SEND_BIN_MESSAGES, payload: result.data });
        }
    }
}

export const callRecipientManagementAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/receive`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                message : {
                    messageNo : form.message.messageNo
                },
                receiveMessageCategory : form.receiveMessageCategory,
                receiveMessageDelete : form.receiveMessageDelete
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: PATCH_RECIPIENT_MANAGEMENT, payload: result.data });
        }
    }
}

export const callSenderManagementAPI = ({form, messageNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/send/${messageNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                message : {
                    messageNo : form.message.messageNo
                },
                sendMessageDelete : form.sendMessageDelete
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: PATCH_SENDER_MANAGEMENT, payload: result.data });
        }
    }
}

export const callUnreadMessageAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/unread`;

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
            dispatch({ type: GET_UNREAD_MESSAGE, payload: result.data });
        }
    }
}

export const callSendCalcelAPI = ({messageNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/cancel/${messageNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: PATCH_SEND_CALCEL, payload: result.data });
        }
    }
}

export const callMessageReadAPI = ({messageNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/message/read/${messageNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: PATCH_MESSAGE_READ, payload: result.data });
        }
    }
}