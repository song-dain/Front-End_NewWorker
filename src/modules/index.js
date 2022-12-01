import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";
import messageReducer from "./MessageModule";
import noticeReducer from "./NoticeModule";
import attReducer from "./AttModule";
import calendarReducer from "./CalendarModule";
import surveyReducer from "./SurveyModule";
import approvalReducer from "./ApprovalModule";
import restReducer from "./RestModule";

const rootReducer = combineReducers({

    approvalReducer,
    employeeReducer,
    messageReducer,
    noticeReducer,
    attReducer,
    calendarReducer,
    surveyReducer,
    restReducer

});

export default rootReducer;