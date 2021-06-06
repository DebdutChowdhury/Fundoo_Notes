import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Icon from '../Icon/Icon';
import "./ReminderPop.css"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';

export default function ReminderPop(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <AddAlertOutlinedIcon aria-describedby={id} type="button" onClick={handleClick} style={{cursor:"pointer"}}/>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className="paper">
          Reminder:
          
          <div className="diff">
          <br/>
            <div className="today">
            <br/>
              <div className="letters">
              <br/>
                <div style={{color: "#414344"}}>Leter today:</div>
              </div>
              <div className="time">
                  8.00PM
              </div>
              
            </div>
            <div className="today">
            <br/>
              <div className="letters">
              <br/>
                <div style={{color: "#414344"}}>Tomorrow:</div>
              </div>
              <div className="time">
                  8.00AM
              </div>
              
            </div>
            <div className="today">
            <br/>
              <div className="letters">
              <br/>
                <div style={{color: "#414344"}}>Next Week:</div>
              </div>
              <div className="time">
                  8.00PM
              </div>
              
            </div>
            <div className="today">
            <br/>
              <div className="letters">
              <br/>
              <AccessTimeIcon style={{fontSize:"15"}}/></div>
                <div className="place">Pick date & time:</div>
              
              
            </div>
            <div className="today">
            <br/>
              <div className="letters">
              <br/>
              <PlaceIcon style={{fontSize:"15"}}/></div>
                <div className="place">
                Pick place
                </div>
              </div>
              
            
          </div>
        </div>
       
      </Popper>
    </div>
  );
}