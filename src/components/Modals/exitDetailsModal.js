import React from 'react';
import { Modal, ModalBody, ModalFooter, MDBModalHeader } from 'mdbreact';
import Moment from 'react-moment';
import 'font-awesome/css/font-awesome.min.css';
import DatePicker from '../DatePicker';
import Button from '../Buttons/submitBtn';

const ExitDetailModal = (props) => {
  return (
      <Modal isOpen={props.isOpen} className="cascading-modal">
          <MDBModalHeader className='modal-head-confirm'>
                <i className='fa fa-circle-xmark' ></i>
                { props.title }
          </MDBModalHeader>
          <ModalBody>
            <h4>Calculate Charge:</h4>
            <div className='err'>{ props.exitErr }</div>
            <div>Car Size : { props.carSize }</div>
            <div>Parking Slot : { props.row }-{ props.slotKey+1 }</div>
            <div>Time of Entry : <Moment format="DD/MM/Y HH:mm">{props.entry_time}</Moment></div>

            <div style={{ marginTop:'15px' }}><DatePicker name="exit_time"  onChange={ props.handleExitDate } label="Time of Exit"/></div>
            {
                <div className='err'>Total Charge : { (props.total > 0) ? props.total : '( Select Time of exit )' }</div>
            }
            <div className='err'>Nearest Exit : { props.nearestExit }</div>
            
          </ModalBody>
          <ModalFooter>
              <Button title="Unpark Vehicle" handleClick={ props.unpark }/>
              <Button title="Cancel" handleClick={ props.close }/>
          </ModalFooter>
      </Modal>
  )
};
 
export default ExitDetailModal;