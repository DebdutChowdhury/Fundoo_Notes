import { Chip, Dialog, InputBase } from '@material-ui/core';
import React, { Component } from 'react';
import Pin from '../Assets/pin.jpeg';
import NoteService from '../../Services/NoteService';
import Icon from '../Icon/Icon';
import ColorPalet from '../ColorPalet/ColorPalet';

const noteService = new NoteService();

export default class DisplayNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            open: false,
            noteId: '',
            color: null,
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
        this.setState({ open: !this.state.open })
        console.log(this.state.open);
    };

    // handleTitle = (event) => {
    //     this.setState({ title: event.target.value })
    // }

    // handleDescription = (event) => {
    //     this.setState({ description: event.target.value })
    // }

    // updateNote = (event) => {
    //     event.stopPropagation()
    //     let token = localStorage.getItem('Token')
    //     let data = {
    //         title: this.state.title,
    //         description: this.state.description,
    //         noteId: this.state.noteId
    //     }
    //     console.log(data.description);
    //     if (data.title !== "" && data.description !== "") {
    //         noteService.updateNote(data, token).then((result) => {
    //             console.log(result);
    //             // this.props.updateNote();
    //             this.props.getNote();
    //             window.location.reload();
    //             { this.handleClose() }
    //         })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }
    // }

    setColor = (colorValue) => {
        this.setState({ color: colorValue })
    }

    render() {
        console.log("hello", this.props.NotesArray);
        console.log("grid", this.props.gridView);
        return (
            <>
                <div className="notess">
                    {this.props.render(this.props.NotesArray, this.props.getNote)}
                </div>
                
            </>
        )
    }
}
{/* <div className={this.props.gridView === true ? "gridNotess": "notess"}>
                    {this.props.NotesArray.filter((data) => data.isArchived == false).filter((data) => data.isDeleted === false).map((value, index) => {
                        var style = { backgroundColor: value.color }
                        console.log("value", value)
                        return (
                            <div className={this.props.gridView === true ? "gridNoteBox": "notebox"} style={style}>
                                <div onClick={(e) => this.handleClickOpen(e, value)}>
                                    <div className="inline1">
                                        <h4 style={{ width: '90%' }}>{value.title}</h4>
                                        <img src={Pin} alt="" />
                                    </div>
                                    <p>{value.description}</p>
                                </div>
                                <Icon Notes={value} setColor={this.setColor} />
                            </div>
                        )
                    })}
                </div> */}