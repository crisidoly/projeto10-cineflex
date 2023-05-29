import HomePage from "./HomePage.jsx";
import SeatsPage from "./SeatsPage.jsx";
import SessionsPage from "./SessionPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessionpage/:id" element={<SessionsPage />} />
        <Route path="/assentos/:idSessao" element={<SeatsPage />} />
      </Routes>
   </BrowserRouter>
  );
}
