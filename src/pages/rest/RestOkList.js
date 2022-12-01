import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { callRestOkListAPI } from "../../api/RestAPICalls";
import RestOk from "../../components/rest/RestOk";
import MainCSS from '../employee/Main.module.css';

function RestOkList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const restOk = useSelector(state => state.restReducer);
    const restOkList = restOk.data;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callRestOkListAPI({
                restNo: params.restNo,
                currentPage: currentPage
            }));
        }
        , [currentPage]
    );

    const onClickRestOkListHandler = (restNo) => {

        navigate(`/rest/list/admin/detail/${restNo}`, { replace: false });


    }


    /* 페이징 버튼 */
    const pageInfo = restOk.pageInfo;
    const pageNumber = [];
    if (pageInfo) {
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div className={MainCSS.productDiv}>
                <table >
                    <colgroup>
                        <col width="10%" />
                        <col width="50%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th >휴가번호</th>
                            <th >사원명</th>
                            <th >부서명</th>
                            <th >휴가종류</th>
                            <th >작성일</th>
                            <th >승인여부</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            Array.isArray(restOkList)
                            && restOkList.map((restOk) => (
                                //  <RestOk key={ restOk.restNo } restOk={ restOk } />
                                <tr key={restOk.restNo}
                                    onClick={() => onClickRestOkListHandler(restOk.restNo)}
                                >
                                    <th>{restOk.restNo}</th>
                                    <th>{restOk.employeeNo.employeeName}</th>
                                    <th>{restOk.employeeNo.dep.depName}</th>
                                    <th>{restOk.restCateTypeNo.restCateType}</th>
                                    <th>{restOk.restDate}</th>
                                    <th>{restOk.restOk}</th>
                                </tr>
                            )
                            )
                        }

                    </tbody>


                </table>
                {/* {
                 Array.isArray(restOkList) 
                 && restOkList.map((restOk) => (<RestOk key={ restOk.restNo } restOk={ restOk } />))
             } */}

            </div>





            {/* ====================페이징========================= */}
            <div style={{ listStyleType: 'none', display: 'flex' }}>
                {
                    Array.isArray(restOkList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    //  className={ MainCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? { backgroundColor: 'orange' } : null}
                            //  className={ MainCSS.pagingBtn }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(restOkList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                    //  className={ MainCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
            </div>
        </>
    );

}

export default RestOkList;