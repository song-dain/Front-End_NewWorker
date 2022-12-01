import SendMessageMoadlCSS from "./SendMessageModal.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { callSendCalcelAPI } from "../../api/MessageAPICalls";
import { useNavigate } from "react-router-dom";

function SendMessageMoadl({messageStatus, messageNo, selectMRecipient, selectMContent, selectMsendDate, setMessageModal}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [copyStatus, setCopyStatus] = useState('텍스트 복사');

    /* 메시지 내용 복사하기 */
    const doCopy = () => {

        if(!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.")
        }

        const textarea = document.createElement("textarea");
        textarea.value = selectMContent;
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.position = "fixed";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyStatus('복사 완료!');
        setTimeout(function(){ setCopyStatus('텍스트 복사') }, 1000);

    }

    /* 메시지 전송 취소 */
    const onClickCancelBtn = () => {

        if(messageStatus == 'read') {return alert('수신자가 읽은 메시지는 전송 취소할 수 없습니다.');}

        dispatch(callSendCalcelAPI({messageNo : messageNo}))
        alert('메시지 전송이 취소되었습니다.');
        setMessageModal(false);
    }

    return (
        <div className={SendMessageMoadlCSS.msmodal}>
         <div className={SendMessageMoadlCSS.msmcontainer}>
            <h2 className={SendMessageMoadlCSS.msmtitle}>보낸 메시지</h2>
            <div className={SendMessageMoadlCSS.msmreceiver}><span style={ {color : '#5ec0fd'} }>수신자</span> { selectMRecipient }</div>
            <button
                className={SendMessageMoadlCSS.copy}
                onClick={ () => doCopy() }
            >{copyStatus}</button>
            <div className={SendMessageMoadlCSS.msmcontent}>
                { selectMContent }
            </div>
            <span className={SendMessageMoadlCSS.msmdate}>{ selectMsendDate }</span>
            <div className={SendMessageMoadlCSS.msmbtn}>
                <button
                    className={SendMessageMoadlCSS.msmokbtn}
                    onClick={ () => setMessageModal(false) }
                >닫기</button>
                <button
                    className={SendMessageMoadlCSS.msmocancelbtn}
                    onClick={ () => onClickCancelBtn() }
                >전송취소</button>
            </div>
         </div>
        </div>
    );
}

export default SendMessageMoadl;