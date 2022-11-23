import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";
import messageReducer from "./MessageModule";
import noticeReducer from "./NoticeModule";
import attReducer from "./AttModule";

const rootReducer = combineReducers({

    employeeReducer,
    messageReducer,
    noticeReducer,
    attReducer

});

export default rootReducer;