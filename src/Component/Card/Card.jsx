import { Chip, Dialog, InputBase } from '@material-ui/core';
import React, { Component } from 'react'
import NoteService from '../../Services/NoteService'
import Pin from '../Assets/pin.jpeg'
import Icon from '../Icon/Icon';
import DateTimePicker from '../DateTime/DateTimePicker';
import moment from "moment"

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
            datePicker:false,
        }
    }

    handleClickOpen = (e, value) => {
        e.stopPropagation();
       this.setState({
           open: true,
           noteId: value.id,
           title: value.title,
           description: value.description,
           reminder:value.reminder
       })
    console.log("HandleClick open");
    // this.props.handleClickOpen(e, value)
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

    updateReminderNote = () => {
        console.log("reminder Date: ",this.state.reminder);
        console.log("value: ",this.props.value);
        let token = localStorage.getItem("Token");
        let data = {
            noteIdList: [this.props.value.id],
            reminder: this.state.reminder
        }
        noteService.addReminderNote(data, token).then((result)=>{
            console.log(result);
            this.props.updateReminderNote();
            {this.handleClose()}
        })
    }

    updateReminder =(date, time)=> {
        if (date !== null && time !== null) {
            let reminder = moment(date).format("MMM D")+", "+ moment(time).format("h:mm:A");
            console.log("Reminder: ",reminder);
            this.setState({
                reminder: reminder,
            }, () => this.updateReminderNote());
            console.log("reminder date: ",date, "time ", time);
        // this.updateReminderNote();
        }
    }

    updateNote = (event) => {
        event.stopPropagation()
        let token = localStorage.getItem('Token')
        let data = {
            title: this.state.title,
            description: this.state.description,
            noteId: this.state.noteId
        }
        console.log("for update",data);
        if (data.title !== "" && data.description !== "") {
            noteService.updateNote(data, token).then((result) => {
                console.log(result);
                // this.props.updateNote();
                this.props.getNote();
                // window.location.reload();
                { this.handleClose() }
            })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    handleTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    handleDescription = (event) => {
        this.setState({ description: event.target.value })
    }

    handleClose = () => {
        console.log("i am working");
        this.setState({ open: !this.state.open })
        console.log(this.state.open);
    };

    render() {
        console.log("Reminder:",this.props.value.reminder.length);
        return (
            <>{console.log(this.props.value)}
                <div style={this.props.style}>
                    <div onClick={(e) => this.handleClickOpen(e, this.props.value)}>
                        <div className={this.props.gridView === true ? "gridinline1" : "inline1"}>
                            <h4 style={{width:'90%'}}>{this.props.value.title}</h4>
                            <img src={Pin} alt="" />
                        </div>
                        <p>{this.props.value.description}</p>
                        
                    </div>  
                    {this.props.value.reminder.length > 0 ? 
                    <Chip 
                        onClick={this.callChange}
                        // label={this.props.value.reminder}
                        label={moment(new Date(this.props.value.reminder)).format("MMM DD,h:mm A")}
                        onDelete={() => this.removeReminder(this.props.value)}
                        />
                        : null}
                    <Icon 
                        Notes={this.props.value} 
                        setColor={this.setColor}
                        gridView={this.props.gridView}
                        isDeleted={this.props.value.isDeleted}
                        isArchived={this.props.value.isArchived}
                        getArchivedNote={this.props.getArchivedNote}
                        getDeletedNote={this.props.getDeletedNote}
                        getNote={this.props.getNote}
                    />
                    
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <div className="dialogbox">
                        <InputBase
                            defaultValue=""
                            multiline
                            className="inputbas"
                            placeholder=" Title"
                            fullWidth
                            onChange={this.handleTitle}
                            defaultValue={this.state.title}
                            inputProps={{ 'aria-label': 'Title ' }}
                        />

                        <InputBase
                            defaultValue=""
                            multiline
                            className="inputbas"
                            placeholder=" Title"
                            fullWidth
                            onChange={this.handleDescription}
                            defaultValue={this.state.description}
                            inputProps={{ 'aria-label': 'Title ' }}
                        />
                        <div className="enclose">
                            <Icon />
                            <div className="inp">
                                <input type="button" onClick={(e) => this.updateNote(e)} value="close" />
                            </div>
                        </div>
                    </div>
                </Dialog>
                <div>
                    {this.state.datePicker ? 
                        <DateTimePicker 
                            editPicker={this.callChange} 
                            reminder={this.props.value.reminder} 
                            edit={true} 
                            dateTime={this.updateReminderNote} 
                            updateReminder={this.updateReminder}
                        />:null}
                </div>
            </>
        )
    }
}
