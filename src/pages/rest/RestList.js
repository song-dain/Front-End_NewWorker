import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { callRestListAPI } from "../../api/RestAPICalls";
import Rest from "../../components/rest/Rest";
import MainCSS from '../employee/Main.module.css';


function RestList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const rest = useSelector(state => state.restReducer);
    const restList = rest.data;
    const [currentPage, setCurrentPage] = useState(1);
  
    

    useEffect(
        () => {
            dispatch(callRestListAPI({
                restNo: params.restNo,
                currentPage: currentPage
            }));
        }
        , [currentPage]
    );

    /*버튼*/
    const onClickRestListHandler = (restNo) => {

        
        navigate(`/rest/list/detail/${restNo}`, { replace: false });
    }

    /* 페이징 버튼 */
    const pageInfo = rest.pageInfo;
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
                        <col width="15%" />
                        <col width="15%" />
                        <col width="30%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="15%" />

                    </colgroup>
                    <thead>
                        <tr >
                            <th >휴가번호</th>
                            <th>사원명</th>
                            <th >휴가종류</th>
                            <th >신청기간</th>
                            <th >사용일수</th>
                            <th >남은일수</th>
                            <th >승인여부</th>

                        </tr>
                    </thead>

                    <tbody>

                        {
                            Array.isArray(restList)
                            && restList.map((rest) => (
                                //  <RestOk key={ restOk.restNo } restOk={ restOk } />
                                <tr key={rest.restNo}
                                    onClick={() => onClickRestListHandler(rest.restNo)}
                                >
                                    <th>{rest.restNo}</th>
                                    <th>{rest.employeeNo.employeeName}</th>
                                    <th>{rest.restCateTypeNo.restCateType}</th>
                                    <th>{rest.restFdate} ~ {rest.restLdate}</th>
                                    <th>{rest.restDay}</th>
                                    <th>{rest.employeeNo.employeeRestDay}</th>
                                    <th>{rest.restOk}</th>                                   
                                </tr>
                            )
                            )
                        }

                    </tbody>
                    {/* <tbody>

                        {
                            Array.isArray(restList) && restList.map(
                                (restList) => (
                                    <tr 
                                        key={rests.restNo}
                                        
                                    >
                                        <th>{restList.restNo}</th>
                                        
                                    </tr>
                                )
                            )
                        }

                    </tbody> */}

                </table>

                {/* {
                 Array.isArray(restList) 
                 && restList.map((rest) => (<Rest key={ rest.restNo } rest={ rest } />))
             } */}
            </div>





            {/* ====================페이징========================= */}
            <div style={{ listStyleType: 'none', display: 'flex' }}>
                {
                    Array.isArray(restList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={MainCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={currentPage === num ? { backgroundColor: 'orange' } : null}
                                className={MainCSS.pagingBtn}
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(restList) &&
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                        className={MainCSS.pagingBtn}
                    >
                        &gt;
                    </button>
                }
            </div>
        </>
    );

}

export default RestList;