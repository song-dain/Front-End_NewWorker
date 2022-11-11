import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout/> }/>
        <Route index element={ <Main/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
