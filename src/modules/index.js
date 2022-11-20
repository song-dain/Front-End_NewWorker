import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";
import messageReducer from "./MessageModule";

const rootReducer = combineReducers({

    employeeReducer,
    messageReducer

});

export default rootReducer;