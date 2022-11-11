import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function Layout() {

    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;