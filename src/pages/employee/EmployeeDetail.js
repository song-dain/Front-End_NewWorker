import ProductRegistrationCSS from './ProductRegistration.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callEmployeeDetailAPI, callEmployeeUpdateAPI } from '../../api/EmployeeAPICalls';



function EmployeeDetail() {

    const params = useParams();
    const employeeDetail = useSelector(state => state.employeeReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [form, setForm] = useState({});

    /* 모드구분 */
    const [modifyMode, setModifyMode] = useState(false);

    /* 최초 랜더링시 상세조회 */
    useEffect(()=> {
        dispatch(callEmployeeDetailAPI({
            employeeNo : params.employeeNo
        }));
    }, []);

    useEffect(() => {
        // image 값이 바뀔 때마다 랜더링 -> 파일 첨부가 다시 일어날 때마다 preview 보여주기
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
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
            ...form,
            [e.target.name] : e.target.value
        });
    }

    //이미지 첨부
    const onClickImageUpload = () => {
        imageInput.current.click();
    }

    //파일 첨부
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];
        
        setImage(image);
    }

    //수정모드 변경
    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            employeeNo : employeeDetail.employeeNo,
            employeeName : employeeDetail.employeeName,
            employeePwd : employeeDetail.employeePwd,
            employeeEmail : employeeDetail.employeeEmail,
            employeePhone : employeeDetail.employeePhone,
            employeeAddress : employeeDetail.employeeAddress,
            employeeStatus : employeeDetail.employeeStatus,
            employeeRole : employeeDetail.employeeRole,
            position : employeeDetail.position,
            dep : employeeDetail.dep,
            employeeRestDay : employeeDetail.employeeRestDay,
            employeeHireDate : employeeDetail.employeeHireDate,
            employeeEntDate : employeeDetail.employeeEntDate
        });
    }

    /* 수정 저장 */
    const onClickEmployeeUpdateHandler = () => {

        console.log('form', form)

        const formData = new FormData();

    
        formData.append("employeeNo", form.employeeNo);
        formData.append("employeeName", form.employeeName);
        formData.append("employeePwd", form.employeePwd);
        formData.append("employeeEmail", form.employeeEmail);
        formData.append("employeePhone", form.employeePhone);
        formData.append("employeeAddress", form.employeeAddress);
        formData.append("employeeStatus", form.employeeStatus);
        formData.append("employeeRole", form.employeeRole);
        formData.append("position.positionName", form.position);
        formData.append("dep.depName", form.dep);
        formData.append("employeeHireDate", form.employeeHireDate);
        
        if(form.employeeRestDay) {
            formData.append("employeeRestDay", form.employeeRestDay);
        }
        
        if(form.employeeEntDate) {
            formData.append("employeeEntDate", form.employeeEntDate);
        }
        
        if(image) {
            formData.append("employeeImage", image);
        }

        
        for (var p of formData) {
            console.log(p);
          }

        dispatch(callEmployeeUpdateAPI({
            form : formData
        }));

        alert("저장되었습니다.");

        // navigate('/emp/employeeList', { replace : true });
        // window.location.reload();


    }

    return (
        <div>
            <div className={ ProductRegistrationCSS.productButtonDiv }>
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
                    onClick={ onClickEmployeeUpdateHandler }
                >
                    저장하기

                </button>
            }
            </div>
            <div className={ ProductRegistrationCSS.productSection }>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <div className={ ProductRegistrationCSS.productImageDiv }>
                        { employeeDetail && <img 
                            className={ ProductRegistrationCSS.productImage } 
                            src={ (imageUrl == null) ? employeeDetail.employeeImageUrl : imageUrl } 
                            alt="preview"
                        />}
                        <input                
                            style={ { display: 'none' }}
                            type="file"
                            name='employeeImage' 
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={ onChangeImageUpload }
                            ref={ imageInput }
                        />
                        <button 
                            className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickImageUpload } 
                            style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                            disabled={ !modifyMode }
                        >
                            이미지 업로드
                            </button>
                    </div>
                </div>
                <div className={ ProductRegistrationCSS.productInfoDiv }>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>사원명</label></td>
                                <td>
                                    <input
                                        name='employeeName'
                                        placeholder='사원명'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeName : form.employeeName) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>비밀번호</label></td>
                                <td>
                                    <input
                                        name='employeePwd'
                                        placeholder='비밀번호'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeePwd : form.employeePwd) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>이메일 주소</label></td>
                                <td>
                                    <input
                                        name='employeeEmail'
                                        placeholder='이메일 주소'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeEmail : form.employeeEmail) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>핸드폰번호</label></td>
                                <td>
                                    <input
                                        name='employeePhone'
                                        placeholder='핸드폰번호'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeePhone : form.employeePhone) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>주소</label></td>
                                <td>
                                    <input
                                        name='employeeAddress'
                                        placeholder='주소'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeAddress : form.employeeAddress) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>재직여부</label></td>
                                <td>
                                    <label>
                                        <input
                                            type="radio"
                                            name='employeeStatus'                                           
                                            onChange={ onChangeHandler }
                                            value="Y"
                                            readOnly={ modifyMode ? false : true }
                                            checked={ (!modifyMode ? employeeDetail.employeeStatus : form.employeeStatus) === 'Y' ? true : false }
                                        />
                                            Y
                                    </label> &nbsp;
                                    <label>
                                        <input
                                                type="radio"
                                                name='employeeStatus'                                           
                                                onChange={ onChangeHandler }
                                                value="N"
                                                readOnly={ modifyMode ? false : true }
                                                checked={ (!modifyMode ? employeeDetail.employeeStatus : form.employeeStatus) === 'N' ? true : false }
                                            /> N</label>    
                                    
                                </td>
                            </tr>
                            <tr>
                                <td><label>권한</label></td>
                                <td>
                                    <input
                                        name='employeeRole'
                                        placeholder='권한'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeRole : form.employeeRole) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>직위</label></td>
                                <td>
                                    
                                    <input
                                        name='position'
                                        placeholder='직위'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.position : form.position) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>부서명</label></td>
                                <td>
                                    <input
                                        name='dep'
                                        placeholder='부서명'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.dep : form.dep) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>잔여휴가일수</label></td>
                                <td>
                                    <input
                                        name='employeeRestDay'
                                        placeholder='잔여휴가일수'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeRestDay : form.employeeRestDay) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>입사일</label></td>
                                <td>
                                    <input
                                        name='employeeHireDate'
                                        placeholder='입사일'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeHireDate : form.employeeHireDate) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>퇴사일</label></td>
                                <td>
                                    <input
                                        name='employeeEntDate'
                                        placeholder='퇴사일'
                                        className={ ProductRegistrationCSS.productInfoInput }
                                        onChange={ onChangeHandler }
                                        value={ (!modifyMode ? employeeDetail.employeeEntDate : form.employeeEntDate) || '' }
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'lightgray'} : null }
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
    


}

export default EmployeeDetail;