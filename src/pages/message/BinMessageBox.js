import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callBinReceiveMessageAPI, callBinSendMessageAPI } from "../../api/MessageAPICalls";
import BinMessageBoxCSS from "../message/BinMessageBoxCSS.module.css";
import backsquareR from "../../img/backsquareR.png";
import backsquareS from "../../img/backsquareS.png";
import binicon from "../../img/binicon.png";

function BinMessageBox(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [ senderOrReceiver, setSenderOrReceiver ] = useState('발신자'); // 맨위 수신자발신자 변경

    const [ textStrR, setTextStrR ] = useState({ color : "green" });
    const [ textStrS, setTextStrS ] = useState({ color : "black" });

    const [ formR, setFormR ] = useState({
        message : {
            messageNo : 0
        },
        receiveMessageCategory : '',
        receiveMessageDelete : ''
    });

    const [ formS, setFormS ] = useState({
        message : {
            messageNo : 0
        },
        sendMessageDelete : ''
    });

    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;
    const pageInfo = messages.pageInfo;

    useEffect(
        () => {
            dispatch(callBinReceiveMessageAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    )

    /* 받은 메시지 보기 */
    const onClickMoveToReceiveMessage = () => {
        dispatch(callBinReceiveMessageAPI({
            currentPage : currentPage
        }));
        setSenderOrReceiver('발신자');
        setTextStrR({ color : "green" })
        setTextStrS({ color : "black" })
    }

    /* 보낸 메시지 보기 */
    const onClickMoveToSendMessage = () => {

        dispatch(callBinSendMessageAPI({
            currentPage : currentPage

        }));
        setSenderOrReceiver('수신자');
        setTextStrR({ color : "black" })
        setTextStrS({ color : "skyblue" })
    }

    /* 페이징 버튼 */
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return(
        <>
            <div className={BinMessageBoxCSS.box}>
                <h1>휴지통</h1>
                <span
                    onClick={ onClickMoveToReceiveMessage }
                    style={ textStrR }
                >받은 메시지 </span> | 
                <span
                    onClick={ onClickMoveToSendMessage }
                    style={ textStrS }
                > 보낸 메시지</span>
                <table className={BinMessageBoxCSS.tabel}>
                    <thead>
                    <tr>
                        <td>복구</td>
                        <td>{ senderOrReceiver }</td>
                        <td>내용</td>
                        <td>받은날짜</td>
                        <td>영구삭제</td>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(messageList) && messageList.map(
                                (messages =>
                                    <tr
                                        key={ messages.messageNo }
                                    >
                                        <td><img src={ senderOrReceiver == '발신자' ? backsquareR : backsquareS } alt="impocancel"/></td>
                                        <td>{messages.sender.employeeName}</td>
                                        <td>{messages.messageContent}</td>
                                        <td>{messages.sendDate}</td>
                                        <td><img src={binicon} alt="bin"/></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className={BinMessageBoxCSS.page}> 
                    {
                        Array.isArray(messageList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage - 1) }
                            disabled={ currentPage === 1 }
                            className={ BinMessageBoxCSS.pagingBtn }
                        >
                            &lt;
                        </button>
                    }  
                    {
                        pageNumber.map((num) => (
                            <li 
                                key={num} onClick={ () => setCurrentPage(num) }
                                className={ BinMessageBoxCSS.pageNum }
                            >
                                <button
                                    style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                                >
                                    {num}
                                </button>
                            </li>
                        ))
                    }
                    {
                        Array.isArray(messageList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage + 1) }
                            disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                            className={ BinMessageBoxCSS.pagingBtn }
                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default BinMessageBox;