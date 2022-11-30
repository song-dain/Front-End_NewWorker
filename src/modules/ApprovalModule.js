import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_EMPLOYEE = 'approval/GET_EMPLOYEE';
export const POST_APPROVAL = 'approval/POST_APPROVAL';


const actions = createActions({
     [GET_EMPLOYEE]: () => {},
     [POST_APPROVAL]: () => {}
});

const approvalReducer = handleActions({

     [GET_EMPLOYEE] : (state, { payload }) => {
         return payload;
     },
     [POST_APPROVAL] : (state, { payload }) => {
        return payload;
    }

    },
    initialState
);

export default approvalReducer;
