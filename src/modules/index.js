import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";
import messageReducer from "./MessageModule";
import noticeReducer from "./NoticeModule";
import attReducer from "./AttModule";
import calendarReducer from "./CalendarModule";

const rootReducer = combineReducers({

    employeeReducer,
    messageReducer,
    noticeReducer,
    attReducer,
    calendarReducer

});

export default rootReducer;