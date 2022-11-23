import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StartCSS from './Start.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import { callStartAPI, callEndAPI } from '../../api/AttAPICalls'



function AttStart() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const att = useSelector(state => state.attReducer);
    const employeeNo = params.employeeNo;

    const [form, setForm] = useState({});

    useEffect( () => {
            if(att.status === 200) {
                console.log("[attStart] 출근 등록 {}", params.attNo);
            }
        }, []
    )

    const onClickStartHandler =()=> {

        dispatch(callStartAPI({	
            form: form
        })); 
        window.location.reload();
    }

    const onChangeHandler =(e)=> {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickEndUpdateHandler =()=> {

        const formData = new FormData();

        formData.append("attNo", form.attNo);
        formData.append("attEnd", form.attEnd);

        dispatch(callEndAPI({	
            form: formData
        })); 
        window.location.reload();
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
                                
                            </div>
                        </div>
                        <div className={ StartCSS.dayBox }>
                            <h3>근무일자 : </h3>
                        </div>
                    </div>
                    <div className={ StartCSS.startEndAndNoBox }>
                        <div className={ StartCSS.startAndEndBox }>
                            <div className={ StartCSS.startBox }>
                                <button
                                    className={ StartCSS.startInputButton } 
                                    onClick={ onClickStartHandler }
                                >
                                    출근
                                </button>
                            </div>
                            <div className={ StartCSS.EndBox}>
                                <input
                                    className={ StartCSS.EndAttNoBox } 
                                    name='attNo'
                                    placeholder='퇴근하려면 근태번호를 입력하세요'
                                    onChange={ onChangeHandler }
                                >
                                </input>
                                <button
                                    className={ StartCSS.endBtn }
                                    onClick={ onClickEndUpdateHandler }
                                >
                                    탈출
                                </button>
                            </div>
                        </div>
                        <div className={ StartCSS.empNoAndSearchbarAndSearchButtonBox }>
                            <div className={ StartCSS.empNoAndSearchbar }>
                                <h3>사원번호 : </h3>
                                <input
                                    name={ att.employeeNo }
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
                    </div>
                </div>
                <div className={ StartCSS.todayAttBox }>
                    <table className={ StartCSS.todayAttTable } border='0.1'>
                        <tbody>
                            <tr>
                                <td>사원아이디</td>
                                <td>사원 이름</td>
                                <td>출근시간</td>
                                <td>퇴근시간</td>
                                <td>근무시간</td>
                            </tr>
                            <tr>
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