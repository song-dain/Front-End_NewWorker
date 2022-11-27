import NewScheduleCSS from "../calendar/NewScheduleCSS.module.css";
import { callEmployeeInfoAPI } from '../../api/EmployeeAPICalls';
import { callAddScheduleAPI } from '../../api/CalendarAPICalls'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from "react-router-dom";


function NewSchedule() {

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    
    if(isLogin) {
            const temp = decodeJwt(isLogin);
            decoded = temp.auth[0];
    }

    const emp = useSelector(state => state.EmployeeReducer);

    const dispatch = useDispatch();
    const [newSchedule, SetNewSchedule] = useState({
        calendarCategory : {
            calendarCategoryName : ""
        },
        scheduleTitle : "",
        startDate : "",
        endDate : "",
        scheduleLocation : "",
        scheduleContent : ""
    });

    useEffect(
        () => {
            dispatch(callEmployeeInfoAPI());
        }
        , []

        )
    const [allDayBtn, setAllDayBtn] = useState(false);
    const onClickAllDayBtn = () => {}

    const onChangeHandler = (e) => {
        SetNewSchedule({
            ...newSchedule,
            [e.target.name]: e.target.value
        });
        console.log(newSchedule);
    };

    const onClickAddBtn = () => {
        dispatch(callAddScheduleAPI({form : newSchedule}))

        navigate(`/calendar`, { replace : false });
    }

    return(
        <>
            <div className={NewScheduleCSS.box}>
                새 일정 추가
                <select name='calendarCategory.calendarCategoryName' onChange={ e => onChangeHandler(e) }>
                    <option>내 일정</option>
                    {
                        // (emp.position.positionNo < 212) &&
                        <option>부서 일정</option>
                    }
                    { decoded == "ROLE_ADMIN" && <>
                        <option>전사 일정</option>
                    </> }
                </select>
                <input
                    name='scheduleTitle'
                    placeholder="일정 제목"
                    onChange={ e => onChangeHandler(e) }
                /><br/>
                시작일
                <input
                    name='startDate'
                    type='date'
                    onChange={ e => onChangeHandler(e) }
                />
                종료일
                <input
                    name='endDate'
                    type='date'
                    onChange={ e => onChangeHandler(e) }
                />
                하루종일
                <input
                    type="checkbox"
                    onClick={ () => onClickAllDayBtn() }
                /><br/>
                <input
                    name="scheduleLocation"
                    placeholder="일정 장소"
                    onChange={ e => onChangeHandler(e) }
                />
                <textarea 
                    name="scheduleContent"
                    placeholder="일정 내용을 입력하세요"
                    onChange={ e => onChangeHandler(e) }
                />
                <button onClick={ () => onClickAddBtn() }>추가</button>
                <button onClick={ () => navigate(-1) } >취소</button>
            </div>

        </>
    );

}

export default NewSchedule;