import EmployeeRegistCSS from './EmployeeRegist.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callEmployeeRegistAPI } from '../../api/EmployeeAPICalls';

function EmployeeRegist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({

       employeeId : '',
       employeePwd : '',
       employeeName : '',
       employeeEmail : '',
       employeePhone : '',
       employeeAddress : '',
       positionNo : 211,
       depNo : 10,
       employeeRestDay : 0,
       employeeHireDate : 0,
    });

    useEffect(() => {

        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => { 
                const { result } = e.target;
                if(result){
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]);

    /* 입력 양식의 값 변경될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form, //기존의 값들은 모두 남겨놓되
            [e.target.name] : e.target.value //현재 변화가 있는 값들만 업데이트
        })
    }

    /* 이미지 첨부 버튼 클릭 이벤트 */
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    /* 파일 첨부 시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    }

    const onClickEmployeeRegistHandler = () => {

        const formData = new FormData();

        formData.append("employeeName", form.employeeName);
        formData.append("employeeId", form.employeeId);
        formData.append("employeePwd", form.employeePwd);
        formData.append("employeeEmail", form.employeeEmail);
        formData.append("employeePhone", form.employeePhone);
        formData.append("employeeAddress", form.employeeAddress);
        
        formData.append("position.positionNo", form.positionNo);
        formData.append("dep.depNo", form.depNo);

        formData.append("employeeRestDay", form.employeeRestDay);
        formData.append("employeeHireDate", form.employeeHireDate);


        if(image) {
            formData.append("employeeImage", image);
        }

        console.log("form :", form);
        console.log("formData : ", formData);

        dispatch(callEmployeeRegistAPI({
            form : formData
        }));
            
        
    }
    

    const onClickBackHandler = () => {
        navigate('/', {replace : true});
    }



    return (

        <div>
                <div className={ EmployeeRegistCSS.ImageDiv }>
                    { imageUrl && <img
                        className = { EmployeeRegistCSS.employeeImageDiv }
                        src={ imageUrl }
                        alt="preview"
                    />}
                    <input
                        type="file"
                        name='employeeImage'
                        accep='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ imageInput }
                    />
                    <button
                        className={ EmployeeRegistCSS.employeeImageButton }
                        onClick={ onClickImageUpload }
                    >
                        이미지 업로드
                    </button>
                </div>
            <div className={ EmployeeRegistCSS.RegistDiv }>
                <table>
                    <tbody>
                        <tr>
                            <td><label>이름(한글)</label></td>
                            <td>
                                <input
                                    name='employeeName'
                                    placeholder='직원명'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>아이디</label></td>
                            <td>
                                <input
                                    name='employeeId'
                                    placeholder='발급할 아이디'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>비밀번호</label></td>
                            <td>
                                <input
                                    type="password"
                                    name='employeePwd'
                                    placeholder='발급할 비밀번호'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>이메일</label></td>
                            <td>
                                <input
                                    name='employeeEmail'
                                    placeholder='직원 이메일'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>전화번호</label></td>
                            <td>
                                <input
                                    name='employeePhone'
                                    placeholder='직원 전화번호'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>주소</label></td>
                            <td>
                                <input
                                    name='employeeAddress'
                                    placeholder='직원 주소'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>직위</label></td>
                            <td>
                                <select name="positionNo" className={ EmployeeRegistCSS.employeeOptionInput } onChange={ onChangeHandler } value={form.positionNo}>
                                    <option value={211}>사원</option>
                                    <option value={212}>주임</option>
                                    <option value={213}>대리</option>
                                    <option value={214}>과장</option>
                                    <option value={215}>차장</option>
                                    <option value={216}>팀장</option>
                                    <option value={217}>임원</option>
                                </select>
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>부서</label></td>
                            <td>
                                <select name="depNo" className={ EmployeeRegistCSS.employeeOptionInput } onChange={ onChangeHandler }>
                                    <option value={10}>인사팀</option>
                                    <option value={20}>총무팀</option>
                                    <option value={30}>영업팀</option>
                                    <option value={40}>IT사업팀</option>
                                </select>
                            </td>
                        </tr>
                        <br/>
                        <tr>
                            <td><label>남은연차일수</label></td>
                            <td>
                                <input
                                    name='employeeRestDay'
                                    placeholder='해당 직원의 남은 연차 일수'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>입사일</label></td>
                            <td>
                                <input
                                    type="date"
                                    name='employeeHireDate'
                                    placeholder='해당 직원의 입사일'
                                    className={ EmployeeRegistCSS.employeeInfoInput }
                                    onChange={ onChangeHandler }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/><br/>
                <button className={ EmployeeRegistCSS.Registbtn }
                        onClick= { onClickEmployeeRegistHandler }       
                            
                >
                    직원 등록
                </button>
                <br/>
                <button className={ EmployeeRegistCSS.Backbtn }       
                        onClick= { onClickBackHandler }    
                >
                    메인으로
                </button>
            </div>
        </div>
    );
}



export default EmployeeRegist;