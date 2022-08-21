import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Moment from 'react-moment';
const uniqid = require('uniqid');

function Details(props) {
    // console.log(props)
    const renderOccupancyData = () => {
        let data = props.occupancyData[0];
        let icon = ( data.car_size === 'S' ) ? 'fa-motorcycle' : ( data.car_size === 'M' ) ? 'fa-car' : 'fa-truck';
        let type = ( data.car_size === 'S' ) ? 'Motorcycle' : ( data.car_size === 'M' ) ? 'Car' : 'Truck';
        return (
            <div className='text-center'>
                
                <div><i className={"fa "+icon}></i></div>
                { type }
                {/* { data.time_of_entry.toString() }  */}
                <div><Moment format="DD/MM/Y HH:mm">{data.time_of_entry}</Moment></div>
            </div>
        )
    }


    let type = ( props.data.type === 'SP') ? 'SMALL LOT' : (props.data.type === 'MP') ? 'MEDIUM LOT' : 'LARGE LOT';
    return (
        <div className='text-center' key={uniqid()}>
            { type }
            { (props.occupancyData.length >= 1) ? renderOccupancyData() : '' }
        </div>
    )
}

export default Details;
