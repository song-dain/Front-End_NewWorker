import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';
export const GET_EMPLOYEELIST = 'employeeList/GET_EMPLOYEELIST';
export const POST_LOGIN = 'employee/POST_LOGIN';
export const POST_FINDID = 'employee/POST_FINDID';
export const POST_FINDPWD = 'employee/POST_FINDPWD';
export const POST_UPDATEPWD = 'employee/POST_UPDATEPWD';
export const PUT_EMPLOYEE = 'employee/PUT_EMPLOYEE';
export const MAIL_CONFIRM = 'employee/MAIL_CONFIRM';
export const POST_EMPLOYEE = 'employee/POST_EMPLOYEE';
export const GET_EMPLOYEEL_INFO = 'employee/GET_EMPLOYEEL_INFO';


const actions = createActions({
    [GET_EMPLOYEE]: () => {},
    [POST_LOGIN]: () => {},
    [POST_FINDID]: () => {},
    [POST_FINDPWD]: () => {},
    [POST_UPDATEPWD]: () => {},

    [GET_EMPLOYEELIST]: () => {},
    [PUT_EMPLOYEE]: () => {},

    [MAIL_CONFIRM]: () => {},
    [POST_EMPLOYEE]: () => {},

    [GET_EMPLOYEEL_INFO]: () => {}

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
    [POST_FINDPWD] : (state, { payload }) => {
        return payload;
    },
    [POST_UPDATEPWD] : (state, { payload }) => {
        return payload;
    },
    [GET_EMPLOYEELIST] : (state, { payload }) => {
        return payload;
    },
    [PUT_EMPLOYEE] : (state, { payload }) => {
        return payload;
    },

    [MAIL_CONFIRM] : (state, { payload }) => {
        return payload;
    },
    [POST_EMPLOYEE] : (state, { payload }) => {
        return payload;
    },
    [GET_EMPLOYEEL_INFO] : (state, { payload }) => {
        return payload;
    },

    },
    initialState
);

export default employeeReducer;
