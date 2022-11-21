import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";
import Test from "./pages/test/Test";
import Home from "./pages/home/Home";
import Copy from "./pages/copy/Copy";
import Login from "./pages/employee/Login";
import AppCSS from "./App.module.css";


function App() {
  return (
    <BrowserRouter>
      <div className={AppCSS.container} >

        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/main" element={<Layout />}>
              <Route index element={<Main />} />
              <Route path="home/Home" element={<Home />} />
              <Route path="copy/Copy" element={<Copy />} />
            </Route>
            <Route path="test" element={ <Test />}>

            </Route>
          
        </Routes>
      </div>

      


    </BrowserRouter>
  );
}

export default App;
