import { React } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';

const Container = styled.div`
    width: 100%;
    height: 100%;
    // opacity: 90%;
    position: fixed;
    display: flex;
    align-items: center;
    top: 0;
    background: black ;
    // background-color: rgba(0,0,0,0.9);
`;

const Left = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Image = styled.img`
    max-height: 90vh;
    margin-bottom: 5px;
    transition: all 0.5s ease;

    @media (max-width: 900px) {
        max-width: 90vw;
        max-height: initial;
      }

`;

const Right = styled.div`

`;


const Close = styled.div`

`;


const Modal = ({src, setImgClicked, ref}) => {

  return (
    <Container>
        <Left>
            <Image src={src} ref={ref}></Image>
        </Left>
        <Right>
            
            
        </Right>
    </Container>
  )
}

export default Modal
