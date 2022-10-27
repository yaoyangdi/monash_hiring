import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRef, useState } from "react";
import FormInput from '../components/FormInput';
import FormTagInput from '../components/FormTagInput';

import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {ADDIAMGE_API} from "../asset/API_Endpoints";
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Use styled components to supply a css class
 */
const Container = styled.div`
    width: 100vw;
    height: 780px;
    display: flex;
    flex-direction: column;
    opacity: ${props => props.opacity};
`;

const Top = styled.div`
    flex: 1;
    margin-top: 20px;

    width: 90vw;
    height: 1vh;
`;

const Back = styled.span`
    width: 100%;
    height: 100%;
    margin-left: 20px;
    font-size: 25px;
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
`;

const Bottom = styled.div`
    flex: 9;    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 850px;
    background: white;

`;

const Left = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-left: 5vw;

`;

const ImageContainer = styled.div`
    width: 650px;
    height: fit-content;
    max-height: 700px;
    margin-left: 20px;
    box-shadow:  2px 2px 7px #000000;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    margin-top: -60px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
`;

const Wrapper = styled.div`
    width: 50vw;
    padding: 20px;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;
const Title = styled.h1`
    margin-left: 20px;
    font-size: 35px;
    font-weight: 800;

`;

const Button = styled.button`
    width: fit-content;
    margin-top: 40px;
    margin-left: 20px;
    text-align: left;
    font-size: 18px;
    background-color: transparent;
    color: black;
    cursor: pointer;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    margin-right:50%;
    border: 2px solid black;
`;

const Sentence = styled.span`
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
`;

const FloatText = styled.span`
    width:100%;
    height:7em;
    font-size:27px;
    position:absolute;
    top: 35vh;
    left:13vw;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    font-weight: bold;
    transition: all 0.5s ease-out;

`;

const Image = styled.img`
    width: 100%;
`;

const NewTag = () => {
    
    /* React Hooks */
    const [tags, setTags] = useState([]); // list of tags shown in input bar

    const [loading, setLoading] = useState(false); // used for displaying spinner loader

    const [values, setValues] = useState({   // use JSON object instead of using useState hook multiple times
        title: "",
        tags: null,
        image: undefined
    });

    const [image, setImage] = useState();  // Image file uploaded
    
    const [preview, setPreview] = useState();   // Image url used for previewing the image

    const TitleRef = useRef(); // Used for persisting the form data
    const ImageRef = useRef();
    
    const navigate  = useNavigate(); // Used for redirecting routes to Home page
    
    useEffect(()=> {                                        // Use useEffect to perform side effects in components
        if (image) {                                        // Handle uploading image side effect
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }


        const keyDownHandler = event => {                   // Handle Enter keydown event side effect
            if (event.key === 'Enter') {
              event.preventDefault();
            }
        }
        document.addEventListener('keydown', keyDownHandler);

        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };    
    
    })

    const onChange = (e) => {                               // Event listener when form data is changing OR when image is uploading
        e.preventDefault(); 
        setValues({...values, [e.target.name]: e.target.value})
        if((e.target.name) === 'image') {
            const file = e.target.files[0];
            if (file){
                setImage(file);
            }else{
                setImage(null);
            }
        }
    }

    /* Function for handling form data submit */
    const handleSubmit = (e) =>{

        e.preventDefault();  // prevent refresh the page by default        
 
        const data = new FormData(e.target);
        data.append("tags", tags);

        if (e.code!=="Enter"){
            console.log("YOU CLICKED IT");

            try{                        // Send POST request to create an Image entity 
                setLoading(true);
                fetch(ADDIAMGE_API, {
                    method: "POST",
                    body: data
                })
                .then(
                    response => response.json(),
                )
                .then(
                    res => res.success ? onSuccessSubmit() : alert('Sry but try again...')
                )
                .finally(() => {
                    setLoading(false);
                });
            }
             catch(err) {
                console.log(err)
            }

    
        }
    }
      
    /* Function used for clearing form data and calling success alert */
    const onSuccessSubmit = ()  => {
        setValues({   // use JSON object instead of using useState hook for each variable
            title: "",
            tags: [],
            image: ""
        })
        setImage(null); // empty the preview image
        setTags([]);    // empty the tags of the search bar

        alert('Thank you for the contribution!!!');
    }

  return (
    <div>
            <Container opacity={loading?"10%":"100%"}>
                {/* Top only shows the Back button */}
                <Top>
                    <Back onClick={() => navigate("/")}>
                        <ArrowBackIosNewIcon style={{"fontSize": "19px", "marginRight": "9px"}}/>
                        Back
                    </Back>
                </Top>

                {/* Bottom (main body) */}
                <Bottom>
                    {/* Left for previewing image */}
                    <Left>
                        <ImageContainer>
                            {
                                preview ? <Image src = {preview}/>
                                    : <Sentence>This is a preview<span style={{"marginLeft": "30px"}}></span>XD</Sentence>
                            }
                            
                        </ImageContainer>
                    </Left>

                    {/* Right for input form data */}
                    <Right>
                        <Wrapper>
                            <Title>STRENGTHEN THE COMMUNITY<br></br> WITH US</Title>
                            <Form  onSubmit={handleSubmit}>
                                <FormInput name="title" type="text" placeholder="Title" label="Title" width="60%" value={values["title"]} onChange={onChange} ref={TitleRef}/>
                                <FormTagInput name="tags" type="text" placeholder="Press Enter to add tags" label="Tags" width="63%" tags={tags} setTags={setTags}/>
                                <FormInput name="image" type="file" placeholder="Display Picture" label="Display Picture" width="60%" value={values["image"]} onChange={onChange} style={{"marginLeft":"-10px"}} ref={ImageRef}/>

                                <Button type='submit' >{"Shall we?  >>"}</Button>

                            </Form>
                        </Wrapper>
                    </Right>
                </Bottom>
        </Container>

        {/* Spinner loader when sending request not finished */}
        {
            loading ? <div>
                        <CircularProgress style={{"width":"7em","height":"7em", "position":"absolute", "top": "50vh", "left":"43vw","opacity":"100%"}} color="inherit"/>
                        <FloatText >Server need more time to wake up, thank you for being patient ! !</FloatText>
                      </div>
                    : null
        }
    </div>

  )
}

export default NewTag
