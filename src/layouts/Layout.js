import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import LayoutCSS from "./Layout.module.css";

/* Outlet: 라우팅 되는 컴포넌트를 대체하기 위한 마커 역할 */
function Layout() {

    return (
        <>
            <div className={ LayoutCSS.LayoutDiv}>
                <Header/>
                <Navbar/>
                <Footer/>
            </div>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;