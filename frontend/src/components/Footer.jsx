import { Link } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100vw;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
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
