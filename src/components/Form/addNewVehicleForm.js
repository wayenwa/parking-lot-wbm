import React, { useEffect ,useState} from 'react';
import { FormStyle } from '../../styles/Form.styled';
import { Form } from 'react-bootstrap';
import { CAR_TYPE_LABEL , ENTRY_POINTS} from '../../shared/constants';
import SubmitBtn from '../Buttons/submitBtn';
import { store } from '../../store/entryPointStore';
import DatePicker from '../DatePicker';

const uniqid = require('uniqid');

export default function AddNewVehicle(props) {
    
    const [ entryPoints, setEntryPoints ] = useState([]);

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    },[]);
    const updateState = () =>{
        const state = store.getState();
        setEntryPoints(state.INITIAL_ENTRY_POINTS)
    }
    const options = () => {
        let content = []

            Object.keys(CAR_TYPE_LABEL).forEach(function(type,label) {
                content.push( <option value={ type } key={uniqid()}>{ CAR_TYPE_LABEL[type] }</option> )
            })
        return content
    }
    const options2 = () => {
        let content = []
            entryPoints.map((e) => {
                content.push( <option value={ e } key={uniqid()}>{ e }</option> )
            })
        return content
    }
   
  return (
        <FormStyle>
            <h3>Add New Vehicle</h3>
            <div className='err'>{ props.err }</div>
            <Form.Group className="mb-3">
                <Form.Label className='left'>
                    Vehicle type:
                </Form.Label>
                <Form.Select name="type" onChange={ props.handleChange } value={ props.addSizeValue }>
                    <option value="">-- Select vehicle type--</option>
                    { options() }
                   
                </Form.Select>
                
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label className='left'>
                    Entry Point:
                </Form.Label>
                <Form.Select name="entry_point" onChange={ props.handleChange } value={ props.addEntryPointValue }>
                    <option value="">-- Select entry point--</option>
                    { options2() }
                
                </Form.Select>
                
            </Form.Group>

            <Form.Group className="mb-3">
                
                <DatePicker name="time"  onChange={ props.handleChange }/>
                
            </Form.Group>

            <SubmitBtn
                title = "Park a vehicle"
                type= "vehicle"
                handleClick = { props.submit }
            />
        </FormStyle>
  );
}


