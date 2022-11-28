import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callReceiveMessageListAPI, callRecipientManagementAPI, callSearchReceiveMessageAPI, callReceiveMessageReadAPI } from "../../api/MessageAPICalls";
import ReceiveMessageBoxCSS from "../message/ReceiveMessageBox.module.css";
import impoicon from "../../img/impoicon.png";
import binicon from "../../img/binicon.png";
import ReceiveMessageMoadl from "../../components/message/ReceiveMessageModal";

function ReceiveMessageBox(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult ] = useState('');
    const [selectMContent, setSelectMContent] = useState('');
    const [selectMSender, setSelectMSender] = useState('');
    const [selectMsendDate, setSelectMSendDate] = useState('');
    const [senderNo, setSenderNo] = useState(0);
    const [messageModal, setMessageModal] = useState(false);
    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;
    const pageInfo = messages.pageInfo;;

    useEffect(
        () => {
            dispatch(callReceiveMessageListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage, messageModal]
    )

    /* 검색 값 상태 저장 */
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    /* Enter Key로 검색 */
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {
            dispatch(callSearchReceiveMessageAPI({
                keyword : search,
                currentPage : currentPage
            }));
            setSearchResult(`키워드'${search}' 검색 결과입니다.`);
        }
    }

    /* Button으로 검색 */
    const onClickBtnHandler = () => {
        dispatch(callSearchReceiveMessageAPI({
            keyword : search,
            currentPage :  currentPage
        }));
        setSearchResult(`키워드 '${search}' 검색 결과입니다.`);
    }

    /* 메시지 조회 */
    const onClickMessageContent = (message) => {

        dispatch(callReceiveMessageReadAPI({
            messageNo : message.messageNo
        }));

        setSenderNo(message.sender.employeeNo);
        setSelectMSender(message.sender.employeeName);
        setSelectMContent(message.messageContent);
        setSelectMSendDate(message.sendDate);

        setMessageModal(true);

    }

    /* 중요 메시지함으로 이동 */
    const moveToImpoMessageBox = (num) => {
        

        dispatch(callRecipientManagementAPI({
            form : {
                message : {
                    messageNo : num
                },
                receiveMessageCategory : 'impoMessageBox'
            }
        }));

        alert("메시지가 중요 메시지함으로 이동되었습니다.");
        window.location.reload();

    }

    /* 휴지통으로 이동 */
    const moveToBinMessageBox = (num) => {

        dispatch(callRecipientManagementAPI({
            form : {
                message : {
                    messageNo : num
                },
                receiveMessageDelete :'Y'
            }
        }));

        alert('메시지가 휴지통으로 이동되었습니다.')
        window.location.reload();

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
            { messageModal ? 
                <ReceiveMessageMoadl
                    selectMSenderNo={senderNo}
                    selectMSender={selectMSender}
                    selectMContent={selectMContent}
                    selectMsendDate={selectMsendDate}
                    setMessageModal={setMessageModal}
                /> : null }
            <div className={ReceiveMessageBoxCSS.box}>
                <h1>받은 메시지함</h1> 
                <input
                    type="text"
                    placeholder="검색"
                    value={ search }
                    onChange={ onSearchChangeHandler }
                    onKeyUp= { onEnterKeyHandler }
                />
                <button
                    onClick={ onClickBtnHandler }
                >
                검색</button>
                <div>{ searchResult }</div>
                <table className={ReceiveMessageBoxCSS.tabel}>
                    <thead>
                    <tr>
                        <td>중요</td>
                        <td>발신자</td>
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
                                        <td><img 
                                                src={ impoicon }
                                                onClick={ () => moveToImpoMessageBox(messages.messageNo) }
                                            /></td>
                                        <td>{messages.sender.employeeName}</td>
                                        <td
                                            onClick={ () => onClickMessageContent(messages) }
                                        >{messages.messageContent}</td>
                                        <td>{(messages.today > messages.sendDate.substring(0, 10) ? messages.sendDate.substring(0, 10) : messages.sendDate.substring(11, 16) )}</td>
                                        <td><img 
                                                src={binicon} alt="bin"
                                                onClick={ () => moveToBinMessageBox(messages.messageNo) }
                                            /></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className={ReceiveMessageBoxCSS.page}> 
                    {
                        Array.isArray(messageList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage - 1) }
                            disabled={ currentPage === 1 }
                            className={ ReceiveMessageBoxCSS.pagingBtn }
                        >
                            &lt;
                        </button>
                    }  
                    {
                        pageNumber.map((num) => (
                            <li 
                                key={num} onClick={ () => setCurrentPage(num) }
                                className={ ReceiveMessageBoxCSS.pageNum }
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
                            className={ ReceiveMessageBoxCSS.pagingBtn }
                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default ReceiveMessageBox;