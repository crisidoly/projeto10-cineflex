import { useState } from "react";
import HomePage from "./HomePage.jsx";
import SeatsPage from "./SeatsPage.jsx";
import SessionsPage from "./SessionPage.jsx";
import SucessPage from "./SucessPage.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components"


export default function App() {
  const [infoCompra, setInfoCompra] = useState({})
  const [infoFilme, setInfoFilme]  = useState({})

  return (
    <BrowserRouter>
    <Header>
        <Link to="/">
            CINEFLEX
        </Link>
    </Header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessoes/:id" element={<SessionsPage setInfoFilme={setInfoFilme} />} />
        <Route path="/assentos/:idSessao" element={<SeatsPage setInfoCompra={setInfoCompra} infoCompra={infoCompra} infoFilme={infoFilme} />} />
        <Route path="/sucesso" element={<SucessPage setInfoCompra={setInfoCompra} infoCompra={infoCompra} />} />

      </Routes>
   </BrowserRouter>
  );
}

const Header = styled.div`
    width: 100%;
    height: 70px;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    justify-content: center;
    display: flex;
    background-color: #C3CFD9;
    color: #E8833A;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`