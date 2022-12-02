import CalendarCSS from "../calendar/CalendarCSS.module.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
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
    const header = {
        start: "",
        center: "prev title next",
        end: "today",
    }

    const scheduleEvents = 
        Array.isArray(scheduleList) && scheduleList.map((item) => ({
            title: item.startTime != null ? `AD | ${item.scheduleTitle}` : `${item.startTime} | ${item.scheduleTitle}`,
            start: item.startDate,
            end: item.endDate,
            id: item.calendarNo,
            color: item.calendarCategory.calendarCategoryName == '내 일정' ? '#5ec0fd' : item.calendarCategory.calendarCategoryName == '부서 일정' ? '#D8F0FF' : '#FFF176',
            textColor: '#000000'
        }));

    const dayOffEvents = 
        Array.isArray(dayOffList) && dayOffList.map((item) => ({
            title: '● ' + item.restCateTypeNo.restCateType,
            start: item.restFdate,
            end: item.restLdate,
            id: item.restNo,
            color: '#ffffff',
            textColor: '#0C9200'
        }));

    const events = Array.isArray(scheduleList) && Array.isArray(dayOffEvents) && scheduleEvents.concat(dayOffEvents) 
        || Array.isArray(scheduleList) && scheduleEvents
        || Array.isArray(dayOffEvents) && dayOffEvents;

    const filterList = [
        { id: 0, name: "mySchedule", value: "내 일정" },
        { id: 1, name: "dayOff", value: "연차" },
        { id: 2, name: "deptSchedule", value: "부서 일정" },
        { id: 3, name: "comSchedule", value: "전사 일정" }
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
                [e.target.name] : e.target.value
            });
        } else {
            setFilter({
                ...filter,
                [e.target.name] : ""
            });
        }
    }

    const onClickScheduleHandler = (e) => {

        console.log(e.event._def.title);

        if(e.event._def.title !== "연차" || e.event._def.title !== "공가" 
        || e.event._def.title !== "병가" || e.event._def.title !== "오전반차" || e.event._def.title !== "오후반차"){
            setScheduleDetailModal(true);
            setClickEventId(e.event._def.publicId);
        } else {
            setScheduleDetailModal(false);
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
                <div className={CalendarCSS.categoryBtn}>
                {
                    filterList.map((item, idx) => {
                        return (
                            <label key={idx}>
                                <input
                                    className={CalendarCSS.checkbox}
                                    key={item.id}
                                    type="checkbox"
                                    name={item.name}
                                    value={item.value}
                                    onChange=
                                        { e => 
                                            { checkedItemHandler(e) }
                                        }
                                />
                            <span> {item.value}　</span>
                            </label>
                        );
                    })
                }
                </div>
                <div className={CalendarCSS.container}>
                <FullCalendar 
                    className="fullcalendar"
                    defaultView="dayGridMonth" 
                    plugins={[ dayGridPlugin, timeGridPlugin, listPlugin  ]}
                    height='900px'
                    events={events}
                    eventClick={ e => { onClickScheduleHandler(e) } }
                />
            </div>
            </div>
        </>
    );
}

export default Calendar;