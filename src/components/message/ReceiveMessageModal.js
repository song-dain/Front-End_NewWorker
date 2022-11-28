import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { callSendMessageAPI } from "../../api/MessageAPICalls";

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
        <>
         <div>
            <h2>받은 메시지</h2>
            <h4>발신자 { selectMSender }</h4>
            <div>
                { selectMContent }
            </div>
            <span>{ selectMsendDate }</span>
            <button
                onClick={ () => setMessageModal(false) }
            >확인</button>
            <button
                onClick={ () => setReplyMode(true) }
            >답장</button>
            {
                replyMode && 
                <>
                    <textarea
                        placeholder="답장 내용을 입력하세요"
                        onChange={ (e) => onChangeHandler(e) }
                    />
                    <button
                        onClick={ () => onClickSendReplyBtn() }
                    >전송</button>
                </>
            }
         </div>
        </>
    );
}

export default ReceiveMessageMoadl;