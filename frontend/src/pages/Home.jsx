import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import Search from '../components/Search'
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {GETIMAGE_API} from "../asset/API_Endpoints";

/**
 * Use styled components to supply a css class
 */
const Container = styled.div`
    width: 900px;
    background-color: #ffffff;
    min-height: 92vh;
    margin: auto;
    display:flex;
    flex-direction: column;
    align-content: center;
    justify-items: center;
    
    @media (max-width: 900px) {
      width: 100%;
      min-height: 98vh;
      // background-color: black;
    }
`;

const Top = styled.div`
    flex: 1;
`;

const Wrapper = styled.div`
    margin-top: -2%;
    width: 900px;
    height: ${props => props.height};
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    transition: all 0.5s ease;
    // background-color: black;

    @media (max-width: 900px) {
      width: 100%;
      height:  ${props => props.mobileHeight};
      margin-top: ${props => props.top};
      // background-color: black;
    }
`;

const Title = styled.div`
    margin-bottom: 40px;
    font-size: 80px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;
    cursor: pointer;

    @media (max-width: 900px) {
      font-size: 45px;
    }
`

const Error = styled.span`
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    margin-top: 40px;
    padding-bottom: 20px;
    font-size: 18px;
    display: ${props=>props.display};


    @media (max-width: 900px) {
      font-size: 14px;
    }
`;


const Bottom = styled.div`
    flex: 1;
    display: ${props => props.display};
`;

const BottomWrapper = styled.div`
    margin-top:-3%;
    width: 100%;
    height: fit-content;
    min-height: 60vh;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: start;
    transition: all 0.5s ease;
    margin-left: 10%;
    margin-right: 10%;
    @media (max-width: 900px) {
      margin-top:-1%;
      margin-left: 5%;
      margin-right: 5%;
    }

    @media (max-width: 500px) {
      margin-top:-8%;
      margin-left: 5%;
      margin-right: 5%;
    }

`;

const BottomTitle = styled.div`
    font-size: 25px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;

    @media (max-width: 900px) {
      font-size: 18px;
    }
`;

const BottomText = styled.div`
    margin-left: 25%;
    margin-top: 15vh;
    font-size: 18px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    transition: all 0.5s ease-out;

    @media (max-width: 900px) {
      margin-left: 20%;
      font-size: 14px;
    }
`;

const ImageWall = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 20vh;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: start;
    justify-content: start;
`;

const Image = styled.img`
    max-height: 280px;
    max-width: 100%;
    margin-right: 5px;
    margin-bottom: 5px;

    @media (max-width: 900px) {
      max-height: 140px;
    }
`;

const Recommend = styled.div`
    display: ${props=>props.display};
    // background-color: black;
    flex-wrap: wrap;
    align-content: center;
    font-size: 17px;
    height: 10vh;
    width: 80%;
    margin-top: 2vh; 
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;

    @media (max-width: 900px) {
      font-size: 14px;
      margin-left: -9%;
    }
`;


const Tags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
`;

const Tag = styled.li`
    width: fit-content;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    background: #0052cc;
    margin: -2px 4px 10px 2px;
    cursor: pointer;

    @media (max-width: 900px) {
      height: 23px;
      font-size: 12px;
    }
`;

const TagTitle = styled.span`
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
`;

const Loader = styled.div`
    margin-left:35%;
    margin-top: 15%;
`;

