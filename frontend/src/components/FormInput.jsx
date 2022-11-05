
import styled from "styled-components";

const Label = styled.span`
    font-size: 12px
`;
const InputContainer = styled.label`
    margin: 10px 25px 0px 20px;
    color: gray;
    width:  ${props=>props.width};
    min-height: 40px;
`;
const Input = styled.input`
    flex: 1;
    padding: 10px;
    font-size: 14px;
    height: 15px;
    width: 100%;
    font-family: 'Space Grotesk', sans-serif;
    font-family: 'Space Mono', monospace;
    &:focus {
			outline: none;
		}
`;

const FormInput = (props) => {
  const {label, errorMessage, onChange, width, ...inputProps} = props;
  return (
    <InputContainer width={width}>
        <Label>{label}</Label>
        <Input  {...inputProps} onChange={onChange}></Input>
    </InputContainer>

  )
}

export default FormInput