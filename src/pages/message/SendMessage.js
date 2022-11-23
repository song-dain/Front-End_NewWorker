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

    const onChangeHandler = (e) => {
        setMessage({
            ...message,
            [e.target.name] : e.target.value
        });
    }

    /* 메시지 보내기 */
    const SendMessage = () => {
        dispatch(callSendMessageAPI({ form : message }));
        window.alert('메시지가 전송되었습니다.');
        navigate(-1);
    }

    return(
        <>
        {
            empListModal ?
            <EmpListModal
                message={message}
                setMessage={setMessage}
                recipient={setSelectRecipient}
                setEmpListModal={setEmpListModal}
            /> : null
        }
        <div className={SendMessageCSS.box}>
            <h1>새 메시지 작성</h1>
            <span>수신자</span>
            <input 
                type="text"
                name="employeeNo"
                placeholder="검색을 통해 입력하세요."
                defaultValue={ selectRecipient }
                onClick={ () => openEmpList() }
                onChange={ onChangeHandler }
            />
            <button
                onClick={ () => openEmpList() }
            >주소록</button>
            <textarea
                name="messageContent"
                placeholder="메시지 내용을 입력하세요."
                onChange={ onChangeHandler }
            ></textarea>
            <button
                onClick={ () => SendMessage() }
            >전송</button>
            <button
                onClick={ () => { navigate(-1) } }
            >취소</button>
        </div>
        </>
    );
}

export default SendMessage;