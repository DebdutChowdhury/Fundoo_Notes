import React, { Component } from 'react'
import NoteService from '../../Services/NoteService';
import CreateNote from '../CreateNote/CreateNote'
import DisplayNotes from '../DisplayNote/DisplayNotes';

const noteService = new NoteService()

export default class GetNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: []
        }
        
    }
    componentDidMount(){
        this.getNote();
    }

    getNote = () => {
        let token = localStorage.getItem('Token')
        console.log('called');
        noteService.getNote(token).then((result) => {
            this.setState({notes:result.data.data.data})
            console.log(this.state.notes);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <CreateNote updateData={this.getNote}/>
                <DisplayNotes updateNote={this.props.updateNote} getNote={this.getNote} NotesArray={this.state.notes}/>
                {/* <DisplayNotes/> */}
                
            </div>
        )
    }
}
