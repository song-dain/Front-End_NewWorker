import { callScheduleDetailAPI, callDeleteScheduleAPI } from "../../api/CalendarAPICalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function ScheduleDetailModal({clickEventId, setScheduleDetailModal}){

    const dispatch = useDispatch();
    const calendarEvent = useSelector(state => state.calendarReducer);
    const [modifyMode, setModifyMode] = useState(false);

    useEffect(
        () => {
            dispatch(callScheduleDetailAPI({
                scheduleNo : clickEventId
            }));
        }
        , []
    )

    /* 일정 수정 */
    const onClickUpdateBtnHandler = () => {
        setModifyMode(true);
    }

    /* 일정 삭제 */
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
                <input 
                    value={ calendarEvent.scheduleTitle || ''}
                    disabled={ !modifyMode }
                />
                <input 
                    value={calendarEvent.startDate || ''}
                    disabled={ !modifyMode }
                />
                <input 
                    value={calendarEvent.endDate || ''}
                    disabled={ !modifyMode }
                />
                <input 
                    value={calendarEvent.scheduleLocation || ''}
                    disabled={ !modifyMode }
                />
                <input 
                    value={calendarEvent.scheduleContent || ''}
                    disabled={ !modifyMode }
                />
            <button
                onClick={ () => onClickUpdateBtnHandler() }
            >수정</button>
            <button 
                onClick={ () => onClickDeleteBtnHandler() }
            >삭제</button>
        </>
    );
}

export default ScheduleDetailModal;