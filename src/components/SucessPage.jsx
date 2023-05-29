import styled from "styled-components"

export default function SucessPage({infoCompra}){

  console.log(infoCompra)

  return(
    <PageContainer>
      <h1>Pedido feito <br /> com sucesso!</h1>

      <TextContainer>
          <strong><p>Filme e sessão</p></strong>
          <p>{infoCompra.movie}</p>
          <p>{infoCompra.date} - {infoCompra.hour}</p>
      </TextContainer>

      <TextContainer>
          <strong><p>Ingressos</p></strong>
          {infoCompra.seats.map(s => <p>Assento {s}</p>)}
      </TextContainer>

      <TextContainer>
          <strong><p>Comprador</p></strong>
          <p>{infoCompra.buyer}</p>
          <p>{infoCompra.cpf}</p>
      </TextContainer>

      <button>Voltar para Home</button>

      <FooterContainer data-test="footer">
        <div>
          <img src={infoCompra.url} alt="poster" />
        </div>
        <div>
          <p>{infoCompra.movie}</p>
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
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
  }
  h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247A6B;
  }
`

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

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`