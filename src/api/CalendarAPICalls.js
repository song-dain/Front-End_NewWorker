import { POST_SCHEDULE, GET_SCHEDULE, POST_ADD_SCHEDULE, PATCH_UPDATE_SCHEDULE, PATCH_DELETE_SCHEDULE } from '../modules/CalendarModule';

export const callSelectOfficeCalendarAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/calendar/schedule`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                mySchedule : form.mySchedule,
                dayOff : form.dayOff,
                deptSchedule : form.deptSchedule,
                comSchedule : form.comSchedule
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log(result);
            dispatch({ type: POST_SCHEDULE, payload: result.data });
        }
    }
}

export const callScheduleDetailAPI = ({scheduleNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/calendar/schedule/${scheduleNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log(result);
            dispatch({ type: GET_SCHEDULE, payload: result.data });
        }
    }
}

export const callAddScheduleAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/calendar/schedule/add`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                calendarCategory : {
                    calendarCategoryName : form.calendarCategory.calendarCategoryName
                },
                scheduleTitle : form.scheduleTitle,
                startDate : form.startDate,
                endDate : form.endDate,
                startTime : form.startTime,
                scheduleLocation : form.scheduleLocation,
                scheduleContent : form.scheduleContent
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: POST_ADD_SCHEDULE, payload: result.data });
        }
    }
}

export const callUpdateScheduleAPI = ({form, scheduleNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/calendar/schedule/update/${scheduleNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify({
                calendarCategory : {
                    calendarCategoryName : form.calendarCategory.calendarCategoryName
                },
                scheduleTitle : form.scheduleTitle,
                startDate : form.startDate,
                endDate : form.endDate,
                startTime : form.startTime,
                scheduleLocation : form.scheduleLocation,
                scheduleContent : form.scheduleContent
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: PATCH_UPDATE_SCHEDULE, payload: result.data });
        }
    }
}

export const callDeleteScheduleAPI = ({scheduleNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/emp/calendar/schedule/delete/${scheduleNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: PATCH_DELETE_SCHEDULE, payload: result.data });
        }
    }
}