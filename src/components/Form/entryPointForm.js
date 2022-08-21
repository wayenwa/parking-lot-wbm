import React, { useState, useEffect  } from 'react';
import { FormStyle } from '../../styles/Form.styled';
import { ENTRY_POINTS } from '../../shared/constants';
import { store } from '../../store/entryPointStore';
import Switch from '../Buttons/switch';

const uniqid = require('uniqid');
 function ManageEntryPoints() {
    const [ entryPoints, setEntryPoints ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState('');

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    },[entryPoints]);

    const updateState = () =>{
        const state = store.getState();
        setEntryPoints(state.INITIAL_ENTRY_POINTS)
    }
   

    const handleClick = (value)=>{
        (entryPoints.length === 3 && entryPoints.find(element => element === value)) ?
            setErrorMsg('Minimum of 3 Entry Point is required.')
            : setErrorMsg('')
        

        if( entryPoints.length > 3 && entryPoints.find(element => element === value )){
            
            store.dispatch({type: 'decrement', payload : value})
            
        }else if( !entryPoints.find(element => element === value ) ){
            store.dispatch({type: 'increment', payload : value})
        }
        
        
    }
    const renderEntryPoints = () => {
        let content = [];

        ENTRY_POINTS.map((name) => {
            content.push(
                <div key={ uniqid() } className='e-point'>
                    <span className='left'>{ name }</span>
                    <Switch className='left' checked={ (entryPoints.find(element => element === name )) ? true:false} handleChange={ () => {handleClick(name)} }/>
                </div>
            )
        })

        return content;

    }

    return (
        <FormStyle>
            <h3>Manage Entry Points</h3>
            <div className='err'>{ errorMsg }</div>
            { (entryPoints.length) ? renderEntryPoints() : '' }
        </FormStyle>
  );
}
export default ManageEntryPoints;

