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

    /* 일정 수정 모드로 변경 */
    const onClickUpdateBtnHandler = () => {
        setModifyMode(true);
    }

    /* 수정 일정 입력 */
    const onChangeHandler = () => {
        console.log('수정 모드');
    }

    /* 일정 삭제 */
    const onClickDeleteBtnHandler = () => {

        dispatch(callDeleteScheduleAPI({ calendarNo : clickEventId }));
    }

    return(
        <>
            ScheduleDetailModal
            <button
                onClick={ () => setScheduleDetailModal(false) }
            >X</button>
                <input 
                    value={ calendarEvent.scheduleTitle || ''}
                    readOnly={ modifyMode ? false : true }
                    placeholder='일정 타이틀'
                    onChange={ onChangeHandler() }

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