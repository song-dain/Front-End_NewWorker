import EmpCalendar from "../../components/calendar/EmpCalendar";
import CalendarCSS from "../calendar/CalendarCSS.module.css";

function Calendar(){

    return(
        <>
            <div className={CalendarCSS.box}>
                <EmpCalendar/>
            </div>
        </>
    );
}

export default Calendar;