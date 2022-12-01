import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callBinReceiveMessageAPI, callBinSendMessageAPI, callRecipientManagementAPI, callSenderManagementAPI } from "../../api/MessageAPICalls";
import BinMessageBoxCSS from "../message/BinMessageBoxCSS.module.css";
import backsquareR from "../../img/backsquareR.png";
import backsquareS from "../../img/backsquareS.png";
import binicon from "../../img/binicon.png";

function BinMessageBox(){

    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [ senderOrReceiver, setSenderOrReceiver ] = useState('발신자'); // 맨위 수신자발신자 변경


    const [ textStrR, setTextStrR ] = useState({ color : "#2DADFF" });
    const [ textStrS, setTextStrS ] = useState({ color : "black" });
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
            currentPage : 1
        }));
        setSenderOrReceiver('발신자');
        setTextStrR({ color : "#2DADFF" })
        setTextStrS({ color : "black" })
    }

    /* 보낸 메시지 보기 */
    const onClickMoveToSendMessage = () => {

        dispatch(callBinSendMessageAPI({
            currentPage : 1
        }));
        setSenderOrReceiver('수신자');
        setTextStrR({ color : "black" })
        setTextStrS({ color : "#2DADFF" })
    }

    /* 메시지 복구 */
    const restoreMessage = (num) => {

        if(senderOrReceiver == '발신자') {
            dispatch(callRecipientManagementAPI({
                form : {
                    message : {
                        messageNo : num
                    },
                    receiveMessageDelete :'N'
                }
            }));

        } else {
            dispatch(callSenderManagementAPI({
                form : {
                    message : {
                        messageNo : num
                    },
                    sendMessageDelete :'N'
                }
            }));
        }

        alert("메시지가 이전 메시지함으로 이동되었습니다.");
        window.location.reload();
    }

    /* 메시지 영구 삭제 */
    const DeleteMessage = (num) => {

        if(senderOrReceiver == '발신자') {
            dispatch(callRecipientManagementAPI({
                form : {
                    message : {
                        messageNo : num
                    },
                    receiveMessageDelete :'PD'
                }
            }));

        } else {
            dispatch(callSenderManagementAPI({
                form : {
                    message : {
                        messageNo : num
                    },
                    sendMessageDelete :'PD'
                }
            }));

            alert("메시지가 영구 삭제되었습니다.");
            window.location.reload();
        }


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
                <div className={BinMessageBoxCSS.title}>휴지통</div>
                <span
                    className={BinMessageBoxCSS.rem}
                    onClick={ onClickMoveToReceiveMessage }
                    style={ textStrR }
                >받은 메시지 </span> | 
                <span
                    className={BinMessageBoxCSS.sem}
                    onClick={ onClickMoveToSendMessage }
                    style={ textStrS }
                > 보낸 메시지</span>
                <table className={BinMessageBoxCSS.mtable}>
                    <thead className={BinMessageBoxCSS.mthead}>
                    <tr>
                        <td className={BinMessageBoxCSS.thd}>복구</td>
                        <td className={BinMessageBoxCSS.thd}>{ senderOrReceiver }</td>
                        <td className={BinMessageBoxCSS.thd}>내용</td>
                        <td className={BinMessageBoxCSS.thd}>{ senderOrReceiver == '발신자' ? '받은날짜' : '보낸날짜' }</td>
                        <td className={BinMessageBoxCSS.thddelete}>영구삭제</td>
                    </tr>
                    </thead>
                    <tbody  className={BinMessageBoxCSS.mtbody}>
                        {
                            Array.isArray(messageList) && messageList.map(
                                (messages =>
                                    <tr
                                        className={BinMessageBoxCSS.mtd}
                                        key={ messages.messageNo }
                                    >
                                        <td><button
                                                className={BinMessageBoxCSS.returnBtn}
                                                value={ senderOrReceiver == '발신자' ? backsquareR : backsquareS }
                                                onClick={ () => restoreMessage(messages.messageNo) }
                                            >↺</button></td>
                                        <td className={BinMessageBoxCSS.empName}>{messages.sender.employeeName}</td>
                                        <td className={BinMessageBoxCSS.content}
                                            title="휴지통 메시지는 조회할 수 없습니다."
                                        >{messages.messageContent}</td>
                                        <td className={BinMessageBoxCSS.sendDate}
                                        >{(messages.today > messages.sendDate.substring(0, 10) ? messages.sendDate.substring(0, 10) : messages.sendDate.substring(11, 16) )}</td>
                                        <td><button 
                                               className={BinMessageBoxCSS.binBtn}
                                               onClick={ () => DeleteMessage(messages.messageNo) }
                                            >X</button></td>
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
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={BinMessageBoxCSS.pagingBtn}
                        >
                            &lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                                key={num} onClick={() => setCurrentPage(num)}
                                className={BinMessageBoxCSS.pageNum}
                            >
                                <button
                                    className={BinMessageBoxCSS.numBtn}
                                    style={currentPage === num ? { color: '#5ec0fd' } : null}
                                >
                                    {num}
                                </button>
                            </li>
                        ))
                    }
                    {
                        Array.isArray(messageList) &&
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                            className={BinMessageBoxCSS.pagingBtn}
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