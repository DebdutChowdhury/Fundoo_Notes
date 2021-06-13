import { Chip, Dialog, InputBase } from '@material-ui/core';
import React, { Component } from 'react';
import Pin from '../Assets/pin.jpeg';
import NoteService from '../../Services/NoteService';
import Icon from '../Icon/Icon';
import ColorPalet from '../ColorPalet/ColorPalet';
import moment from 'moment';
import Card from '../Card/Card';

const noteService = new NoteService();

export default class DisplayReminderNote extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            open: false,
            noteId: "",
            color:null,
            reminder:"",
        }
    }

    // handleClickOpen = (e, value) => {
    //     e.stopPropagation();
    //    this.setState({
    //        open: true,
    //        noteId: value.id,
    //        title: value.title,
    //        description: value.description,
    //        reminder:value.reminder
    //    })
    // }

    handleClose = () => {
        console.log("i am working");
        this.setState({open: !this.state.open})
        console.log(this.state.open);
    };

    handleTitle = (event) => {
        this.setState({title: event.target.value})
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value})
    }

    // removeReminder = (value) => {
    //     let token = localStorage.getItem("Token");
    //     let data = {
    //         noteIdList:[value.id],
    //         reminder:null
    //     }
    //     console.log(data);
    //     noteService.removeReminderNote(data, token).then((result)=>{
    //         console.log("Remove reminder",result);
    //         this.props.updateReminderNote()
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

    handleClickOpen = (e, value) => {
        e.stopPropagation();
           this.setState({
               open: true,
               noteId: value.id,
               title: value.title,
               description: value.description,
               reminder:value.reminder
           })
    }

    updateReminderNote = () => {
        let token = localStorage.getItem("Token");
        let data = {
            title: this.state.title,
            description: this.state.description,
            noteId: this.state.noteId,
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
            this.setState({
                reminder: reminder,
            });
        this.updateReminderNote();
        }
    }

    render() {
        console.log("reminder", this.props.NotesArray);
        return (
            <>
                <div className="notess">
                    {this.props.NotesArray.filter((data)=>data.isArchived==false).filter((data)=>data.isDeleted===false).map((value, index) => {
                        var style = {backgroundColor : value.color}
                        console.log("value",value)
                        return (
                            <div>
                                <Card 
                                    value={value}
                                    style={style}
                                    updateReminderNote={this.updateReminderNote}
                                    updateReminder={this.updateReminder}
                                    handleClickOpen={this.handleClickOpen}
                                />
                            </div>                            
                        )
                    })}
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <div className="dialogbox">
                        <InputBase
                            defaultValue=""
                            multiline
                            className="inputbas"
                            placeholder= " Title"
                            fullWidth
                            onChange={this.handleTitle}
                            defaultValue={this.state.title}
                            inputProps={{ 'aria-label': 'Title ' }}
                        />

                        <InputBase
                            defaultValue=""
                            multiline
                            className="inputbas"
                            placeholder= " Title"
                            fullWidth
                            onChange={this.handleDescription}
                            defaultValue={this.state.description}
                            inputProps={{ 'aria-label': 'Title ' }}
                        />
                        <div>
                            {this.props.NotesArray.remainder !== null && (
                                <div className="reminder">
                                <Chip
                                    onClick={this.editReminder}
                                    label={this.state.reminder}
                                    onDelete={() => this.removeReminder(this.props.NotesArray)}
                                />
                                </div>
                            )}
                        </div>
                        <div className="enclose">
                            <Icon/>
                            <div className="inp">
                                <input type="button" onClick={(e)=> this.updateReminderNote()} value="close"/>
                            </div>
                        </div>
                    </div>

                </Dialog>
            </>
        )
    }
}
