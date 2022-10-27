import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


const SearchContainer = styled.div`
    min-width: 80%;
    border: 0.5px solid lightgray;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: fit-content;
`;

const Warning = styled.span`
    color: red;
    display: ${hidden => hidden ? "none" : "initial"};
`;

const TagContainer = styled.ul`
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

const Input = styled.input`
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    border: none;
    font-size: 16px;
    background-color: transparent;    
    flex: 8;
    padding: 11px;
		&:focus {
			outline: none;
		}
`;

const Search = (props) => {
  const {onSearch, tags, setTags} = props;

  // Adding new tag to input bar
	const addTags = event => {
    const input = event.target.value;
    
    const lower = tags.map(element => {  // Create a new list that contains all tags but in lower case for duplication testing reason
      return element.toLowerCase();      
    });

		if (input !== "") {
      if (lower.indexOf(input.toLowerCase()) === -1){  // Duplication testing, -1 means there not existing the element in the list
        setTags([...tags, input]);
        event.target.value = "";
      }

		}
	};

  // Removing a tag from the input bar
  const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};

  return (
    <SearchContainer>
        <Warning></Warning>
        <TagContainer>
          {
            tags.map((tag, index) => (
              <Tag key={index}>
                <TagTitle>{tag}</TagTitle>
                <CloseIcon onClick={()=> removeTags(index)} style={{marginTop:"2px", marginLeft:"7px",fontSize:"17px",cursor: "pointer"}}/>
              </Tag>
            ))
          }
        </TagContainer>
        <Input type="text" onKeyUp={event => event.key === "Enter" ? addTags(event) : null} placeholder="Press enter to add tags"/>
        <SearchIcon style={{color: "gray", flex: 1, cursor:"pointer"}} onClick={()=>onSearch()}/>
    </SearchContainer>

  )
}

export default Search
