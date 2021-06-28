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
    
    // shouldComponentUpdate(){
    //     console.log("For search", this.props.inputSearch);
    //     return true
    // }

    getNote = () => {
        let token = localStorage.getItem('Token')
        console.log('called');
        noteService.getNote(token).then((result) => {
            this.setState({notes:result.data.data.data})
            console.log(this.state.notes);
            // let arr = [];
            // arr.push(this.state.notes)
            this.onTrigerSearch(this.state.notes)
            // this.props.searchNote(this.state.notes)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    onTrigerSearch = (data) => {
        this.props.searchNote(data)
    }

    render() {
        console.log("getNote Grid", this.props.inputSearch);
        return (
            <div>
                <CreateNote updateData={this.getNote}/>
                <DisplayNotes 
                    gridView={this.props.gridView} 
                    updateNote={this.props.updateNote} 
                    getNote={this.getNote} 
                    NotesArray={this.state.notes}
                    render = {this.props.render}
                />
                {/* <DisplayNotes/> */}
                
            </div>
        )
    }
}
