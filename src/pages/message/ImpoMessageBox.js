import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callImpoMessageListAPI, callRecipientManagementAPI, callSearchImpoMessageAPI, callReceiveMessageReadAPI } from "../../api/MessageAPICalls";
import ImpoMessageBoxCSS from "../message/ImpoMessageBox.module.css";
import ReceiveMessageMoadl from "../../components/message/ReceiveMessageModal";

function ImpoMessageBox(){

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult ] = useState('');
    const [messageModal, setMessageModal] = useState(false);
    const messages = useSelector(state => state.messageReducer);
    const messageList = messages.data;
    const pageInfo = messages.pageInfo;
    const [ receiveForm, setReceiveForm ] = useState({
        senderNo : 0,
        sender : '',
        content : '',
        sendDate : ''
    });

    useEffect(
        () => {
            dispatch(callImpoMessageListAPI({
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
            dispatch(callSearchImpoMessageAPI({
                keyword : search,
                currentPage : currentPage
            }));
            setSearchResult(`'${search}' 검색 결과입니다.`);
        }
    }

    /* Button으로 검색 */
    const onClickBtnHandler = () => {
        dispatch(callSearchImpoMessageAPI({
            keyword : search,
            currentPage :  currentPage
        }));
        setSearchResult(`키워드 '${search}' 검색 결과입니다.`);
    }

    /* 메시지 상세 조회 */
    const onClickMessageContent = (message) => {

        setMessageModal(true);

        setReceiveForm({
            senderNo : message.sender.employeeNo,
            sender : message.sender.employeeName,
            content : message.messageContent,
            sendDate : message.sendDate
        });

    }

    /* 받은 메시지함 이동 */
    const moveToReceiveMessageBox = (num) => {

        dispatch(callRecipientManagementAPI({
            form : {
                message : {
                    messageNo : num
                },
                receiveMessageCategory : 'receiveMessageBox'
            }
        }));

        alert("메시지가 이전 메시지함으로 이동되었습니다.");
        window.location.reload();
    }

    /* 휴지통 이동 */
    const moveToBinMessageBox = (num) => {

        dispatch(callRecipientManagementAPI({
            form : {
                message : {
                    messageNo : num
                },
                receiveMessageDelete :'Y' 
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

    return(
        <>
            { messageModal ? 
                <ReceiveMessageMoadl
                    receiveForm={receiveForm}
                    setMessageModal={setMessageModal}
                /> : null }
            <div className={ImpoMessageBoxCSS.box}>
                <div className={ImpoMessageBoxCSS.title}>중요 메시지함</div> 
                <div className={ImpoMessageBoxCSS.searchs}>
                    <input
                        className={ImpoMessageBoxCSS.search}
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={search}
                        onChange={onSearchChangeHandler}
                        onKeyUp={onEnterKeyHandler}
                    />
                    <button
                        className={ImpoMessageBoxCSS.searchBtn}
                        onClick={onClickBtnHandler}
                    >
                        검색</button>
                    <div className={ImpoMessageBoxCSS.searchResult}>{searchResult}</div>
                </div>
                <table className={ImpoMessageBoxCSS.mtable}>
                    <thead className={ImpoMessageBoxCSS.mthead}>
                    <tr>
                        <td className={ImpoMessageBoxCSS.thd}>중요</td>
                        <td className={ImpoMessageBoxCSS.thd}>발신자</td>
                        <td className={ImpoMessageBoxCSS.thd}>내용</td>
                        <td className={ImpoMessageBoxCSS.thd}>받은날짜</td>
                        <td className={ImpoMessageBoxCSS.thd}>삭제</td>
                    </tr>
                    </thead>
                    <tbody className={ImpoMessageBoxCSS.mtbody}>
                        {
                            Array.isArray(messageList) && messageList.map(
                                (messages =>
                                    <tr
                                        className={ImpoMessageBoxCSS.mtd}
                                        key={ messages.messageNo }
                                    >
                                        <td ><button
                                            className={ImpoMessageBoxCSS.impoBtn}
                                            onClick={() => moveToReceiveMessageBox(messages.messageNo)}
                                        >★</button></td>
                                        <td
                                            className={ImpoMessageBoxCSS.receiver}
                                            style={ messages.messageStatus == 'read' ? { color : '#B3B3B3' } : { color : 'black' } }
                                        >{(messages.sender.employeeName + " " + messages.sender.position.positionName)}</td>
                                        <td
                                            className={ImpoMessageBoxCSS.content}
                                            style={ messages.messageStatus == 'read' ? { color : '#B3B3B3' } : { color : 'black' } }
                                            onClick={ () => onClickMessageContent(messages) }
                                        >{messages.messageContent}</td>
                                        <td
                                            className={ImpoMessageBoxCSS.sendDate}
                                            style={ messages.messageStatus == 'read' ? { color : '#B3B3B3' } : { color : 'black' } }
                                        >{(messages.today > messages.sendDate.substring(0, 10) ? messages.sendDate.substring(0, 10) : messages.sendDate.substring(11, 16) )}</td>
                                        <td><button
                                            className={ImpoMessageBoxCSS.binBtn}
                                            onClick={() => moveToBinMessageBox(messages.messageNo)}
                                        >X</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                <div className={ImpoMessageBoxCSS.page}>
                    {
                        Array.isArray(messageList) &&
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={ImpoMessageBoxCSS.pagingBtn}
                        >
                            &lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                                key={num} onClick={() => setCurrentPage(num)}
                                className={ImpoMessageBoxCSS.pageNum}
                            >
                                <button
                                    className={ImpoMessageBoxCSS.numBtn}
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
                            className={ImpoMessageBoxCSS.pagingBtn}
                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </>
    );
}

export default ImpoMessageBox;