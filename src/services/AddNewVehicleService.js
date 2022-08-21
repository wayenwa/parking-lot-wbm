import { LOTS_FOR_SMALL_VEHICLE, LOTS_FOR_MEDIUM_VEHICLE, LOTS_FOR_LARGE_VEHICLE, LOT, INITIAL_ROWS } from '../shared/constants';

const getNearestSlotOfRow = (lots, availableRowSlots, newEntryPoint, combinedRowLots, size) => {
    let result = [];
    
    lots.map((lot) => {
        if(AddNewVehicleService.isUsingOtherRow(size, availableRowSlots, combinedRowLots, newEntryPoint) === false){
            /** Look for other available slot in current row */
            availableRowSlots.map((slot) => {
                if(parseInt(slot) === parseInt(lot)){
                    result.push(lot);
                }
            })
        }else{
           console.log('HERE')
            /** Look for other available slot in other rows */
            let newLots = AddNewVehicleService.alternativeSlotsForVehicle(newEntryPoint, combinedRowLots,size)
            // console.log(newLots)
            if(newLots.length >= 1){
                newLots.map((slot) => {
                    if(parseInt(slot) === parseInt(lot)){
                        result.push(lot);
                    }
                })
            }
        }
    })
    return result

}


const AddNewVehicleService = {
    validate: function(size, lot, time) {
        return ( size !== '' && lot !== '' && time !== '') ? true : false
    },
    getAvailableSlot : function (size, availableRowSlots ,newEntryPoint,combinedRowLots) {
        var lots = (size === 'S') ? LOTS_FOR_SMALL_VEHICLE : ( size === 'M' ) ? LOTS_FOR_MEDIUM_VEHICLE : LOTS_FOR_LARGE_VEHICLE;
        var slots = availableRowSlots;
       
        if(( INITIAL_ROWS.includes(newEntryPoint) === false  ) ){
            lots = lots.reverse()
            slots = availableRowSlots.reverse()
        }
        return   getNearestSlotOfRow(lots, slots, newEntryPoint, combinedRowLots, size)[0]
    },
    setAvailableSlot: function(availableSlots, availedSlot) {
        var array = [...availableSlots];
        let remaining = array.filter(data => data != availedSlot)
        return ( remaining.length >= 1 ) ? remaining : [];
    },getOtherRowSlotUsed: function(newEntryPoint, combinedRowLots) {
        if(newEntryPoint === 'A'){
            return  ( combinedRowLots[1].length >= 1 ) ? 'B' : 'C'; 
        }else if(newEntryPoint === 'B'){
            return ( combinedRowLots[0].length >= 1 )? 'A' : 'C'; 
        }else{
            return ( combinedRowLots[2].length >= 1 )? 'B' : 'A';
        }
    },alternativeSlotsForVehicle: function(newEntryPoint, combinedRowLots,size) {
        let newLots = [];
        if(newEntryPoint === 'A'){
            newLots = ( this.checkThereIsAvailableSlotForRowSize(size, combinedRowLots[1]) ) ? combinedRowLots[1] : combinedRowLots[2]; // will use B else C
        }else if(newEntryPoint === 'B'){
            newLots = ( this.checkThereIsAvailableSlotForRowSize(size, combinedRowLots[0]) )? combinedRowLots[0] : combinedRowLots[2]; // will use A else C
        }else{
            newLots = ( this.checkThereIsAvailableSlotForRowSize(size, combinedRowLots[1]) )? combinedRowLots[1] : combinedRowLots[0]; // will use C else A
        }
        
        return newLots
    },isUsingOtherRow : function(size, availableRowSlots, combinedRowLots, ePoint) {
        if(availableRowSlots.length === 0){
            return true
        }else{
            let result = [];
            
            var lots = (size === 'S') ? LOTS_FOR_SMALL_VEHICLE : ( size === 'M' ) ? LOTS_FOR_MEDIUM_VEHICLE : LOTS_FOR_LARGE_VEHICLE;
            lots.map((lot) => {
                availableRowSlots.map((slot) => {
                    if(parseInt(slot) === parseInt(lot)){
                        result.push(lot);
                    }
                })
            })
            return ( result.length >= 1 ) ? false : true
        }
    },checkThereIsAvailableSlotForRowSize  : function(size, lots) {
        if(size === 'S' && lots.length >= 1){
            return true
        }else{
            let slots = (size === 'M') ? LOTS_FOR_MEDIUM_VEHICLE : LOTS_FOR_LARGE_VEHICLE
            slots.map((lot) => {
                return ( lots.includes(lot) ) ? true : false
            })
        }
    }
    
};

export default AddNewVehicleService;