import styled from "styled-components";

export const EntryPoint = styled.span`
    height: 75px;
    line-height: 75px;
    width: 100%;
    color:#fff;
    display: block;
    background : ${(props) => (!props.isEnabled) ? 'gray' : (props.bg === 'bg-entrance') ? 'limegreen' : 'rgb(189, 112, 112)'};
    word-break: break-all;
    text-align:center;
    cursor: pointer;
`