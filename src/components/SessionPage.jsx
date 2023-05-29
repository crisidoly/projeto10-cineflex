import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Horario from "./Horario";

export default function SessionsPage({setInfoFilme}) {
  const { id } = useParams();
  const [filme, setFilme] = useState([]);
  const [horarioFilme, setHorarioFilme] = useState([]);

  useEffect(() => {
    const fetchFilme = async () => {
      try {
        const response = await axios.get(
          `https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`
        );
        setFilme(() => {return response.data});
        setHorarioFilme(response.data.days);
        setInfoFilme(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilme();
  }, [id]);

  if (!filme) {
    return <LoadingContainer>Carregando...</LoadingContainer>;
  }

  return (
    <PageContainer>
      Selecione o horário

     {horarioFilme.map((filme, index) => (
          <Horario filme={filme}
          key={filme.id}/>
          
        ))}

      <FooterContainer data-test="footer">
        <div>
          <img src={filme.posterURL} alt="poster" />
        </div>
        <div>
          <p>{filme.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  font-size: 20px;
  height: 100vh;
`;
