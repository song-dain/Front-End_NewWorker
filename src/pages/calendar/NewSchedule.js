import NewScheduleCSS from "../calendar/NewScheduleCSS.module.css";
import { callEmployeeInfoAPI } from '../../api/EmployeeAPICalls';
import { callAddScheduleAPI } from '../../api/CalendarAPICalls'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from "react-router-dom";


function NewSchedule() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginEmp = useSelector(state => state.employeeReducer);
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    const [allDayBtn, setAllDayBtn] = useState(false);
    let todayfull = new Date();
    let year = todayfull.getFullYear();
    let month = ("0" + (1 + todayfull.getMonth())).slice(-2);
    let day = ("0" + todayfull.getDate()).slice(-2);
    const today = year + "-" + month + "-" + day;

    const [newSchedule, SetNewSchedule] = useState({
        calendarCategory : {
            calendarCategoryName : ""
        },
        scheduleTitle : "",
        startDate : "",
        endDate : "",
        startTime : "",
        scheduleLocation : "",
        scheduleContent : ""
    });

    useEffect(
        () => {
            dispatch(callEmployeeInfoAPI());
        }
        , []
    )

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0];
    }

    /* 일정 입력 */
    const onChangeHandler = (e) => {
        SetNewSchedule({
            ...newSchedule,
            [e.target.name]: e.target.value
        });
    };

    /* slect 선택 */
    const onSelectChangeHandler = (e) => {
        SetNewSchedule({
            ...newSchedule,
            calendarCategory : {
                calendarCategoryName : e.target.value
            }
        });
    };

    /* 일정 등록 */
    const onClickAddBtn = () => {

        if(newSchedule.calendarCategory.calendarCategoryName == ''){
            alert('일정 카테고리를 선택해주세요.');
            return;
        }

        if(newSchedule.scheduleTitle == ''){
            alert('일정 타이틀을 입력해주세요.');
            return;
        }

        if(newSchedule.startDate == ''){
            alert('일정 시작 날짜를 입력해주세요.');
            return;
        }

        if(newSchedule.endDate == ''){
            alert('일정 종료 날짜를 입력해주세요.');
            return;
        }

        if(newSchedule.startTime == ''){
            alert('일정 시작 시간을 입력해주세요.');
            return;
        }

        dispatch(callAddScheduleAPI({form : newSchedule}))
        alert('일정이 추가되었습니다.');
        navigate('/calendar', { replace : false })
    };

    return(
        <>
            <div className={NewScheduleCSS.box}>
                <div className={NewScheduleCSS.title}>새 일정 추가</div>
                <select 
                    className={NewScheduleCSS.category}
                    onChange={ e => onSelectChangeHandler(e) }>
                    <option>일정 선택</option>
                    <option>내 일정</option>
                    { loginEmp.position ? loginEmp.position.positionNo > 211 && <option>부서 일정</option> : <option>부서일정오락가락</option> }
                    { decoded == "ROLE_ADMIN" && <option>전사 일정</option> }
                    
                </select>
                <input
                    className={NewScheduleCSS.stitle}
                    name='scheduleTitle'
                    placeholder="일정 제목"
                    onChange={ e => onChangeHandler(e) }
                /><br/>
                <span className={NewScheduleCSS.sdtitle}>시작일</span>
                <input
                    className={NewScheduleCSS.startDate}
                    name='startDate'
                    type='date'
                    readOnly={allDayBtn}
                    onChange={ e => onChangeHandler(e) }
                />
                <span className={NewScheduleCSS.edtitle}>종료일</span>
                <input
                    className={NewScheduleCSS.endDate}
                    name='endDate'
                    type='date'
                    min={newSchedule.startDate}
                    readOnly={allDayBtn}
                    onChange={ e => onChangeHandler(e) }
                />
                <span className={NewScheduleCSS.stimetitle}>시간</span>
                <input 
                        className={NewScheduleCSS.stime}
                        type='time'
                        name='startTime'
                        onChange={ e => onChangeHandler(e) }
                />
                <input
                    className={NewScheduleCSS.location}
                    name="scheduleLocation"
                    placeholder="일정 장소"
                    onChange={ e => onChangeHandler(e) }
                />
                <textarea 
                    className={NewScheduleCSS.content}
                    name="scheduleContent"
                    placeholder="일정 내용을 입력하세요"
                    onChange={ e => onChangeHandler(e) }
                /><br/>
                <div className={NewScheduleCSS.btn}>
                    <button className={NewScheduleCSS.addBtn} onClick={ () => onClickAddBtn() }>추가</button>
                    <button className={NewScheduleCSS.cancelBtn} onClick={ () => navigate(-1) } >취소</button>
                </div>
            </div>
        </>
    );

}

export default NewSchedule;

