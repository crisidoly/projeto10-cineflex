import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Assento from "./Assento.jsx";

export default function SeatsPage({setInfoCompra, infoFilme}) {
  const [idSessao, setIdSessao] = useState([]);
  const [assentos, setAssentos] = useState([]);
  const [assentoSelecionado, setAssentoSelecionado] = useState([])
  const [infoComprador, setInfoComprador] = useState({ name: "" , cpf: ""})

  const navigate = useNavigate()

  const parametros = useParams();
  let teste = "";

  useEffect(() => {
    const fetchFilme = async () => {
      try {
        const response = await axios.get(
          `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`
        );
        setIdSessao(response.data);
        setAssentos(response.data.seats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilme();
  }, []);

  function selecionarAssento(botaoAssento){
    if (!botaoAssento.isAvailable) {
        alert("Esse assento não está disponível");
        return;
    }

    const isSelected = assentoSelecionado.some((s) => s.id === botaoAssento.id);
        const updatedSeats = isSelected
            ? assentoSelecionado.filter((s) => s.id !== botaoAssento.id)
            : [...assentoSelecionado, botaoAssento];

        setAssentoSelecionado(updatedSeats);
  }

  
  function Formulario(e) {
      setInfoComprador({...infoComprador, [e.target.name]: e.target.value})
    }
    
    function comprarIngresso(e){
      e.preventDefault()

      if (assentoSelecionado.length === 0) {
        alert('Selecione um assento.')
        return
      }

      const ids = assentoSelecionado.map((a) => a.id)
      const data = {
        infoComprador,
        ids
      }
      const promise = axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', data)

      promise.then((res) => {

        const infos = {
            movie: infoFilme.title,
            date: idSessao.day.weekday,
            hour: idSessao.name,
            url: idSessao.movie.posterURL,
            buyer: infoComprador.name,
            cpf: infoComprador.cpf,
            seats: assentoSelecionado.map((a) => a.name)
        }
        setInfoCompra(infos)
        navigate("/sucesso")
      })
      promise.catch((err) => {
        console.log(err)
      })
    }

  return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((botaoAssento) => (
                <Assento botaoAssento={botaoAssento}
                  key={botaoAssento.id}
                  selecionarAssento={() => selecionarAssento(botaoAssento)}
                  assentoSelecionado={assentoSelecionado.some((s) => s.id === botaoAssento.id)}
                  />
          
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status={"selected"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={"available"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status={"unavailable"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={comprarIngresso}>
                Nome do Comprador:
                <input 
                    data-test="client-name"
                    required
                    type="text"
                    id = "name"
                    name = "name"
                    value={infoComprador.name}
                    placeholder="Digite seu nome..." 
                    onChange={Formulario}
                />

                CPF do Comprador:
                <input 
                    data-test="client-cpf"
                    required
                    type="text"
                    id = "cpf"
                    name = "cpf"
                    value={infoComprador.cpf}
                    placeholder="Digite seu CPF..." 
                    onChange={Formulario}
                />

                <button type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    {/* <img src={idSessao.movie.posterURL} alt="poster" /> */}
                </div>
                <div>
                    <p>{infoFilme.title}</p>
                    {/* <p>{idSessao.day.weekday} - {idSessao.name}</p> */}
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
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
`