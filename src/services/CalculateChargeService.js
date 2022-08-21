import { FLAT_RATE ,LOT, FLAT_RATE_HR_LIMIT, ONE_DAY_RATE} from '../shared/constants';

const CalculateChargeService = {
    chagePerHour: function(key) {
        return LOT[key].chargePerHour
    },
    total: function(data, extTime) {
        let total = 0;
        let entryTime = data.time_of_entry;
        let perHourCharge = data.charge_per_hour;
        let totalHours = Math.ceil( Math.abs(extTime - entryTime) / 36e5 );

        if(totalHours >= 24){
            let NumOfDays = totalHours / 24; 
            let exceededHr = totalHours - ( Math.floor(NumOfDays) * 24  )
            
            total = Math.ceil(  ( Math.floor(NumOfDays) * ONE_DAY_RATE ) + ( Math.ceil(exceededHr) *  perHourCharge) )  // perday rate + exceeded hr rate
        }else if(totalHours > FLAT_RATE_HR_LIMIT){
            let exceededHr = totalHours - FLAT_RATE_HR_LIMIT;
            total = ( perHourCharge * exceededHr ) + FLAT_RATE
        }else{
            return FLAT_RATE
        }
        return total
    },
    getNearestExit : function(entryPoints, exitData) {
        
        let row = exitData.row
        let key = exitData.key
        
        let initialSide = [0,1,2];
        let addedSide = [3,4,5];
        
        console.log(initialSide.includes(key) )

        if( entryPoints.includes(row) && initialSide.includes(key) ){
            return row;
        }else if(entryPoints.includes(row) && addedSide.includes(key)){
            return getEntryPointCounterPart(row, entryPoints)
        }else{
            return ''
        }
    }
}

const getEntryPointCounterPart = (row, entryPoints) => {
    if(row === 'A'){
       return ( entryPoints.includes('D') ) ? 'D' : 'A'
    }

    if(row === 'B'){
        return ( entryPoints.includes('E') ) ? 'E' : 'B'
    }

    if(row === 'C'){
        return ( entryPoints.includes('F') ) ? 'F' : 'C'
    }
}

export default CalculateChargeService