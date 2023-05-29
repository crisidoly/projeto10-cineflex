import styled from "styled-components"
import {  useState } from "react";
import { useEffect } from "react";


export default function Assento({botaoAssento, selecionarAssento, assentoSelecionado}){
  const [status, setStatus] = useState("available")
  console.log(botaoAssento)

  useEffect(() => {
    if(assentoSelecionado){
      setStatus("selected")
    } else if(botaoAssento.isAvailable === true){
      setStatus("available")
    } else {
      setStatus("unavailable")
    }
  })

  return(
  <SeatItem data-test="seat" onClick={selecionarAssento} status={status}><p>{botaoAssento.name}</p></SeatItem>
  )


}

const SeatItem = styled.div`
    border: 1px solid ${(props) => {
        if (props.status === "selected"){
            return "#0E7D71"
        } else if(props.status === "available"){
            return "#7B8B99"
        } else {
            return "#F7C52B"
        }
    }};
    background-color: ${(props) => {
        if (props.status === "selected"){
            return "#1AAE9E"
        } else if(props.status === "available"){
            return "#C3CFD9"
        } else {
            return "#FBE192"
        }
    }};
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