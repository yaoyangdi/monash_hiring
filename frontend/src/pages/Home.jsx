import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Search from '../components/Search'
import { useState } from "react";

const Container = styled.div`
    width: 900px;
    background-color: #ffffff;
    margin: auto;
    display:flex;
    align-content: center;
    justify-items: center;
`;

const Wrapper = styled.div`
    margin-top: -50px;
    width: 900px;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;

    // background-color: black;
`;

const Title = styled.div`
    margin-bottom: 40px;
    font-size: 80px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;

`


const Home = () => {

    const [content, setContent] = useState(false);
    
  return (
    <>
      <Container>
        <Wrapper>
            <Title>Tag Flickr</Title>
            <Search/>
        </Wrapper>
      </Container>
      
      <Footer/>
    </>

  )
}

export default Home
