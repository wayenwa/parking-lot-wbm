import React from 'react';

import Row from '../Row';
import { Col,Container } from 'react-bootstrap';
import '../../styles/style.css';

export default function Map(props) {
    return (
        <Col>
            <Container className='col-10 p-slot'>
                { <Row
                    data            = { props.data }
                    occupiedSlots   = { props.occupiedSlots }
                    selectVehicle       = { props.selectVehicle }
                    
                /> }
            </Container>
        </Col>
    )
}
