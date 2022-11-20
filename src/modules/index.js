import { combineReducers } from "redux";
import employeeReducer from "./EmployeeModule";

const rootReducer = combineReducers({

    employeeReducer,

});

export default rootReducer;