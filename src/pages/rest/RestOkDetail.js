import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callRestOkDetailAPI, callRestOkButtonAPI, callRestNoButtonAPI } from '../../api/RestAPICalls';



function RestOkDetail() {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const restOk = useSelector(state => state.restReducer); 
    const restOkDetail = restOk.data;

    const [form, setForm] = useState({});

    

    

 

    /* 최초 랜더링시 상세조회 */
    useEffect(()=> {
        dispatch(callRestOkDetailAPI({
            restNo : params.restNo
        }));
    }, []);
   
    //승인버튼
    const onClickRestOkHandler = () => {
        dispatch(callRestOkButtonAPI({
            restNo: restOk.restNo
        }));
        alert("승인완료")
        navigate(`/rest/list/admin`, { replace: true});
        window.location.reload();
    }
    
    //반려버튼
    const onClickRestNoHandler = () => {
        dispatch(callRestNoButtonAPI({
            restNo: restOk.restNo
        }));
        alert("반려완료")
        navigate(`/rest/list/admin`, { replace: true});
        window.location.reload();
    }
    
    
    if(restOk) {
        var str = restOk?.restFdate;
        str += " ~ ";
        str += restOk?.restLdate;
    }
    return (
        <div>
            <div 
            // className={ ProductRegistrationCSS.productButtonDiv }
            >
                <button
                    onClick={ () => navigate(-1) }
                >
                    돌아가기
                </button>
            
            </div>
            <div 
            // className={ ProductRegistrationCSS.productSection }
            >
                
                <div 
                // className={ ProductRegistrationCSS.productInfoDiv }
                > 
                    <table>{restOk.employeeNo && ( 
                        <tbody>

                            <tr>
                            <td><label>사원명</label></td>
                            <td>
                                <input
                                name='employeeNo.employeeName'
                               
                                readOnly={true}                               
                                value={restOk.employeeNo.employeeName ||''}
                               
                                
                                />                 
                                    
                            </td>
                        </tr>
                    
                          
                        <tr>
                            <td><label>휴가기간</label></td>
                            <td>
                                <input
                                  
                                     name='str'
                                     placeholder='휴가시작일'
                                     value={str}
                                     readOnly = {true}
                                    
                                />
                            </td>

                        </tr>
                        <tr>      
                        <td><label>휴가종류</label></td>
                            <td>
                                <select name="restCateTypeNo"  
                                // onChange={ onChangeHandler } 
                                value={restOk.restCateTypeNo}
                                readOnly = {true}
                                >  {/*className={ RestCateTypeNo }*/}
                                    <option value={1}>연차</option>
                                    <option value={2}>공가</option>
                                    <option value={3}>병가</option>
                                    <option value={4}>오전반차</option>
                                    <option value={5}>오후반차</option>     
                                                               
                                </select>
                            </td>
                        </tr>
                                       
                        <tr>      
                            <td><label>휴가일수</label></td>
                            <td>
                            <input 
                                        placeholder='휴가일수'
                                        type='number'
                                        name='restDay'
                                        value={restOk.restDay}
                                        readOnly = {true}
                                        // onChange={ onChangeHandler }
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
                                    value={restOk.restDate}
                                    readOnly = {true}
                                    // className={ RestDate }
                                    // onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                      
                        <tr>                             
                            <td><label>휴가사유</label></td>
                            <td>
                                <input
                                    name='restReason'
                                    placeholder='휴가사유'
                                    value={restOk.restReason}
                                    readOnly = {true}
                                    // className={ RestReason }
                                    // onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                                                                   
                        </tbody>    )}
                    </table>
                

                    {/* 버튼 */}
                    <button
                    // onClick={ () => onClickRestOkHandler()  }
                    onClick={ onClickRestOkHandler }
                >
                    승인
                </button>
                <button
                    onClick={ () => navigate(-1) }
                >
                    목록으로
                </button>
                <button
                    onClick={ onClickRestNoHandler }
                >
                    반려
                </button>
                </div>
            </div>

        </div>
    );

    
}

    


export default RestOkDetail;