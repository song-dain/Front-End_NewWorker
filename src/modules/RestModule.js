import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_REST = 'rest/POST_REST';
export const GET_RESTLIST = 'rest/GET_RESTLIST';
export const PUT_REST = 'rest/PUT_REST';
export const GET_RESTOKLIST = 'rest/GET_RESTOKLIST';





const actions = createActions({
    
    [POST_REST]: () => {},
    [GET_RESTLIST]: () => {},
    [PUT_REST]: () => {},
    [GET_RESTOKLIST]: () => {}
});




const restReducer = handleActions(
    {
        [POST_REST] : (state, {payload}) => {
            return payload;
        },
        [GET_RESTLIST] : (state, {payload}) => {
            return payload;
        },
        [PUT_REST] : (state, {payload}) => {
            return payload;
        },
        [GET_RESTOKLIST] : (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default restReducer;