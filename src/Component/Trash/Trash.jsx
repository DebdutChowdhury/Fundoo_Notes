import { InputBase } from '@material-ui/core';
import React, { Component } from 'react';
import NoteService from '../../Services/NoteService';
import Icon from '../Icon/Icon';

const noteService = new NoteService();

export default class Trash extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes:[],
            trash:true
        }
    }

    componentDidMount(){
        this.note();
    }

    note = () => {
        let token = localStorage.getItem('Token');
        console.log("Trash Part");
        noteService.getDeleteNote(token).then((result) => {
            console.log(result);
            this.setState({notes:result.data.data.data})
            console.log(this.state.notes);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
            <>
                <div className="notesss">
                    {
                        this.state.notes.filter(data => data.isDeleted === true).map((value,index) => {
                            var style = {backgroundColor : value.color}
                            return (
                                <div className="notebox" key={index} style={style}>
                                    <InputBase
                                        style={{ paddingLeft: '8px' }}
                                        defaultValue={value.title}
                                        multiline
                                        className=""
                                        placeholder="  Description"
                                        inputProps={{ 'aria-label': 'Description ' }}
                                    />
                                    <InputBase
                                        style={{ paddingLeft: '8px' }}
                                        defaultValue={value.description}
                                        multiline
                                        className=""
                                        placeholder="  Description"
                                        inputProps={{ 'aria-label': 'Description ' }}
                                    />
                                    <Icon Notes={value} trash={this.state.trash} getTrash={this.note}/>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}
