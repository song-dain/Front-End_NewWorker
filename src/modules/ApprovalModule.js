import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_EMPLOYEE = 'approval/GET_EMPLOYEE';
export const POST_APPROVAL = 'approval/POST_APPROVAL';
export const GET_DRAFTER = 'approval/GET_DRAFTER';
export const GET_DRAFTER_APPROVAL = 'approval/GET_DRAFTER_APPROVAL';
export const GET_APPROVER_APPROVAL = 'approval/GET_APPROVER_APPROVAL';
export const GET_APPROVER = 'approval/GET_APPROVER';
export const PUT_APPROVER_ACCEPT = 'approval/PUT_APPROVER_ACCEPT';
export const PUT_APPROVER_NOT_ACCEPT = 'approval/PUT_APPROVER_NOT_ACCEPT';
export const PUT_DRAFTER_CHANGE_APP_STATUS = 'approval/PUT_DRAFTER_CHANGE_APP_STATUS';

const actions = createActions({
     [GET_EMPLOYEE]: () => {},
     [POST_APPROVAL]: () => {},
     [GET_DRAFTER]: () => {},
     [GET_DRAFTER_APPROVAL]: () => {},
     [GET_APPROVER_APPROVAL]: () => {},
     [GET_APPROVER]: () => {},
     [PUT_APPROVER_ACCEPT]: () => {},
     [PUT_APPROVER_NOT_ACCEPT]: () => {},
     [PUT_DRAFTER_CHANGE_APP_STATUS]: () => {}
});

const approvalReducer = handleActions({

     [GET_EMPLOYEE] : (state, { payload }) => {
         return payload;
     },
     [POST_APPROVAL] : (state, { payload }) => {
        return payload;
    },
     [GET_DRAFTER] : (state, { payload }) => {
       return payload; 
     },
     [GET_DRAFTER_APPROVAL] : (state, { payload }) => {
        return payload;
     },
     [GET_APPROVER_APPROVAL] : (state, { payload }) => {
        return payload;
     },
     [GET_APPROVER] : (state, { payload }) => {
      return payload;
     },
     [PUT_APPROVER_ACCEPT] : (state, { payload }) => {
      return payload;
     },
     [PUT_APPROVER_NOT_ACCEPT] : (state, { payload }) => {
      return payload;
     },
     [PUT_DRAFTER_CHANGE_APP_STATUS] : (state, { payload }) => {
      return payload;
     }

    },
    initialState
);

export default approvalReducer;
