import SendMessageCSS from "../message/SendMessage.module.css";
import EmpListModal from "../../components/message/EmpListModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { callSendMessageAPI } from "../../api/MessageAPICalls";
import { useDispatch } from "react-redux";

function SendMessage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [empListModal, setEmpListModal] = useState(false);
    const [selectRecipient, setSelectRecipient] = useState('');
    const [message, setMessage] = useState({
        messageContent : '',
        recipient : {
            employeeNo : 0
        }
    })

    /* 주소록 모달창 열기 */
    const openEmpList = () => {
        setEmpListModal(true);
    }

    /* 메시지 내용 상태 저장 */
    const onChangeHandler = (e) => {
        setMessage({
            ...message,
            [e.target.name] : e.target.value
        });
    }

    /* 메시지 전송 */
    const SendMessage = () => {

        if(message.recipient.employeeNo == 0) {
            alert('수신자를 선택하세요.');
            return;
        }

        if(message.messageContent == ''){
            alert('메시지 내용을 입력하세요.');
            return;
        }

        dispatch(callSendMessageAPI({ form : message }));
        window.alert('메시지가 전송되었습니다.');
        navigate('/message/send', { replace : false });
    }

    return(
        <>
        {
            empListModal ?
            <EmpListModal
                message={message}
                setMessage={setMessage}
                recipientName={selectRecipient}
                recipient={setSelectRecipient}
                setEmpListModal={setEmpListModal}
            /> : null
        } 
        <div className={SendMessageCSS.box}>
            <div className={SendMessageCSS.title}>새 메시지 작성</div>
            <span className={SendMessageCSS.sender}>수신자</span>
            <input 
                type="text"
                name="employeeNo"
                placeholder="검색을 통해 입력하세요."
                value={ selectRecipient }
                onClick={ () => openEmpList() }
                onChange={ onChangeHandler }
                className={SendMessageCSS.senderinput}
                readOnly='true'
            />
            <button
                onClick={ () => openEmpList() }
                className={SendMessageCSS.searchBtn}
            >검색</button><br/>
            <textarea
                name="messageContent"
                placeholder="메시지 내용을 입력하세요."
                onChange={ onChangeHandler }
                className={SendMessageCSS.newMcontent}
            ></textarea>
            <div className={SendMessageCSS.newMbtn}>
                <button
                    onClick={ () => SendMessage() }
                    className={SendMessageCSS.newMsendBtn}
                >전송</button>
                <button
                    onClick={ () => { navigate(-1) } }
                    className={SendMessageCSS.newMcancelBtn}
                >취소</button>
            </div>
        </div>
        </>
    );
}

export default SendMessage;