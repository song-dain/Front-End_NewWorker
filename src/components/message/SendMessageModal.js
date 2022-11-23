
function SendMessageMoadl({selectMrecipient, selectMContent, selectMsendDate, setMessageModal}){

    return (
        <>
         <div>
            <h2>보낸 메시지</h2>
            <h4>수신자 { selectMrecipient }</h4>
            <div>
                { selectMContent }
            </div>
            <span>{ selectMsendDate }</span>
            <button
                onClick={ () => setMessageModal(false) }
            >확인</button>
         </div>
        </>
    );
}

export default SendMessageMoadl;