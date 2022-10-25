import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';



const SearchContainer = styled.div`
    width: 80%;
    border: 0.5px solid lightgray;
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 34px;
`;

const Input = styled.input`
    border: none;
    background-color: transparent;    
    flex: 9;
    padding: 11px;
`;

const Search = () => {
  const handleSearch = () => {};

  return (
    <SearchContainer>
        <Input placeholder="Search"/>
        <SearchIcon style={{color: "gray", flex: 1, cursor:"pointer"}} onClick={handleSearch()}/>
    </SearchContainer>

  )
}

export default Search
