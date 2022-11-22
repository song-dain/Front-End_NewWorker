import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callSendMessageListAPI } from "../../api/MessageAPICalls";
import SendMessageBoxCSS from "../message/SendMessageBox.module.css";
import impoicon from "../../img/impoicon.png";
import binicon from "../../img/binicon.png";

function SendMessageBox(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [ status, setStatus ] = useState('전송');
    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;
    const pageInfo = messages.pageInfo;

    /* 페이징 버튼 */
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callSendMessageListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    )

    return(
        <>
            <div className={SendMessageBoxCSS.box}>
                <h1>보낸 메시지함</h1> 
                <table className={SendMessageBoxCSS.tabel}>
                    <thead>
                    <tr>
                        <td>상태</td>
                        <td>수신자</td>
                        <td>내용</td>
                        <td>받은날짜</td>
                        <td>삭제</td>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(messageList) && messageList.map(
                                (messages =>
                                    <tr
                                        key={ messages.messageNo }
                                    >
                                        <td>{ messages.messageStatus == 'send' ? '전송' : '읽음' }</td>
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
                <div className={SendMessageBoxCSS.page}> 
                    {
                        Array.isArray(messageList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage - 1) }
                            disabled={ currentPage === 1 }
                            className={ SendMessageBoxCSS.pagingBtn }
                        >
                            &lt;
                        </button>
                    }  
                    {
                        pageNumber.map((num) => (
                            <li 
                                key={num} onClick={ () => setCurrentPage(num) }
                                className={ SendMessageBoxCSS.pageNum }
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
                            className={ SendMessageBoxCSS.pagingBtn }
                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default SendMessageBox;