import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";
import messageReducer from "./MessageModule";
import noticeReducer from "./NoticeModule";
import attReducer from "./AttModule";
import calendarReducer from "./CalendarModule";
import surveyReducer from "./SurveyModule";

const rootReducer = combineReducers({

    employeeReducer,
    messageReducer,
    noticeReducer,
    attReducer,
    calendarReducer,
    surveyReducer

});

export default rootReducer;