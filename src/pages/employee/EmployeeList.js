import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEmployeeListAPI } from "../../api/EmployeeAPICalls";
import Employee from "../../components/employee/Employee";
import MainCSS from './Main.module.css';


function EmployeeList() {

    const dispatch = useDispatch();
    const employee = useSelector(state => state.employeeReducer);
    const employeeList = employee.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callEmployeeListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    );

     /* 페이징 버튼 */
     const pageInfo = employee.pageInfo;
     const pageNumber = [];
     if(pageInfo) {
         for(let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
             pageNumber.push(i);
         }
     }
 
     return (
         <>
             <div className={ MainCSS.productDiv }>
             {
                 Array.isArray(employeeList) 
                 && employeeList.map((employee) => (<Employee key={ employee.employeeNo } employee={ employee } />))
             }
             </div>
             <div style={ { listStyleType: 'none', display: 'flex'} }>
             {
                 Array.isArray(employeeList) &&
                 <button
                     onClick={ () => setCurrentPage(currentPage - 1) }
                     disabled={ currentPage === 1 }
                     className={ MainCSS.pagingBtn }
                 >
                     &lt;
                 </button>
             }    
             {
                 pageNumber.map((num) => (
                     <li key={num} onClick={ () => setCurrentPage(num) }>
                         <button
                             style={ currentPage === num ? { backgroundColor : 'orange'} : null }
                             className={ MainCSS.pagingBtn }
                         >
                             {num}
                         </button>
                     </li>
                 ))
             }
             {
                 Array.isArray(employeeList) &&
                 <button
                     onClick={ () => setCurrentPage(currentPage + 1) }
                     disabled={currentPage === pageInfo.maxPage || pageInfo.endPage === 1}
                     className={ MainCSS.pagingBtn }
                 >
                     &gt;
                 </button>
             } 
             </div>
         </>
     );
    
}

export default EmployeeList;