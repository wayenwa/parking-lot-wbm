import React from 'react';
import { Container } from 'react-bootstrap';

export default function Maintainance(props) {
  return (
    <Container>
      <div className='col-md-4 col-xs-12 left'>
        <div>Vehicle type:</div>
        <ul>
                <li>Small - Motorcycle</li>
                <li>Medium - Car</li>
                <li>Large - Truck</li>
        </ul>

        <div>*** Click vehicle icon from the map to show Exit details.</div>
        <div>*** Toggle to enable/disable entry/exit points.</div>
      </div>
    </Container>
  );
}


