import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_EMPLOYEE = 'employee/GET_EMPLOYEE';


const actions = createActions({
     [GET_EMPLOYEE]: () => {}
});

const approvalReducer = handleActions({

     [GET_EMPLOYEE] : (state, { payload }) => {
         return payload;
     },

    },
    initialState
);

export default approvalReducer;
