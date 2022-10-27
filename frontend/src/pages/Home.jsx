import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Search from '../components/Search'
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {GETIMAGE_API} from "../asset/API_Endpoints";

const Container = styled.div`
    width: 900px;
    background-color: #ffffff;
    margin: auto;
    display:flex;
    flex-direction: column;
    align-content: center;
    justify-items: center;

`;
const Top = styled.div`
    flex: 1;
`;



const Wrapper = styled.div`
    margin-top: -50px;
    width: 900px;
    height: ${props => props.height};
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    transition: all 0.5s ease;
    // background-color: black;
`;

const Title = styled.div`
    margin-bottom: 40px;
    font-size: 80px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;
`

const Error = styled.span`
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    margin-top: 40px;
    font-size: 18px;
`;


const Bottom = styled.div`
    flex: 1;
    display: ${props => props.display};
`;

const BottomWrapper = styled.div`
    width: 900px;
    height: fit-content;
    min-height: 60vh;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: start;
    transition: all 0.5s ease;
`;

const BottomTitle = styled.div`
    font-size: 25px;
    margin-left: 90px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;
`;

const BottomText = styled.div`
    margin-left: 300px;
    margin-top: 15vh;
    font-size: 18px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;
`;

const Tags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
`;

const Tag = styled.li`
    width: auto;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    margin: 0 4px 8px 4px;
    background: #0052cc;
`;

const TagTitle = styled.span`
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
`;

const ImageWall = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 20vh;
    margin-top: 20px;
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: start;
    justify-content: start;
`;

const Image = styled.img`
    height: 250px;
    margin-right: 5px;
    margin-bottom: 5px;
`;


const Home = () => {

    /* React Hooks */
    const [search, setSearch] = useState(false);

    const [tags, setTags] = useState([]); // list of tags shown in search bar

    const [searchedTags, setSearchedTags] = useState([]); // list of tags shown after click the search icon

    const [error, SetError] = useState(null); // error message when users try to search with empty
  
    const [imgURL, setImgURL] = useState([]); // list of url of images matched by tags

    const [loading, setLoading] = useState(false);

    /* Function for fetching data and implementing search action */
    const handleSearch = ()=> {
      if(tags.length !== 0){
        SetError(null);
        setSearch(true)
        setSearchedTags(tags);
        
        // Fetch data from backend
        fetchData();

      } else{
        SetError("Try adding some tags pls...... P3P")
      }
    }

    let tags_string = "";
    tags.forEach((element,index)=>{
      if(index!==tags.length-1){
        tags_string+=element + ",";
      } else{
        tags_string += element;
      }
    })
    const fetchData =  () => 
    {
      console.log(GETIMAGE_API+"?name="+tags_string);
      setLoading(true);
      fetch(GETIMAGE_API+"?name="+tags_string)
      .then(response => response.json())
      .then(data => {
        const result = []
        data.forEach((item)=> {
          result.push(item);
        })
        setImgURL(result);
      })
      .finally(() => {
        setLoading(false);
        console.log(imgURL)
    });
    }


  return (
    <>
      <Container>
        <Top>
          <Wrapper height={search?"40vh":"100vh"}>
              <Title>Tag Flickr</Title>
              <Search onSearch={handleSearch} tags={tags} setTags={setTags}/>
              <Error>{error}</Error>
          </Wrapper>
        </Top>
        <Bottom display={search?"initial":"none"}>
          <BottomWrapper >
            <BottomTitle>Result with tags: </BottomTitle>
            
            <Tags>
              {
                searchedTags.map((tag, index) => (
                  <Tag key={index}>
                    <TagTitle>{tag}</TagTitle>
                  </Tag>
                ))
              }
            </Tags>
            <ImageWall>
              {
                loading ?  <CircularProgress style={{"marginLeft":"390px","marginTop": "15vh"}} color="inherit"/>
                        :  
                        imgURL.length === 0 ?<BottomText>Sorry no data yet : (</BottomText>
                                            : imgURL.map((ele, i) => {
                                              return(
                                                <Image key={i} src={ele.url}></Image>
                                              )
                                            })
              }
              {/* <Image src='http://res.cloudinary.com/daa5eazth/image/upload/v1666848298/tmkyq2fffntj6xo1ywce.jpg'></Image>
              <Image src='http://res.cloudinary.com/daa5eazth/image/upload/v1666848227/azdejip9vtkzks9mhlui.jpg'></Image>
              <Image src='http://res.cloudinary.com/daa5eazth/image/upload/v1666848374/hbk09r22mmllnxvnw5wn.jpg'></Image>
              <Image src='http://res.cloudinary.com/daa5eazth/image/upload/v1666848421/kgdlynzvwcrrux70dcx0.jpg'></Image> */}

              
            </ImageWall>
            
          </BottomWrapper>
        </Bottom>

      </Container>
      
      <Footer/>
    </>

  )
}

export default Home
