import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callSendMessageAPI } from "../../api/MessageAPICalls";
import ReceiveMessageMoadlCSS from "./ReceiveMessageModal.module.css";

function ReceiveMessageMoadl({selectMSenderNo, selectMSender, selectMContent, selectMsendDate, setMessageModal}){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [replyMode, setReplyMode] = useState(false);
    const [reply, setReply] = useState({
        messageContent : "",
        recipient : {
            employeeNo : selectMSenderNo
        }
    });

    const onChangeHandler = (e) => {
        setReply({
            ...reply,
            messageContent : e.target.value 
        })
    }

    const onClickSendReplyBtn = () => {
        dispatch(callSendMessageAPI({form : reply}))
        navigate('/message/send', { replace : false });
    }

    return (
        <div className={ReceiveMessageMoadlCSS.mrmodal}>
            <div 
                className={ReceiveMessageMoadlCSS.mrmcontainer}
                style={ replyMode == true ? { height : '810px' } : { height : '530px' }}
            >
         <div >
            <div className={ReceiveMessageMoadlCSS.mrmtitle}>받은메시지</div>
            <span className={ReceiveMessageMoadlCSS.mrmsendar}><span style={ {color : '#23C834'} }>발신자</span> { selectMSender }</span>
            <div className={ReceiveMessageMoadlCSS.mrmcontent}>
                { selectMContent }
            </div>
            <span className={ReceiveMessageMoadlCSS.mrmdate}>{ selectMsendDate }</span>
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
                    <div className={ReceiveMessageMoadlCSS.mrmreply}>빠른답장</div>
                    <div className={ReceiveMessageMoadlCSS.mrmreceiver}><span style={ {color : '#5ec0fd'} }>수신자</span> { selectMSender }</div>
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