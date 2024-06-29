import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lista from "./pages/Lista"
import FormContato from "./pages/FormContato"
/* import Home from "./pages/home";
import Saude from "./pages/saude";
import Sobre from "./pages/sobre";
import Contato from "./pages/contato";
import Header from "./components/header";
import Erro from "./pages/error";
import Produto from "./pages/produto"; */


function RoutesApp(){
    return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Lista/>}/>
    <Route path="/add" element={<FormContato/>}/>
        {/* <Route path="/" element={<Home/>}/>
        <Route path="/saude" element={<Saude/>}/>
        <Route path="/sobre" element={<Sobre/>}/>
        <Route path="/contato" element={<Contato/>}/>
        <Route path="/produto/:id" element={<Produto/>}/>

        <Route path="*" element={<Erro/>}/> */}
    </Routes>
    </BrowserRouter>
    );
}

export default RoutesApp