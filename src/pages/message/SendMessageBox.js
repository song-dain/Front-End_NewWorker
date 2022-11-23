import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callSendMessageListAPI, callSenderManagementAPI, callSearchSendMessageAPI } from "../../api/MessageAPICalls";
import SendMessageBoxCSS from "../message/SendMessageBox.module.css";
import binicon from "../../img/binicon.png";
import SendMessageMoadl from "../../components/message/SendMessageModal";

function SendMessageBox(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult ] = useState('');
    const [selectMContent, setSelectMContent] = useState('');
    const [selectMRecipient, setSelectMRecipient] = useState('');
    const [selectMsendDate, setSelectMSendDate] = useState('');
    const [messageModal, setMessageModal] = useState(false);
    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;
    const pageInfo = messages.pageInfo;

    useEffect(
        () => {
            dispatch(callSendMessageListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    )

    /* 검색 값 상태 저장 */
    const onSearchChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    /* Enter Key로 검색 */
    const onEnterKeyHandler = (e) => {
        if(e.key == 'Enter') {
            dispatch(callSearchSendMessageAPI({
                keyword : search,
                currentPage : currentPage
            }));
            setSearchResult(`'${search}' 검색 결과입니다.`);
        }
    }

    /* Button으로 검색 */
    const onClickBtnHandler = () => {
        dispatch(callSearchSendMessageAPI({
            keyword : search,
            currentPage :  currentPage
        }));
        setSearchResult(`키워드 '${search}' 검색 결과입니다.`);
    }

    /* 휴지통으로 이동 */
    const moveToBinMessageBox = (num) => {

        dispatch(callSenderManagementAPI({
            form : {
                message : {
                    messageNo : num
                },
                sendMessageDelete :'Y'
            }
        }));

        alert("메시지가 휴지통으로 이동되었습니다.");
        window.location.reload();
    }

    /* 페이징 버튼 */
    const pageNumber = [];
    if(pageInfo) {
        for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    /* 메시지 조회 */
    const onClickMessageContent = (message) => {

        setSelectMRecipient(message.recipient.employeeName);
        setSelectMContent(message.messageContent);
        setSelectMSendDate(message.sendDate);

        setMessageModal(true);

    }


    return(
        <>
            { messageModal ? 
                <SendMessageMoadl
                    selectMRecipient={selectMRecipient}
                    selectMContent={selectMContent}
                    selectMsendDate={selectMsendDate}
                    setMessageModal={setMessageModal}
                /> : null }
            <div className={SendMessageBoxCSS.box}>
                <h1>보낸 메시지함</h1> 
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
                <table className={SendMessageBoxCSS.tabel}>
                    <thead>
                    <tr>
                        <td>상태</td>
                        <td>수신자</td>
                        <td>내용</td>
                        <td>보낸날짜</td>
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
                                        <td
                                            onClick={ () => onClickMessageContent(messages) }
                                        >{messages.messageContent}</td>
                                        <td>{messages.sendDate}</td>
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