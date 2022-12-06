import { Outlet } from "react-router-dom";
import LayoutCSS from "./Layout.module.css";
import Sidebar from "../components/sidebar/Sidebar";
import SubSidebar from "../components/sidebar/SubSidebar";



/* Outlet: 라우팅 되는 컴포넌트를 대체하기 위한 마커 역할 */
function Layout() {

    return (
   
        <>
            <div className={LayoutCSS.LayoutDiv} >

                <Sidebar />
                
            
                <main className={LayoutCSS.main}>
                    <Outlet />
                </main> 
            </div>
        </>

    );
}

export default Layout;