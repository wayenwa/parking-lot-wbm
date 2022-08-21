import React from 'react';
import { Container } from 'react-bootstrap';
import AddNewVehicle from './addNewVehicleForm';
import ManageEntryPoints from './entryPointForm';

export default function Maintainance(props) {
  return (
    <Container>
      <div className='col-md-4 col-xs-12 left'>
        <AddNewVehicle
            submit  = { props.submit }
            handleChange  = { props.handleChange }
            addSizeValue  = { props.addSizeValue }
            addEntryPointValue  = { props.addEntryPointValue }
            addTimeValue        = { props.addTimeValue }
            err = { props.errAddVehicle }
        />
        
      </div>
      <div className='col-md-4 col-xs-12 left'>
        <ManageEntryPoints

        />
        
      </div>
    </Container>
  );
}


