import { Chip } from '@material-ui/core';
import React, { Component } from 'react'
import NoteService from '../../Services/NoteService'
import Pin from '../Assets/pin.jpeg'
import Icon from '../Icon/Icon';
import DateTimePicker from '../DateTime/DateTimePicker';

const noteService = new NoteService();

export default class Card extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            open: false,
            noteId: '',
            color:null,
            reminder:"",
            datePicker:false
        }
    }

    handleClickOpen = (e, value) => {
        e.stopPropagation();
    //    this.setState({
    //        open: true,
    //        noteId: value.id,
    //        title: value.title,
    //        description: value.description,
    //        reminder:value.reminder
    //    })
    this.props.handleClickOpen(e, value)
    }
    removeReminder = (value) => {
        let token = localStorage.getItem("Token");
        let data = {
            noteIdList:[value.id],
            reminder:null
        }
        console.log(data);
        noteService.removeReminderNote(data, token).then((result)=>{
            console.log("Remove reminder",result);
            this.props.updateReminderNote()
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    setColor = (colorValue) => {
        this.setState({color: colorValue})
    }

    callChange = () => {
        this.setState({datePicker:!this.state.datePicker})
    }

    render() {
        return (
            <>
                <div className="notebox" style={this.props.style}>
                    <div onClick={(e) => this.handleClickOpen(e, this.props.value)}>
                        <div className="inline1">
                            <h4 style={{width:'90%'}}>{this.props.value.title}</h4>
                            <img src={Pin} alt="" />
                        </div>
                        <p>{this.props.value.description}</p>
                        
                    </div>  
                    <Chip 
                        onClick={this.callChange}
                        label={this.props.value.reminder}
                        onDelete={() => this.removeReminder(this.props.value)}
                        />
                    <Icon Notes={this.props.value} setColor={this.setColor}/>
                    
                </div>
                <div>
                    {this.state.datePicker ? 
                        <DateTimePicker 
                            editPicker={this.callChange} 
                            reminder={this.props.value.reminder} 
                            edit={true} 
                            dateTime={this.props.updateReminderNote} 
                            updateReminder={this.props.updateReminder}
                        />:null}
                </div>
            </>
        )
    }
}
