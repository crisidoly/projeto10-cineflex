import styled from "styled-components"


export default function Assento({botaoAssento}){

  console.log(botaoAssento)

  return(
  <SeatItem><p>{botaoAssento.name}</p></SeatItem>

  )


}

const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    `