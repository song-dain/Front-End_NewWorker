import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ApproverChoiceModal from '../../components/approval/ApproverChoiceModal';
import { ajax } from 'jquery';


function ApprovalRegist() {

    const navigate = useNavigate();
    const [approverChoiceModal, setApproverChoiceModal] = useState(false);
    const [approval, setApproval] = useState({
        appDocNo : '',
        appCreatedDate : 0,
        appEndDate : 0,
        appTitle : '',
        appContent : '',
        //appLines : appLines
        
    })

    const [selectApprover, setSelectApprover] = useState('');

    const [appLines, setAppLines] = useState([])

    
    const onClickApproverChoiceHandler = () => {
        setApproverChoiceModal(true);
    }

    const onChangeHandler = (e) => {
        setApproval({
            ...approval,
            [e.target.name] : e.target.value
        });
    }

    const AppRegist = () => {}

    return (
        <div>
            {
                approverChoiceModal ? 
                <ApproverChoiceModal 
                    setApproverChoice={setApproverChoiceModal}
                    approverChoiceModal={approverChoiceModal}
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
                <input type="text" className="appDocNo" name="appDocNo" placeholder="20221108-1229580" autoComplete='off' onChange={ onChangeHandler }/>
                <p>작성일</p>
                <input type="date" className="appDocNo" name="appCreatedDate" autoComplete='off' onChange={ onChangeHandler }/>
                <p>종료일</p>
                <input type="date" className="appDocNo" name="appEndDate" autoComplete='off' onChange={ onChangeHandler }/>
                <p>제목</p>
                <input type="text" className="appDocNo" name="appTitle" placeholder="2022년 11월 지출결의서(예시)" autoComplete='off' onChange={ onChangeHandler }/>
                <br/>
                    <div>
                        <CKEditor
                            name="appContent"
                            editor={ClassicEditor}
                            data='<p>내용을 입력하세요.</p>'
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log(data);
                            }}
                        />
                    </div>
                <br/>
                <input type="file" name="approvalFiles" multiple/>
                <br/>
                <br/>
                <button name="employeeNo" onClick= { onClickApproverChoiceHandler }>결제자 선택</button>
                <br/>
                <br/>
                <br/>
                <button onClick={ () => AppRegist() }>확인</button>
                <button onClick={ () => { navigate(-1) } }>취소</button>
            </div>                
        </div>

    );
}



export default ApprovalRegist;