

function ReceiveMessageMoadl({selectMSender, selectMContent, selectMsendDate, setMessageModal}){

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
            <button>답장</button>
         </div>
        </>
    );
}

export default ReceiveMessageMoadl;