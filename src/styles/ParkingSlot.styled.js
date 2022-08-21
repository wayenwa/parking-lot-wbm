import styled from "styled-components";

export const ParkingSlot = styled.div`
    height: 150px;
    background: gray;
    float:left;
    border: 1px dashed #fff;
    width : ${(props) => (props.width === 'SP') ? '13%' : (props.width === 'MP') ? '17%' : '20%'};
`