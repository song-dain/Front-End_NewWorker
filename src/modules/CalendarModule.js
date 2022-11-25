import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_SCHEDULE = 'calendar/GET_SCHEDULE';
export const POST_SCHEDULE = 'calendar/POST_SCHEDULE';
export const PATCH_UPDATE_SCHEDULE = 'calendar/PATCH_UPDATE_SCHEDULE';
export const PATCH_DELETE_SCHEDULE = 'calendar/PATCH_DELETE_SCHEDULE';

const actions = createActions({

    [GET_SCHEDULE]: () => {},
    [POST_SCHEDULE]: () => {},
    [PATCH_UPDATE_SCHEDULE]: () => {},
    [PATCH_DELETE_SCHEDULE]: () => {}

});

const calendarReducer = handleActions({

    [GET_SCHEDULE] : (state, { payload }) => {
        return payload;
    },
    [POST_SCHEDULE] : (state, { payload }) => {
        return payload;
    },

    [PATCH_UPDATE_SCHEDULE] : (state, { payload }) => {
        return payload;
    },
    [PATCH_DELETE_SCHEDULE] : (state, { payload }) => {
        return payload;
    }
    },
    initialState
);

export default calendarReducer;

