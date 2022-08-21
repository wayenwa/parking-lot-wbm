import React from 'react';
import { ParkingSlot } from '../../styles/ParkingSlot.styled';
import Details from './details';

const uniqid = require('uniqid');

function Lot(props) {
    // console.log(props.data)
    const renderLot = () => {
        let content = [];

        let data = props.data;

        data.map((lot, index) => {
            // const filter = props.occupiedSlots.filter(
            //     (car) => parseInt(car.key) === index && parseInt(car.row) === props.lotKey
            // );
            // console.log(filter)
            let occupancyData = props.occupiedSlots.filter(data => data.row === props.lotKey && data.key === index)

           
            
            content.push(
                <ParkingSlot key={ uniqid() } width={ lot.type } onClick={ () => { props.selectVehicle(props.lotKey,index,occupancyData) }}>
                    <Details data={ lot } occupiedSlots={ props.occupiedSlots } occupancyData={ occupancyData } />
                </ParkingSlot>
            )
        })

        return content;
    }
    return renderLot()
}

export default Lot;
