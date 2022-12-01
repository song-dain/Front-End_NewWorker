import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_EMPLOYEE = 'message/GET_EMPLOYEE';
export const POST_SEND_MESSAGE = 'message/POST_SEND_MESSAGE';

export const GET_RECEIVE_MESSAGES = 'message/GET_RECEIVE_MESSAGES';
export const PATCH_RECEIVE_MESSAGE = 'message/PATCH_RECEIVE_MESSAGE';
export const GET_SEARCH_RECEIVE_MESSAGES = 'message/GET_SEARCH_RECEIVE_MESSAGES';

export const GET_SEND_MESSAGES = 'message/GET_SEND_MESSAGES';
export const GET_SEARCH_SEND_MESSAGES = 'message/GET_SEARCH_SEND_MESSAGES';

export const GET_IMPO_MESSAGES = 'message/GET_IMPO_MESSAGES';
export const GET_SEARCH_IMPO_MESSAGE = 'message/GET_SEARCH_IMPO_MESSAGE';

export const GET_RECEIVE_BIN_MESSAGES = 'message/GET_RECEIVE_BIN_MESSAGES';
export const GET_SEND_BIN_MESSAGES = 'message/GET_SEND_BIN_MESSAGES';

export const PATCH_RECIPIENT_MANAGEMENT = 'message/PATCH_RECIPIENT_MANAGEMENT';
export const PATCH_SENDER_MANAGEMENT = 'message/PATCH_SENDER_MANAGEMENT';

export const GET_UNREAD_MESSAGE = 'message/GET_UNREAD_MESSAGE';

export const PATCH_SEND_CALCEL = 'message/PATCH_SEND_CALCEL';

const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [POST_SEND_MESSAGE]: () => {},

    [GET_RECEIVE_MESSAGES]: () => {},
    [PATCH_RECEIVE_MESSAGE]: () => {},
    [GET_SEARCH_RECEIVE_MESSAGES]: () => {},

    [GET_SEND_MESSAGES]: () => {},
    [GET_SEARCH_SEND_MESSAGES]: () => {},

    [GET_IMPO_MESSAGES]: () => {},
    [GET_SEARCH_IMPO_MESSAGE]: () => {},

    [GET_RECEIVE_BIN_MESSAGES]: () => {},
    [GET_SEND_BIN_MESSAGES]: () => {},

    [PATCH_RECIPIENT_MANAGEMENT]: () => {},
    [PATCH_SENDER_MANAGEMENT]: () => {},

    [GET_UNREAD_MESSAGE]: () => {},

    [PATCH_SEND_CALCEL]: () => {}
});

const messageReducer = handleActions({

    [GET_EMPLOYEE] : (state, { payload }) => {
        return payload;
    },
    [POST_SEND_MESSAGE] : (state, { payload }) => {
        return payload;
    },

    [GET_RECEIVE_MESSAGES] : (state, { payload }) => {
        return payload;
    },
    [PATCH_RECEIVE_MESSAGE] : (state, { payload }) => {
        return payload;
    },
    [GET_SEARCH_RECEIVE_MESSAGES] : (state, { payload }) => {
        return payload;
    },

    [GET_SEND_MESSAGES] : (state, { payload }) => {
        return payload;
    },
    [GET_SEARCH_SEND_MESSAGES] : (state, { payload }) => {
        return payload;
    },

    [GET_IMPO_MESSAGES] : (state, { payload }) => {
        return payload;
    },
    [GET_SEARCH_IMPO_MESSAGE] : (state, { payload }) => {
        return payload;
    },

    [GET_RECEIVE_BIN_MESSAGES] : (state, { payload }) => {
        return payload;
    },
    [GET_SEND_BIN_MESSAGES] : (state, { payload }) => {
        return payload;
    },

    [PATCH_RECIPIENT_MANAGEMENT] : (state, { payload }) => {
        return payload;
    },
    [PATCH_SENDER_MANAGEMENT] : (state, { payload }) => {
        return payload;
    },
    
    [GET_UNREAD_MESSAGE] : (state, { payload }) => {
        return payload;
    },

    [PATCH_SEND_CALCEL] : (state, { payload }) => {
        return payload;
    }
    },
    initialState
);


export default messageReducer;