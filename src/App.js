import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/employee/Login";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={ <Login/>}/>

       <Route path="/main" element={ <Layout/> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
