import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
export const POST_LOGIN = 'employee/POST_LOGIN';
export const POST_FINDID = 'employee/POST_FINDID';
export const MAIL_CONFIRM = 'employee/MAIL_CONFIRM';
export const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';

const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [POST_LOGIN]: () => {},
    [POST_FINDID]: () => {},
    [MAIL_CONFIRM]: () => {},
    [POST_EMPLOYEE]: () => {}
});

const employeeReducer = handleActions({

    [GET_EMPLOYEE] : (state, { payload }) => {
        return payload;
    },
    [POST_LOGIN] : (state, { payload }) => {
        return payload;
    },
    [POST_FINDID] : (state, { payload }) => {
        return payload;
    },
    [MAIL_CONFIRM] : (state, { payload }) => {
        return payload;
    },
    [POST_EMPLOYEE] : (state, { payload }) => {
        return payload;
    },
    },
    initialState
);

export default employeeReducer;
