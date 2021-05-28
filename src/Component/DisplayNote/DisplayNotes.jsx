import { Dialog, InputBase } from '@material-ui/core';
import React, { Component } from 'react';
import Pin from '../Assets/pin.jpeg';
import NoteService from '../../Services/NoteService';

const noteService = new NoteService();

export default class DisplayNotes extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            open: false,
            noteId: '',
            color:null,
        }
    }

    handleClickOpen = (e, value) => {
        e.stopPropagation();
       this.setState({
           open: true,
           noteId: value.id,
           title: value.title,
           description: value.description
       })
    }

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

    updateNote = (event) => {
        event.stopPropagation()
        let token = localStorage.getItem('Token')
        let data = {
            title: this.state.title,
            description: this.state.description,
            noteId: this.state.noteId
        }
        console.log(data.noteId);
        if(data.title !== "" && data.description !== ""){
            noteService.updateNote(data, token).then((result) => {
                this.props.updateNote();
                {this.handleClose()}
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    render() {
        console.log("hello", this.props.NotesArray);
        return (
            <>
                <div className="notess">
                    {this.props.NotesArray.filter((data) => data.isDeleted === false).filter((data) => data.isArchived === false).reverse().map((value, index) => {
                        var style = {backgroundColor : value.color}
                        return (
                            <div className="notebox" style={style}>
                                <div onClick={(e) => this.handleClickOpen(e, value)}>
                                    <div className="inline1">
                                        <h4 style={{width:'90%'}}>{value.title}</h4>
                                        <img src={Pin} alt="" />
                                    </div>
                                    <p>{value.description}</p>
                                </div>
                                {/* Icons */}
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
                        <div className="enclose">
                            {/* Icon */}
                            <div className="inp">
                                <input type="button" onClick={(e)=> this.updateNote(e)} value="close"/>
                            </div>
                        </div>
                    </div>

                </Dialog>
            </>
        )
    }
}
