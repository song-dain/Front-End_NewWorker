import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_EMPLOYEE = 'approval/GET_EMPLOYEE';
export const POST_APPROVAL = 'approval/POST_APPROVAL';
export const GET_DRAFTER = 'approval/GET_DRAFTER';
export const GET_DRAFTER_APPROVAL = 'approval/GET_DRAFTER_APPROVAL';
export const GET_APPROVER_APPROVAL = 'approval/GET_APPROVER_APPROVAL';
export const GET_APPROVER = 'approval/GET_APPROVER';

const actions = createActions({
     [GET_EMPLOYEE]: () => {},
     [POST_APPROVAL]: () => {},
     [GET_DRAFTER]: () => {},
     [GET_DRAFTER_APPROVAL]: () => {},
     [GET_APPROVER_APPROVAL]: () => {},
     [GET_APPROVER]: () => {}
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
   }

    },
    initialState
);

export default approvalReducer;
