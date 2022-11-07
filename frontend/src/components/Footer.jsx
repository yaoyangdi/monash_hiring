import { Link } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100vw;
    display: flex;
    margin-top: 30px;
    padding-bottom: 30px;
    align-items: center;
    justify-content: center;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;

    @media (max-width: 900px) {
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 14px;
    }
`;

const Footer = () => {
  return (
    <Container>
      Want to contribute?
      <Link href='/newTag' style={{"marginLeft":"30px","textDecoration":"none", "color": "#FF9999"}}>Click here</Link>
    </Container>
  )
}

export default Footer
