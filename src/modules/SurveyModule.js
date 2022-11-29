import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SURVEY     = 'survey/GET_SURVEY';
export const GET_SURVEYS    = 'survey/GET_SURVEYS';
export const POST_SURVEY    = 'survey/POST_SURVEY';
export const PUT_SURVEY     = 'survey/PUT_SURVEY';

const actions = createActions({
    [GET_SURVEY]: () => {},
    [GET_SURVEYS]: () => {},
    [POST_SURVEY]: () => {},
    [PUT_SURVEY]: () => {}
});

/* 리듀서 */
const surveyReducer = handleActions(
    {
        [GET_SURVEY]: (state, { payload }) => {
            
            return payload;
        },
        [GET_SURVEYS]: (state, { payload }) => {
            
            return payload;
        },
        [POST_SURVEY]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_SURVEY]: (state, { payload }) => {
            
            return payload;
        }
    },
    initialState
);

export default surveyReducer;
