function NoticeList() {


    return (


        <div>
            <h2 className="text-center">전사 공지</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(NoticeList) && NoticeList.map(
                                (notice) => (
                                    <tr
                                        key={notice.notNo}
                                        onClick={() => onClickTableTr(notice.notNo)}
                                    >
                                        <td>{notice.notNo}</td>
                                        <td>{notice.notTitle}</td>
                                        <td>{notice.notDate}</td>
                                        <td>{notice.employee.employeeName}</td>
                                        <td>{notice.notCount}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );







}

export default NoticeList;