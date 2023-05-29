import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"

export default function Horario({filme}) {
  const navigate = useNavigate();
  
 

  let ola = "";

  if (filme && filme.showtimes) {

    function navegar() {
      navigate (`/assentos/:idSessao/${filme.showtime.id}`,{state:{idSessao: filme.showtime.id}})
    }
    
    ola = 
    (
    <div>
      <SessionContainer>
        <p>{filme.weekday}</p> - {filme.date}
        <ButtonsContainer>
          
            {filme.showtimes.map(i => { return ( 
            <Link to={`/assentos/${i.id}`}>
            <button onClick={() => navegar}> {i.name} </button> 
            </Link>
            ) } )}
         
        </ButtonsContainer>
      </SessionContainer>
    </div>
      
    )
  }

 
  return (
    <>
    {ola}
    </>
  )
}

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;