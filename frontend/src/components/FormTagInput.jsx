import { useState } from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';


const Label = styled.span`
    width: 100%;
    font-size: 12px;
    margin-bottom: 2px;
`;
const InputContainer = styled.label`
    display: flex;
    flex-wrap: wrap;
    margin: 10px 25px 0px 20px;
    color: gray;
    width:  ${props=>props.width};
    min-height: 40px;
`;

const Tag = styled.li`
    width: auto;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    margin: 0 8px 8px 0;
    background: #0052cc;
`;

const TagTitle = styled.span`
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 14px;
    height: 15px;
    
    width: 100%;
    &:focus {
        outline: none;
    }
`;

const FormTagInput = (props) => {
    const {label, errorMessage, onChange, width, tags, setTags, ...inputProps} = props;

    // Adding new tag to input bar
    const addTags = event => {
        const input = event.target.value;

        const lower = tags.map(element => {  // All tags in lower case for duplication testing
          return element.toLowerCase();
        });

		if (input !== "") {
            if (lower.indexOf(input.toLowerCase()) === -1){  // Duplication testing
                setTags([...tags, input]);
                event.target.value = null;
            }

		}
	};

    // Removing a tag from the input bar
    const removeTags = indexToRemove => {
	    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    return (
      <InputContainer width={width}>
          <Label>{label}</Label>
          {
              tags.map((tag, index) => (
                <Tag key={index}>
                  <TagTitle>{tag}</TagTitle>
                  <CloseIcon onClick={()=> removeTags(index)} style={{marginTop:"2px", marginLeft:"7px",fontSize:"17px",cursor: "pointer"}}/>
                </Tag>
              ))
          }
          <Input  {...inputProps} onChange={onChange} onKeyUp={event => 
            event.key  === 'Enter' ? addTags(event) : null}>

          </Input>
      </InputContainer>
    
    )
}

export default FormTagInput