import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StartCSS from './Start.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { callStartAPI, callEndAPI } from '../../api/AttAPICalls';
import Clock from './Clock';
import { Container } from '@mui/system';



function AttStart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const att = useSelector(state => state.attReducer);
    const attNo = params.attNo;
    //const result = result.data;

    const [form, setForm] = useState({
        attNo : att.attNo,
        attStart : att.attStart,
        attEnd : null,
        attDate : null,
        attTypeNo : att.attTypeNo,
        employee : att.employee,
        attWorkTime : null,
        attMonth : null,
        attWtms : null
    });

    // const [end, setEnd] = useState({
    //     attNo : result.data.att.attNo,
    //     attStart : result.data.att.attStart,
    //     attEnd : null,
    //     attDate : null,
    //     attTypeNo : result.data.att.attTypeNo,
    //     employee : result.data.att.employee,
    //     attWorkTime : null,
    //     attMonth : null,
    //     attWtms : null
    // })

    useEffect( () => {
            if(att.status === 200) {
                console.log("[attStart] 출근 등록 {}", params.attNo);
            }
            
        }, []
    )

    const onClickStartHandler =()=> {

        dispatch(callStartAPI()); 
        //window.location.reload();
    }

    const onChangeHandler =(e)=> {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    

    const onClickEndUpdateHandler =(e)=> {
        const { result } = e.target;
        dispatch(callEndAPI({	
            // attNo : att.attNo,
            // attStart : att.attStart
        })); 
        //window.location.reload();
    }

    const onClickDaySearchHandler =()=> {}

    return (
        <div className={ StartCSS.backgroundDiv }>
            <div className={ StartCSS.attStartWrapperDiv }>
                <div className={ StartCSS.headMessageDiv }>
                    <h1>일일 근태 등록</h1>
                </div>
                <div className={ StartCSS.inputBoxDiv }>
                    <div className={ StartCSS.clockAndDayBox }>
                        <div className={ StartCSS.clockBox }>
                            <h3>현재시간 : </h3>
                            <div className="clock">
                                <Clock/>
                            </div>
                        </div>
                        <div className={ StartCSS.dayBox }>
                            <h3>근무일자 : </h3>
                        </div>
                    </div>
                    <container className={ StartCSS.startEndAndNoBoxContainer }>
                        <div className={ StartCSS.startAndEndBox }>
                            <div className={ StartCSS.startBox }>
                                <button
                                    className={ StartCSS.startBtn } 
                                    onClick={ onClickStartHandler }
                                >
                                    출근
                                </button>
                            </div>
                            <div className={ StartCSS.EndBox}>
                                {/* <input
                                    className={ StartCSS.EndAttNoBox } 
                                    name='attNo'
                                    placeholder='근태번호'
                                    onChange={ onChangeHandler }
                                >
                                </input>
                                <input
                                    className={ StartCSS.EndAttNoBox } 
                                    name='attStart'
                                    placeholder='출근시간'
                                    onChange={ onChangeHandler }
                                >
                                </input> */}
                                <button
                                    className={ StartCSS.endBtn }
                                    onClick={ onClickEndUpdateHandler }
                                >
                                    퇴근
                                </button>
                            </div>
                        </div>
                        <div className={ StartCSS.empNoAndSearchbarAndSearchButtonBox }>
                            <div className={ StartCSS.empNoAndSearchbar }>
                                <p>관리자용</p>
                                <h3>근태번호 : </h3>
                                <input
                                    name={ att.attNo }
                                />
                            </div>
                            <div className={ StartCSS.searchButton }>
                                <button
                                    onClick={ onClickDaySearchHandler }
                                >
                                    검색
                                </button>
                            </div>
                        </div>
                    </container>
                </div>
                <div className={ StartCSS.todayAttBox }>
                    <table className={ StartCSS.todayAttTable } border='1'>
                        <tbody>
                            <tr>
                                <td>근태번호</td>
                                <td>사원아이디</td>
                                <td>사원 이름</td>
                                <td>출근시간</td>
                                <td>퇴근시간</td>
                                <td>근무시간</td>
                            </tr>
                            <tr>
                                <td>{ att.attNo }</td>
                                <td>{ att.employeeNo || '' }</td>
                                <td>{ att.employeeName || '' }</td>
                                <td>{ att.attStart || '' }</td>
                                <td>{ att.attEnd || '' }</td>
                                <td>{ att.attWtms || '' }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

    
}

export default AttStart;