const Home = () => {

    /* React Hooks */
    const [search, setSearch] = useState(false); // used to track if users have clicked search icon

    const [tags, setTags] = useState([]); // list of tags shown in search bar

    const [searchedTags, setSearchedTags] = useState([]); // list of tags shown in the result section

    const [error, SetError] = useState(null); // error message when users try to search without tags
  
    const [imgURL, setImgURL] = useState([]); // list of images data matched by tags fetched from API

    const [loading, setLoading] = useState(false);  // used to track when the data has been fetched

    const [emptyError, setEmptyError] = useState(false); // used when search with empty error
    /**
     * Functions
    */
    /* Function for fetching data and implementing search action */
    const handleSearch = ()=> {
      if(tags.length !== 0){
        setEmptyError(false); 
        SetError(null);
        setSearch(true);
        setSearchedTags(tags);
        
        // Fetch data from backend
        fetchData();

      } else{
        setEmptyError(true); 
        SetError("Try adding some tags pls...... P3P")
      }
    }

    /* Format list of tags in String format to support query parameter */
    let tags_string = "";     // this is the string appended to the URL
    tags.forEach((element,index)=>{
      if(index!==tags.length-1){
        tags_string+=element + ",";
      } else{
        tags_string += element;
      }
    })
    /* Function for fetching data */
    const fetchData =  () => 
    {
      console.log(GETIMAGE_API+"?name="+tags_string); // We define the API URL and then fetch data
      setLoading(true);
      fetch(GETIMAGE_API+"?name="+tags_string)
      .then(response => response.json())
      .then(data => {
        const result = []         
        data.forEach((item)=> {
          result.push(item);
        })
        setImgURL(result);      // Assign the list of related image entities to imgURL
      })
      .finally(() => {
        setLoading(false);
        console.log(imgURL)
    });
    }

  /* Function used when user click on the recommended tags */
  const handleClick = (txt) => {
    /* Function to check if the tag already exists in the search bar */
    const isDuplicated = (arr, ele) => {
      let duplicated = false;
      arr.forEach((i)=>{
        if (ele === i) {
          duplicated= true;
        }
      })
      return duplicated;
    }

    if (!isDuplicated(tags, txt)) {
      setTags([...tags, txt])
    }
  }

  /* Function used for refreshing page when users clicking on title */
  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <>
      <Container>
        {/* Top part */}
        <Top>
          <Wrapper height={search?"50vh":"100vh"} mobileHeight={search?"30vh":"100vh"} top={search?"-5%":"0%"}>
              <Title onClick={()=>refreshPage()}>Tag Flickr</Title>
              <Search onSearch={handleSearch} tags={tags} setTags={setTags}/>
              <Error display={emptyError ? "inline-flex": "none"}>{error}</Error>
              <Recommend  display={search? "none": "inline-flex"}>No idea? Try <span style={{"width":"10px"}}>  </span>
                <Tag onClick={()=>handleClick("monash university")}>
                    <TagTitle>monash university</TagTitle>
                </Tag>
                <Tag  onClick={()=>handleClick("sea")}>
                    <TagTitle>sea</TagTitle>
                </Tag>
                <Tag  onClick={()=>handleClick("shark")}>
                    <TagTitle>shark</TagTitle>
                </Tag>
              </Recommend>
          </Wrapper>
        </Top>

        {/* Bottom part */}
        <Bottom display={search?"initial":"none"}>
          <BottomWrapper >
            <BottomTitle>Result with tags: </BottomTitle>

            {/* Display result of tags selected */}
            <Tags>
              {
                searchedTags.map((tag, index) => (
                  <Tag style={{cursor:"auto"}} key={index}>
                    <TagTitle>{tag}</TagTitle>
                  </Tag>
                ))
              }
            </Tags>

            {/* Display image selected / Display NA annotation if no any image shown */}
            <ImageWall>
              {
                loading ? <Loader>
                            <CircularProgress color="inherit"/>
                          </Loader> 
                        :  
                        imgURL.length === 0 ?<BottomText>Sorry no data yet : (</BottomText>
                                            : imgURL.map((ele, i) => {
                                              return(
                                                <Image key={i} src={ele.url}></Image>
                                              )
                                            })
              }

            </ImageWall>
            
          </BottomWrapper>
        </Bottom>
      </Container>

      {/* Footer only shown inside Home page */}
      <Footer/>   
    </>

  )
}

export default Home
