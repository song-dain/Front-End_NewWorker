import { callScheduleDetailAPI, callDeleteScheduleAPI } from "../../api/CalendarAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function ScheduleDetailModal({clickEventId, setScheduleDetailModal}){

    const dispatch = useDispatch();
    const calendarEvent = useSelector(state => state.calendarReducer);

    useEffect(
        () => {
            dispatch(callScheduleDetailAPI({
                scheduleNo : clickEventId
            }));
        }
        , []
    )

    const onClickDeleteBtnHandler = () => {

        dispatch(callDeleteScheduleAPI({ calendarNo : clickEventId }));
        window.location.reload();
    }

    return(
        <>
            ScheduleDetailModal
            <button
                onClick={ () => setScheduleDetailModal(false) }
            >X</button>
                <input value={calendarEvent.scheduleTitle || ''}/>
                <input value={calendarEvent.startDate || ''}/>
                <input value={calendarEvent.endDate || ''}/>
                <input value={calendarEvent.scheduleLocation || ''}/>
                <input value={calendarEvent.scheduleContent || ''}/>
            <button>수정</button>
            <button 
                onClick={ () => onClickDeleteBtnHandler() }
            >삭제</button>
        </>
    );
}

export default ScheduleDetailModal;