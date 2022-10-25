import styled from 'styled-components'
import Search from './components/Search';
import { createGlobalStyle } from 'styled-components'

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
`


function App() {
  return (
    <Container>
      <Wrapper>
        <Title>Tag Flickr</Title>
        <Search/>
      </Wrapper>

    </Container>
  );
}

export default App;
