import CalendarCSS from "../calendar/CalendarCSS.module.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSelectOfficeCalendarAPI } from "../../api/CalendarAPICalls";
import ScheduleDetailModal from "../../components/calendar/ScheduleDeatilModal";

function Calendar(){

    const dispatch = useDispatch();
    const calendarEvent = useSelector(state => state.calendarReducer);
    const scheduleList = calendarEvent.scheduleList;
    const dayOffList = calendarEvent.dayOffList;
    const [scheduleDetailModal, setScheduleDetailModal] = useState(false);
    const [clickEventId, setClickEventId] = useState(0);

    const scheduleEvents = 
        Array.isArray(scheduleList) && scheduleList.map((item) => ({
            title: item.scheduleTitle,
            start: item.startDate,
            end: item.endDate,
            id: item.calendarNo
        }));

    const dayOffEvents = 
        Array.isArray(dayOffList) && dayOffList.map((item) => ({
            title: item.restCateTypeNo.restCateType,
            start: item.restFdate,
            end: item.restLdate,
            id: item.restNo
        }));

    const events = Array.isArray(scheduleList) && Array.isArray(dayOffEvents) && scheduleEvents.concat(dayOffEvents) 
        || Array.isArray(scheduleList) && scheduleEvents
        || Array.isArray(dayOffEvents) && dayOffEvents;

    const filterList = [
        { id: 0, value: "내 일정", name: "mySchedule" },
        { id: 1, value: "연차", name: "dayOff" },
        { id: 2, value: "부서 일정", name: "deptSchedule" },
        { id: 3, value: "전사 일정", name: "comSchedule" }
    ];

    const [ filter, setFilter ] = useState({
        mySchedule : "",
        dayOff : "",
        deptSchedule : "",
        comSchedule : ""
    });

    useEffect(
        () => {
            dispatch(callSelectOfficeCalendarAPI({
                form : filter
            }));
        }
        , [filter]
    )


    const checkedItemHandler = (e) => {
        
        if(e.target.checked){
            setFilter({
                ...filter,
                [e.target.name] : e.target.name
            });
        } else {
            setFilter({
                ...filter,
                [e.target.name] : ""
            });
        }
    }

    const onClickScheduleHandler = (e) => {

        console.log('클릭 이벤트 동작 체크');
        console.log(e);

        if(e.event._def.title != "연차" || "공가" || "병가" || "오전반차" || "오후반차"){
            setScheduleDetailModal(true);
            setClickEventId(e.event._def.publicId);
        }

    }

    return(
        <>
            { scheduleDetailModal ? 
                <ScheduleDetailModal
                    clickEventId={clickEventId}
                    setScheduleDetailModal={setScheduleDetailModal}
                /> : null }
            <div className={CalendarCSS.box}>
                {
                    filterList.map((item, idx) => {
                        return (
                            <label key={idx}>
                                <input
                                    key={item.id}
                                    type="checkbox"
                                    name={item.name}
                                    onChange=
                                        { e => 
                                            { checkedItemHandler(e) }
                                        }
                                />
                            <span>{item.value}</span>
                            </label>
                        );
                    })
                }

                <FullCalendar 
                    defaultView="dayGridMonth" 
                    plugins={[ dayGridPlugin ]}
                    events={events}
                    eventClick={ e => { onClickScheduleHandler(e) } }
                />

            </div>
        </>
    );
}

export default Calendar;