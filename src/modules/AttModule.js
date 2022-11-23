import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_START = 'att/POST_START';
export const PUT_END = 'att/PUT_END';
export const GET_DAYS = 'att/GET_DAYS';
export const GET_MONTHS = 'att/GET_MONTHS';
export const GET_ADMIN_DAYS = 'att/GET_ADMIN_DAYS';
export const GET_ADMIN_MONTHS = 'att/GET_ADMIN_MONTHS';

const actions = createActions({
    [POST_START]: () => {},
    [PUT_END]: () => {},
    [GET_DAYS]: () => {},
    [GET_MONTHS]: () => {},
    [GET_ADMIN_DAYS]: () => {},
    [GET_ADMIN_MONTHS]: () => {}
});

const attReducer = handleActions({

    [POST_START] : (state, { payload }) => {
        return payload;
    },
    [PUT_END] : (state, { payload }) => {
        return payload;
    },
    [GET_DAYS] : (state, { payload }) => {
        return payload;
    },
    [GET_MONTHS] : (state, { payload }) => {
        return payload;
    },
    [GET_ADMIN_DAYS] : (state, { payload }) => {
        return payload;
    },
    [GET_ADMIN_MONTHS] : (state, { payload }) => {
        return payload;
    }
    },
    initialState
);


export default attReducer;