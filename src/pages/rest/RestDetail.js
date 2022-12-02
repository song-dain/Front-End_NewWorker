import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callRestDetailAPI, callRestUpdateAPI } from '../../api/RestAPICalls';


function RestDetail() {

    const params = useParams();
    const restDetail = useSelector(state => state.restReducer); 
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const [form, setForm] = useState({});
    

    /* 모드구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링시 상세조회 */
    useEffect(()=> {
        dispatch(callRestDetailAPI({
            restNo : params.restNo
        }));
    }, []);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    
    
    //수정모드 변경
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            restNo : restDetail.restNo,
            restCateTypeNo : restDetail.restCateTypeNo,
            restFdate : restDetail.restFdate,
            restLdate : restDetail.restLdate,
            restDay : restDetail.restDay,
            restDate : restDetail.restDate,
            // employeeRestDay : restDetail.employeeRestDay,
            restReason : restDetail.restReason
            
        });
    }

    /* 수정 저장 */
    const onClickRestUpdateHandler = () => {

        console.log('form', form)

        const formData = new FormData();

    
        formData.append("restNo", form.restNo);
        formData.append("restCateTypeNo.restCateTypeNo", form.restCateTypeNo);
        formData.append("restFdate", form.restFdate);
        formData.append("restLdate", form.restLdate);
        formData.append("restDay", form.restDay);
        formData.append("restDate", form.restDate);
        // formData.append("employeeRestDay", form.employeeRestDay);        
        formData.append("restReason", form.restReason);
        
  
        dispatch(callRestUpdateAPI({
            form : formData
        }));

        alert("저장되었습니다.");

        navigate('/rest/list', { replace : true });
        window.location.reload();


    }

    return (
        <div>
           
            <div 
            // className={ ProductRegistrationCSS.productSection }
            >
                
                <div 
                // className={ ProductRegistrationCSS.productInfoDiv }
                >
                    <table>
                        <tbody>
                            <tr>
                            <td><label>휴가종류</label></td>
                            <td>
                                <select name="restCateTypeNo"  
                                onChange={ onChangeHandler } 
                                // value={form.restCateTypeNo}>  
                                value={ (!modifyMode ? restDetail.restCateTypeNo : form.restCateTypeNo) || '' }
                                readOnly={ modifyMode ? false : true }>
                                
                                    <option value={1}>연차</option>
                                    <option value={2}>공가</option>
                                    <option value={3}>병가</option>
                                    <option value={4}>오전반차</option>
                                    <option value={5}>오후반차</option>                                
                                </select>
                            </td>
                       
                        </tr>
                          
                        <tr>
                            <td><label>휴가기간</label></td>
                            <td>
                                <input
                                     type="date"
                                     name='restFdate'
                                     placeholder='휴가시작일'
                                    //  className={ RestFdate }
                                     onChange={ onChangeHandler }
                                     value={ (!modifyMode ? restDetail.restFdate : form.restFdate) || '' }
                                     readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        
                            <td>
                                <input
                                     type="date"
                                     name='restLdate'
                                     placeholder='휴가종료일'
                                    //  className={ RestLdate }
                                     onChange={ onChangeHandler }
                                     value={ (!modifyMode ? restDetail.restLdate : form.restLdate) || '' }
                                     readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>      
                            <td><label>휴가일수</label></td>
                            <td>
                            <input 
                                        placeholder='휴가일수'
                                        type='number'
                                        name='restDay'
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? restDetail.restDay : form.restDay) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        // className={ ProductRegistrationCSS.productInfoInput }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td><label>작성일</label></td>
                            <td>
                                <input
                                    type="date"
                                    name='restDate'
                                    placeholder='작성일'
                                    // className={ RestDate }
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? restDetail.restDate : form.restDate) || '' }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        <tr>                             
                            <td><label>휴가사유</label></td>
                            <td>
                                <input
                                    name='restReason'
                                    placeholder='휴가사유'
                                    // className={ RestReason }
                                    onChange={ onChangeHandler }
                                    value={ (!modifyMode ? restDetail.restReason : form.restReason) || '' }
                                    readOnly={ modifyMode ? false : true }
                                />
                            </td>
                        </tr>
                        
                        </tbody>
                    </table>
                </div>
                <div 
            // className={ ProductRegistrationCSS.productButtonDiv }
            >
                <button
                    onClick={ () => navigate(-1) }
                >
                    돌아가기
                </button>
            {!modifyMode &&
                <button
                    onClick={ onClickModifyModeHandler }
                >
                    수정하기
                </button>
            }
            {modifyMode &&
                <button
                    onClick={ onClickRestUpdateHandler }
                >
                    저장하기

                </button>
            }
            </div>
            </div>

        </div>
    );
    


}

export default RestDetail;