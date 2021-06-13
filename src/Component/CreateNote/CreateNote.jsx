import React, { Component } from 'react';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushIcon from '@material-ui/icons/Brush';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { Card, Chip, InputBase } from '@material-ui/core';
import NoteService from '../../Services/NoteService';
import Icon from '../Icon/Icon';
import ColorPalet from '../ColorPalet/ColorPalet';
import moment from 'moment';

const noteService = new NoteService();

export default class CreateNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            title: "",
            description: "",
            color:'',
            reminder:""
        }
    }

    click = () => {
        this.setState({open: !this.state.open})
    }

    handleTitle = (event) => {
        this.setState({title: event.target.value})
        console.log(event.target.value);
    } 

    handleDescription =(event) => {
        this.setState({description: event.target.value})
    }

    close = () => {
        let data = {
            title: this.state.title,
            description: this.state.description,
            reminder:this.state.reminder,
            color:this.state.color
        }
        console.log("Add Note", data);

        this.click();
        if(data.title === '' || data.description === ''){

        }
        else{
            let token = localStorage.getItem('Token')
            noteService.addNote(data, token).then((data) => {
                this.props.updateData();
                this.props.updateReminderData();
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    getColor = (colorValue) => {
        console.log("Color Value", colorValue);
        this.setState({color: colorValue})
    }

    getReminderData = (date, time) => {
        
        if (date !== null && time !== null) {
            let reminder = moment(date).format("MMM D")+", "+ moment(time).format("h:mm:A");
            this.setState({
                reminder: reminder,
            });
        console.log("Reminder: ",reminder);
        console.log(moment(date).format("MMM D"));
        console.log(moment(time).format("h:mm:A"));
            
        }
    }

    handleReminder = () => {
        this.setState({
            reminder: null,
          });
    }

    render() {
        
        return (
            <>
                {this.state.open ? 
                    <div className="takenote">
                        <input type="text" onClick={this.click} placeholder="Take a Note..." />
                        <CheckBoxOutlinedIcon/>
                        <BrushIcon/>
                        <ImageOutlinedIcon/>
                    </div>:
                    
                    <div className="brieftakenote" style={{backgroundColor:this.state.color}}>
                        <div className="inlinepin">
                            <InputBase
                                defaultValue=""
                                multiline
                                fullWidth
                                placeholder=" Title"
                                onChange={this.handleTitle}  
                                inputProps={{'aria-label': 'Title'}}
                            />
                        </div>
                        <InputBase
                            fullWidth
                            multiline
                            defaultValue=""
                            placeholder=" Take a Note "
                            onChange={this.handleDescription}  
                            inputProps={{'aria-label': 'Take a Note...'}}
                            />
                            <div>
                                {this.state.reminder !== '' && (
                                    <div className="reminder">
                                    <Chip
                                        label={this.state.reminder}
                                        onDelete={() => this.handleReminder()}
                                    />
                                    </div>
                                )}
                            </div>
                        <div>
                            <div className="enclose" >
                                <Icon getColor={this.getColor} getReminder={this.getReminderData}/>
                                {/* <ColorPalet/> */}
                                <div class="inp">
                                    <input type="button" onClick={this.close} value="Close" />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                
                
            </>
        )
    }
}
