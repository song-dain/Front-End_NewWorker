import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApproverChoiceModal from '../../components/approval/ApproverChoiceModal';
import { useDispatch } from 'react-redux';
import { callAppRegistAPI } from '../../api/ApprovalAPICalls';
import ApprovalRegistCSS from './ApprovalRegist.module.css';


function ApprovalRegist() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [approverListModal, setApproverListModal] = useState(false);
    const [approval, setApproval] = useState({
        appDocNo : '',
        appCreatedDate : 0,
        appEndDate : 0,
        appTitle : '',
        appLines : []

    })


    const [selectApprover, setSelectApprover] = useState('');
    const [appContent, setAppContent] = useState();
    const [appLines, setAppLines] = useState([])
  
    const onClickApproverListHandler = () => {
        setApproverListModal(true);
    }

    const onChangeHandler = (e) => {
        setApproval({
            ...approval,
            [e.target.name] : e.target.value
        });
    }

    console.log("ApprovalRegist : ", appLines);  

    const onClickAppRegistHandler = () => {

        const formData = new FormData();

        formData.append("appDocNo", approval.appDocNo);
        formData.append("appEndDate", approval.appEndDate)
        formData.append("appTitle", approval.appTitle);
        formData.append("appContent", appContent);
        

        //결재선 등록
        for(var i = 0; i<appLines.length; i++){
        formData.append(`appLines[${i}].employee.employeeNo`, appLines[i].employeeNo);
        formData.append(`appLines[${i}].appLineTurn`, appLines[i].appLineTurn);
        }

        if(approval.appDocNo == '') {
            alert('참조번호를 입력하세요.');
            return;
        } else if(approval.appEndDate == 0) {
            alert('종료일을 지정하세요.');
            return;
        } else if(approval.appTitle == '') {
            alert('문서 제목을 입력하세요.');
            return;
        } else if(appContent == '') {
            alert('문서 내용을 입력하세요.');
            return;
        }
        dispatch(callAppRegistAPI({ form : formData }));
        navigate('/approval/draft', { replace : false });
    }


    return (
        <div className={ ApprovalRegistCSS.regist }>
            {
                approverListModal ? 
                <ApproverChoiceModal 
                    setApproverListModal={setApproverListModal}
                    approverListModal={approverListModal}
                    setAppLines={setAppLines}
                    appLines={appLines}
                    setSelectApprover={setSelectApprover}
                    selectApprover={selectApprover}
                /> : null
            }
        <h1> 결재 상신 </h1>
        <p>───────────────────────────────────────────────────────────────</p>
        <br/>
            <div>
                <p>문서번호</p>
                <input type="text" className={ ApprovalRegistCSS.appDocNo } name="appDocNo" placeholder="20221108-1229580" autoComplete='off' onChange={ onChangeHandler }/>
                <br/>
                <br/>
                <p>결재 종료일</p>
                <input type="date" className={ ApprovalRegistCSS.appEndDate } name="appEndDate" autoComplete='off' onChange={ onChangeHandler }/>
                <br/>
                <br/>
                <p>제목</p>
                <input type="text" className={ ApprovalRegistCSS.appTitle } name="appTitle" placeholder="2022년 11월 지출결의서(예시)" autoComplete='off' onChange={ onChangeHandler }/>
                <br/>
                <br/>
                    <div>
                        <CKEditor
                            name="appContent"
                            className={ ApprovalRegistCSS.ckCSS }
                            editor={ClassicEditor}
                            data='내용을 입력하세요.'
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setAppContent(data);
                                console.log(data);
                            }}
                        />
                    </div>
                <br/>
                <br/>
                <button name="employeeNo" onClick= { onClickApproverListHandler } className={ ApprovalRegistCSS.approverChoiceBtn }>결제자 선택</button>
                <br/>
                <div>{
                    appLines.map((appLines) =>
                        <li>
                            {appLines.employeeName}
                        </li>
                    )
                }
                </div>
                <br/>
                <br/>
                <div className={ ApprovalRegistCSS.btnDiv }>
                <button onClick={ onClickAppRegistHandler } className={ ApprovalRegistCSS.registBtn }>확인</button>
                <button onClick={ () => { navigate(-1) } } className={ ApprovalRegistCSS.cancleBtn }>취소</button>
                </div>
            </div>                
        </div>

    );
}



export default ApprovalRegist;