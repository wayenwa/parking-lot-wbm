import React from 'react';
import Lot from '../Lot';
import EntryPoint from '../EntryPoint';

const uniqid = require('uniqid');

function Row(props) {
    const label = (lable) => {
        switch(lable){
            case 'A' :
                return 'D';
            case 'B' :
                return 'E';
            case 'C' :
                return 'F';
        }
    }
    const render = () => {
        
        let data = props.data;
        let content = [];
        
        Object.keys(data).forEach(function(k) {
            content.push(
                <div className='col-md-12 p-row' key={ uniqid() }>
                    <EntryPoint point="1" row={ k }/>
                    <div className='col-10 left'>
                        {
                            <Lot data={ data[k] } occupiedSlots={ props.occupiedSlots } lotKey={ k } selectVehicle= { props.selectVehicle }/>
                        }
                    </div>
                    <EntryPoint  point="2" row={ label(k) }/>
                    <div className='clear'></div>
                </div>
            )
        });

       

        return content;
    }
    return (
        <div>
           { render() }
        </div>
    )
}

export default Row;
