import React, { Component } from 'react';
import CreateNote from '../CreateNote/CreateNote';
import NoteService from '../../Services/NoteService';
import DisplayReminderNote from '../DisplayReminderNote/DisplayReminderNote';

const noteService = new NoteService()

export default class Reminder extends Component {

    constructor(props){
        super(props);
        this.state={
            notes:[]
        }
    }

    componentDidMount(){
        this.getReminderNote();
    }

    getReminderNote = () => {
        let token = localStorage.getItem('Token');
        console.log('called reminder');
        noteService.getReminderNote(token).then((result)=> {
            this.setState({notes:result.data.data.data})
            console.log(this.state.notes);
        })
    }

    render() {
        return (
            <div>
                <CreateNote updateReminderData={this.getReminderNote}/>
                <DisplayReminderNote NotesArray={this.state.notes} updateReminderNote={this.getReminderNote}/>
            </div>
        )
    }
}

