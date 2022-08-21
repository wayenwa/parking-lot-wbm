import React, { useEffect ,useState} from 'react';
import { EntryPoint } from '../../styles/EntryPoint.styled';
import EntryLabel from './entryLabel';
import { store } from '../../store/entryPointStore';
const uniqid = require('uniqid');

function Row(props) {
    const state = store.getState();
    const [ entryPoints, setEntryPoints ] = useState([]);

    useEffect(() => {
        updateState();
        store.subscribe(updateState);
    },[]);
    const updateState = () =>{
        const state = store.getState();
        // console.log(state.INIT_DATA)
        setEntryPoints(state.INITIAL_ENTRY_POINTS)
    }
    let isEnabled = ( state.INITIAL_ENTRY_POINTS.find(element => element === props.row )) ? true :false;

    return (
        <div className='col-1 entry-point relative'>
        <EntryLabel name={props.row}/>
        <EntryPoint bg="bg-entrance" isEnabled={ isEnabled }>Entrance</EntryPoint>
        <span className='clear'></span>
        <EntryPoint bg="bg-exit" name={props.row} isEnabled={ isEnabled }>Exit</EntryPoint>
        </div>
    )
    
    
}

export default Row;
