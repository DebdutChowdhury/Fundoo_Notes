import { InputBase } from '@material-ui/core';
import React, { Component } from 'react'
import Icon from '../Icon/Icon';
import NoteService from '../../Services/NoteService'
import ColorPalet from '../ColorPalet/ColorPalet';

const noteService = new NoteService();

export default class Archive extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes:[],
            archive: true
        }
    }

    componentDidMount = () => {
        this.note();
    }

    note = () => {
        let token = localStorage.getItem("Token");
        noteService.getArchiveNote(token).then((res)=>{
            console.log(res);
            this.setState({notes:res.data.data.data});
            console.log(this.state.notes);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <div className="notesss">
                    {
                        this.state.notes.filter(data => data.isArchived === true).map((value, index) => {
                            var style = {backgroundColor : value.color}
                            return (
                                <div className="notebox" key={value} style={style}>
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
                                    <Icon Notes={value} archive={this.state.archive} getArchive={this.note}/>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}
