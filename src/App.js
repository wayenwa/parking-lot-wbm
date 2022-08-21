import React, { useState , useEffect } from 'react';
import Map from './components/Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';
import { LOT, CAR_TYPE, INITIAL_ROWS ,LOTS_KEYS } from './shared/constants';
import InitializeDataService from './services/InitializeDataService';
import AddNewVehicleService from './services/AddNewVehicleService';
import CalculateChargeService from './services/CalculateChargeService';
import ExitDetailModal from './components/Modals/exitDetailsModal';
import { store } from './store/entryPointStore';
import AppTitle from './components/AppTitle';
import Legend from './components/Legend';
import './App.css';

function App() {
  const [ data ] = useState( 
    InitializeDataService.init( 
        INITIAL_ROWS,
        LOT,
        CAR_TYPE
    ) 
  );
    
  const [ entryPoints, setEntryPoints ] = useState([]);

  const [ newVehicle, setNewVehicle ] = useState('');
  const [ newEntryPoint, setNewEntryPoint] = useState('');
  const [ newTime, setNewTime] = useState('');
  const [ errAddVehicle, setErrAddVehicle] = useState('');

  const [ occupiedSlots, setOccupiedSlots] = useState([]);

  const [ A_Lots, setALots] = useState(LOTS_KEYS);
  const [ B_Lots, setBLots] = useState(LOTS_KEYS);
  const [ C_Lots, setCLots] = useState(LOTS_KEYS);

  const [ showExitDetails, setShowExitDetails ] = useState(false);

  const [ exitData, setExitData ] = useState({});
  const [ exitTime, setExitTime ] = useState({});
  const [ total, setTotal ] = useState({});

  const [ nearestExit, setNearestExit ] = useState('');

  const [ exitErr,setExitErr ] = useState('');

  useEffect(() => {
    updateState();
    store.subscribe(updateState);
  },[]);
  const updateState = () =>{
      const state = store.getState();
      setEntryPoints(state.INITIAL_ENTRY_POINTS)
  }
  
  const setRemainingSlot = (row, slots) => {
    if(row === 'A'){
      setALots( slots )
    }else if( row === 'B' ){
      setBLots( slots )
    }else{
      setCLots( slots )
    }
  }

  const alternativeRowSlot = (size, combinedRowLots,ePoint) => {
      return AddNewVehicleService.alternativeSlotsForVehicle(ePoint, combinedRowLots, size)
      
  }

  const addNewVehicle = () => {
    
    if(AddNewVehicleService.validate( newVehicle, newEntryPoint, newTime )){
      /** get Available Slots */
      let availableRowSlots = ( newEntryPoint === 'A' ||  newEntryPoint === 'D') ? A_Lots : ( newEntryPoint === 'B' ||  newEntryPoint === 'E') ?  B_Lots : C_Lots;

      let ePoint = ( newEntryPoint === 'A' ||  newEntryPoint === 'D') ? 'A' : ( newEntryPoint === 'B' ||  newEntryPoint === 'E') ?  'B' : 'C';

      let slotKey = AddNewVehicleService.getAvailableSlot(newVehicle, availableRowSlots, newEntryPoint, [A_Lots,B_Lots,C_Lots])
     
      let isUsingOtherRow = AddNewVehicleService.isUsingOtherRow(newVehicle, availableRowSlots, [A_Lots,B_Lots,C_Lots], ePoint)
     
      let usedOtherSlots = (isUsingOtherRow === false) ? false : AddNewVehicleService.getOtherRowSlotUsed(ePoint, [A_Lots,B_Lots,C_Lots])
      
      let usedAlternativeSlots = alternativeRowSlot(newVehicle, [A_Lots,B_Lots,C_Lots], ePoint)
     
      if(isUsingOtherRow && usedAlternativeSlots.length === 0){
        setErrAddVehicle('No available parking slot!')
      }

      if(slotKey !== undefined){
        /** set remaining Row slot */
        
        let remaning = AddNewVehicleService.setAvailableSlot( ( !isUsingOtherRow ) ? availableRowSlots : usedAlternativeSlots, slotKey )
        
        setRemainingSlot(  ( !isUsingOtherRow ) ? ePoint : usedOtherSlots, remaning )

        let arr = [...occupiedSlots, {
          'row' : ( !isUsingOtherRow ) ? ePoint : usedOtherSlots,
          'key' : parseInt(slotKey),
          'car_size' : newVehicle,
          'time_of_entry' : newTime,
          'charge_per_hour' : CalculateChargeService.chagePerHour(slotKey)
        }];
        setErrAddVehicle('')
        setOccupiedSlots(arr)
      }
    }else{
      setErrAddVehicle("Please fill-out all fields")
    }
  }

  const changeValue = (e) => {
    
    if(e.target.name === 'type'){
      setNewVehicle(e.target.value)
    }else if(e.target.name === 'entry_point'){
      setNewEntryPoint(e.target.value)
    }else{
      setNewTime(new Date(e.target.value))
    }
      
  }

  const changeExitTimeValue = (e) => {
    setExitErr('')
    setExitTime(new Date(e.target.value))
    let charge = calculateCharge(exitData, new Date(e.target.value))
    
    setTotal(charge)
  }
  const selectVehicle = (lotKey, index, data) => {
    
    if(data.length >= 1){
      setExitData(data[0])
      setShowExitDetails(true)

      let nearestExit =  CalculateChargeService.getNearestExit(entryPoints, data[0])
      setNearestExit(nearestExit)
    }
    
  }
  const calculateCharge = (exitData, extDate) => {
    return CalculateChargeService.total(exitData, extDate)
  }

  const closeModal = () => {
    setExitData({})
    setShowExitDetails(false)
  }

  const unpark = () => {
    
    if( total > 0 ){
      setExitErr('')
      let index = ''
      let slots = [...occupiedSlots];
      slots.map((slot, k) => {
          if(slot.row === exitData.row && slot.key === exitData.key){
            index = k
          }
      })

      var filtered = slots.filter(function(value, i, arr){ 
        return i !== index;
      });
      setExitData({})
      setOccupiedSlots( filtered )
      setShowExitDetails(false)

    }else{
      setExitErr('Please select exit date')
    }
  }
  console.log(occupiedSlots)
  return (
    <div>
        <AppTitle/>
        <ExitDetailModal
          isOpen  = { showExitDetails }
          title   = "Exit Details"
          carSize = { exitData.car_size }
          slotKey = { parseInt(exitData.key) }
          row = { exitData.row }
          entry_time = { exitData.time_of_entry }
          handleExitDate = { changeExitTimeValue }
          total          = { total }
          close = { closeModal }
          nearestExit = { nearestExit }
          unpark = { unpark }
          exitErr = { exitErr }
        />
        <Map 
          data          = { data }
          occupiedSlots      = { occupiedSlots }
          selectVehicle       = { selectVehicle }
        />
        <Form
          submit        = { addNewVehicle }
          handleChange  = { changeValue }
          addSizeValue  = { newVehicle }
          addEntryPointValue  = { newEntryPoint }
          addTimeValue        = { newTime }
          errAddVehicle = { errAddVehicle }
        />
        <Legend

        />
    </div>
  );
}

export default App;
