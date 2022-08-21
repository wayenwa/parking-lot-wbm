import styled from "styled-components";

export const Button = styled.button`
    background : ${(props) => (props.type === 'entrypoint') ? 'skyblue' : 'blue'};
    padding:5px;
    width: 100%;
    border-radius: 5px !important;
    color: #fff;
`