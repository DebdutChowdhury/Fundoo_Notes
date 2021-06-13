import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../ReminderPop/ReminderPop.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { useState } from 'react';

const currencies = [
    {
      value: 'Do not repeat`',
      label: 'Do not repeat',
    },
    {
      value: 'Dailly',
      label: 'Dailly',
    },
    {
      value: 'Weekly',
      label: 'Weekly',
    },
    {
      value: 'Monthly',
      label: 'Monthly',
    },
    {
      value: 'Yearly',
      label: 'Yearly',
    },
    {
      value: 'Custom',
      label: 'Custom',
    },
  ];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '400px'
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(2),
    width: 280,
  },
}));

export default function DateTimePicker(props) {

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(props.reminder);
  const [selectedTime, setSelectedTime] = React.useState(props.reminder);
  const [close, setClose] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  }

  const save = () => {
    
    setClose(!close)
    console.log("close");
    if(props.edit === true){
      props.updateReminder(selectedDate, selectedTime)
    }
    else{
      props.getReminder(selectedDate, selectedTime)
    }
    
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="paper">
        <form className={classes.container} noValidate>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          className={classes.textField}
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          className={classes.textField}
          id="time-picker"
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <TextField
          id="standard-select-currency"
          select
          className={classes.textField}
          defaultValue={currencies}
          Value={currencies}
          InputLabelProps={{
          shrink: true,
          }}
          inputProps={{
          step: 300, // 5 min
          }}
        >
            {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </form>
        <div className="btn">
            <button onClick={save}>Save</button>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}
