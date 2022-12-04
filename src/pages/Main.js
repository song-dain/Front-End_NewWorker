import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainCSS from "./Main.module.css";
import { callUnreadMessageAPI } from "../api/MessageAPICalls";
import { callTodayScheduleAPI } from "../api/CalendarAPICalls";
import Clock from "../components/main/Clock";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

function Main() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unread = useSelector(state => state.messageReducer);
    const calendarEvent = useSelector(state => state.calendarReducer);
    const scheduleList = calendarEvent.todaySchedule;
    const dayOffList = calendarEvent.todayDayOff;
    const header = {
        start: "title"
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

    useEffect(() => {
        const isLogin = window.localStorage.getItem('accessToken');
        // 로그인 되어 있지 않으면 로그인 화면으로 보내기 
        // 시간까지 확인해서 유효성 확인하는게 좋음
        if(!isLogin) {
            navigate('login', { replace : true });
        }

        dispatch(callUnreadMessageAPI());

        dispatch(callTodayScheduleAPI());

    }, []
    );

    const onClickUnreadMessage = () => {
        navigate('/message/receive', { replace : true });
    }

    return(
        <div className={MainCSS.main}>
           <div
                className={MainCSS.unreadMessage}
                onClick={ () => onClickUnreadMessage() }
           >읽지 않은 메시지가 <span className={MainCSS.unreadNum}>{unread.unreadMessage}</span> 건 있습니다.</div>
            {/* <Clock/> */}
            <br/>
            <div className={MainCSS.calendarContainer}>
                <FullCalendar 
                    className="fullcalendar"
                    defaultView="dayGridMonth" 
                    headerToolbar={header}
                    plugins={[ dayGridPlugin, timeGridPlugin, listPlugin  ]}
                    height='900px'
                    events={events}
                />
            </div>
        </div>
        
    );
}

export default Main; 