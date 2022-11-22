import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";
import messageReducer from "./MessageModule";
import noticeReducer from "./NoticeModule";

const rootReducer = combineReducers({

    employeeReducer,
    messageReducer,
    noticeReducer

});

export default rootReducer;