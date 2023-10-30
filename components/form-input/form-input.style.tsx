import styled, { css } from 'styled-components';

const shrinkLabelStyles = css`
    top: -1px;
    font-size: 10px;
    color: gray;
`

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;
`;

export const FormInputField = styled.input`
  background: none;
  background-color: white;
  color: black;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid gray;
  margin: 25px 0;

  &:focus{
    outline:none
  }

  ${({ type }) => type === "password" && css`letter-spacing:0.3em`};
`;

interface FormInputLabelProps {
  shrink: boolean | undefined;
}

export const FormInputLabel = styled.label<FormInputLabelProps>`
  color: black;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({ shrink }) => shrink && shrinkLabelStyles};
`;
