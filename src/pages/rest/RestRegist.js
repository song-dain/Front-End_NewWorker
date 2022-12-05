import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callRestRegistAPI } from '../../api/RestAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';

import { useNavigate, useLocation } from 'react-router-dom';



function RestRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rest = useSelector(state => state.restReducer);
  

    const [form, setForm] = useState({

        employeeNo: rest.employeeNo,
        restCateTypeNo: '',
        restFdate: '',
        restLdate: '',
        restDay: 0,
        restDate: '',
        restReason: ''

    });

    const token = decodeJwt(window.localStorage.getItem('accessToken'));

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form, //기존의 값들은 모두 남겨놓되
            [e.target.name]: e.target.value //현재 변화가 있는 값들만 업데이트
        });
    }




    const onClickRestRegistHandler = () => {

        const formData = new FormData();

        formData.append("restCateTypeNo.restCateTypeNo", form.restCateTypeNo);
        formData.append("restFdate", form.restFdate);
        formData.append("restLdate", form.restLdate);
        formData.append("restDay", form.restDay);
        formData.append("restDate", form.restDate);
        formData.append("restReason", form.restReason);



        console.log("form :", form);
        console.log("formData : ", formData);

        dispatch(callRestRegistAPI({
            form: formData
        }));

        alert("휴가신청이 완료되었습니다.");

        navigate('/rest/list', { replace : true });
        window.location.reload();

    }


    const onClickBackHandler = () => {
        navigate('/', { replace: true });
    }



    return (

       

        <div>

            <div>
                
                
                <h3>휴가종류</h3>
                        <select name="restCateTypeNo" onChange={onChangeHandler} value={form.restCateTypeNo}>  {/*className={ RestCateTypeNo }*/}
                            <option value={1}>연차</option>
                            <option value={2}>공가</option>
                            <option value={3}>병가</option>
                            <option value={4}>오전반차</option>
                            <option value={5}>오후반차</option>
                        </select>

                    <br />


                    <h3>휴가기간</h3>
                        <input
                            type="date"
                            name='restFdate'
                            placeholder='휴가시작일'
                            //  className={ RestFdate }
                            onChange={onChangeHandler}
                        />
                    ~
                        <input
                            type="date"
                            name='restLdate'
                            placeholder='휴가종료일'
                            //  className={ RestLdate }
                            onChange={onChangeHandler}
                        />
                    <br />
                    <h3>휴가일수</h3>
                        <input
                            placeholder='휴가일수'
                            type='number'
                            name='restDay'
                            onChange={onChangeHandler}
                        // className={ ProductRegistrationCSS.productInfoInput }
                        />
                    <br />
                    <h3>작성일</h3>
                        <input
                            type="date"
                            name='restDate'
                            placeholder='작성일'
                            // className={ RestDate }
                            onChange={onChangeHandler}
                        />
                    <br />
                    <h3>휴가사유</h3>
                        <input
                            name='restReason'
                            placeholder='휴가사유'
                            // className={ RestReason }
                            onChange={onChangeHandler}
                        />
                    <br />


                    <br /><br />
                    <button
                        onClick={onClickRestRegistHandler}
                    // className={ RestRegistButton }

                    >
                        휴가 등록
                    </button>
                    <br />
                    <button
                        onClick={onClickBackHandler}
                    // className={ RestRegistBack }     
                    >
                        메인으로
                    </button>
            </div>
        </div>
    );
}



export default RestRegist;











