import React from 'react';
import { Button } from '../../styles/Button.styled';
export default function BasicBtn(props) {
    return (
        <Button onClick={ props.handleClick }>
            { props.title }
        </Button>
    )
}
