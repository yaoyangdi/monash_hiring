import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRef, useState } from "react";
import FormInput from '../components/FormInput';
import FormTagInput from '../components/FormTagInput';

import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const Container = styled.div`
    width: 100vw;
    height: 780px;
    display: flex;
    flex-direction: column;
`;

const Top = styled.div`
    flex: 1;
    margin-top: 20px;

    width: 100vw;
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
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: start;

`;

const ImageContainer = styled.div`
    width: 670px;
    height: fit-content;
    max-height: 700px;
    margin-left: 20px;
    box-shadow:  2px 2px 7px #000000;
`;

const Right = styled.div`
    flex: 1;
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


const Image = styled.img`
    width: 100%;
`;

const NewTag = () => {
    const navigate  = useNavigate();

    const [tags, setTags] = useState([]); // list of tags shown in input bar

    const fileInputRef = useRef();

    let empty = true;

    const [values, setValues] = useState({   // use JSON object instead of using useState hook multiple times
        title: "",
        tags: null,
        image: undefined
    });

    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    useEffect(()=> {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        }
        else{
            setPreview(null);
        }
    })

    const onChange = (e) => {
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

    

    // Handle submit
    const handleSubmit = (e) =>{
        // setValues({...values, ['tags']: tags !== null && tags});
        
        e.preventDefault();  // prevent refresh the page by default
        values.tags = tags;
        console.log(values)
        try{
            fetch("", {
                method: "POST",
                body: values
            })
            .then(
                response => response.json(),
            )
            .then(
                res => res.success ? onSuccessSubmit() : null
            )
        }
         catch(err) {
            console.log(err)
        }
    }

    const onSuccessSubmit = ()  => {
        setValues({   // use JSON object instead of using useState hook multiple times
            title: "",
            tags: [],
            image: ""
        })
        setTags([]);
        alert('Thank you for the contribution!!!');
    }

  return (
    <Container>
        <Top>
            <Back onClick={() => navigate("/")}>
                <ArrowBackIosNewIcon style={{"fontSize": "19px", "marginRight": "9px"}}/>
                Back
            </Back>
        </Top>
        <Bottom>
            <Left>
                <ImageContainer>
                    {
                        preview ? <Image src = {preview}/>
                              : <Sentence>This is a preview<span style={{"marginLeft": "30px"}}></span>XD</Sentence>
                    }
                    
                </ImageContainer>
            </Left>
            <Right>
                <Wrapper>
                    <Title>STRENGTHEN THE COMMUNITY<br></br> WITH US</Title>
                    <Form>
                        <FormInput name="title" type="text" placeholder="Title" label="Title" width="60%" value={values["title"]} onChange={onChange}/>
                        <FormTagInput name="tags" type="text" placeholder="Press Enter to add tags" label="Tags" width="63%" tags={tags} setTags={setTags}/>
                        <FormInput name="image" type="file" placeholder="Display Picture" label="Display Picture" width="60%" value={values["image"]} onChange={onChange} style={{"marginLeft":"-10px"}} ref={fileInputRef}/>
                    </Form>

                    <Button onClick={handleSubmit}>{"Shall we?  >>"}</Button>

                </Wrapper>
            </Right>
        </Bottom>
</Container>
  )
}

export default NewTag
