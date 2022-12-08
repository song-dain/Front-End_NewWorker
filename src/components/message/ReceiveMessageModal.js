import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { callSendMessageAPI } from "../../api/MessageAPICalls";
import ReceiveMessageMoadlCSS from "./ReceiveMessageModal.module.css";
import { callMessageReadAPI } from "../../api/MessageAPICalls";

function ReceiveMessageMoadl({receiveForm, setMessageModal}){

    const dispatch = useDispatch();
    const [replyMode, setReplyMode] = useState(false);
    const [reply, setReply] = useState({
        messageContent : "",
        recipient : {
            employeeNo : receiveForm.senderNo
        }
    });
    const [copyStatus, setCopyStatus] = useState('텍스트 복사');

    useEffect(
        () => {
            dispatch(callMessageReadAPI({
                messageNo: receiveForm.messageNo
            }));
        }, []
    )

    /* 메시지 내용 복사하기 */
    const doCopy = () => {

        if(!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.")
        }

        const textarea = document.createElement("textarea");
        textarea.value = receiveForm.content;
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

    /* 답장 내용 상태 저장 */
    const onChangeHandler = (e) => {
        setReply({
            ...reply,
            messageContent : e.target.value 
        })
    }

    /* 답장 전송 */
    const onClickSendReplyBtn = () => {

        if(reply.messageContent == '') {
            alert('메시지 내용을 입력하세요.');
            return;
        }

        dispatch(callSendMessageAPI({form : reply}))
        window.location.reload();
    }

    return (
        <div
             className={ReceiveMessageMoadlCSS.mrmodal}>
            <div 
                className={ReceiveMessageMoadlCSS.mrmcontainer}
                style={ replyMode == true ? { height : '810px' } : { height : '530px' }}
            >
         <div >
            <div className={ReceiveMessageMoadlCSS.mrmtitle}>받은메시지</div>
            <span className={ReceiveMessageMoadlCSS.mrmsender}><span style={ {color : '#23C834'} }>발신자</span> { receiveForm.sender }</span>
            <button
                className={ReceiveMessageMoadlCSS.copy}
                onClick={ () => doCopy() }
            >{copyStatus}</button>
            <div className={ReceiveMessageMoadlCSS.mrmcontent}>
                { receiveForm.content }
            </div>
            <span className={ReceiveMessageMoadlCSS.mrmdate}>{ receiveForm.sendDate }</span>
            <div className={ReceiveMessageMoadlCSS.mrmbtn}>
            <button
                className={ReceiveMessageMoadlCSS.mrmokbtn}
                onClick={ () => setReplyMode(true) }
            >답장</button> 
            <button
                onClick={ () => setMessageModal(false) }
                className={ReceiveMessageMoadlCSS.mrmocancelbtn}
            >닫기</button>
            </div>
            {
                replyMode && 
                <>
                    <div className={ReceiveMessageMoadlCSS.mrmreply}>답장</div>
                    <div className={ReceiveMessageMoadlCSS.mrmreceiver}><span style={ {color : '#5ec0fd'} }>수신자</span> { receiveForm.sender }</div>
                    <textarea
                        placeholder="답장 내용을 입력하세요."
                        onChange={ (e) => onChangeHandler(e) }
                        className={ReceiveMessageMoadlCSS.mrmrcontent}
                    />
                    <div className={ReceiveMessageMoadlCSS.mrmbtn}>
                    <button
                        onClick={ () => onClickSendReplyBtn() }
                        className={ReceiveMessageMoadlCSS.mrmokbtn}
                    >전송</button>
                    <button
                        className={ReceiveMessageMoadlCSS.mrmocancelbtn}
                        onClick={ () => setReplyMode(false) }
                    >취소</button>
                    </div>
                </>
            }
         </div>
         </div>
        </div>
    );
}

export default ReceiveMessageMoadl;