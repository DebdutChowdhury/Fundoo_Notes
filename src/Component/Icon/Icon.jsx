import React, { Component } from 'react';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import NoteService from '../../Services/NoteService';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { colors, Menu, MenuItem } from '@material-ui/core';
import './Icon.css'
import ReminderPop from '../ReminderPop/ReminderPop';
import ColorPalet from '../ColorPalet/ColorPalet';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';


const noteService = new NoteService();

export default class Icon extends Component {

    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            show: false,
            color: "",
            showComponent: false,
            // trash: props.trash
        }
    }

    changeShow = () => {
        this.setState({ show: !this.state.show })
    }

    archieveNote = (value) => {
        console.log(value);
        let data = {
            isArchived: true,
            noteIdList: [value.id] 
        }
        let token = localStorage.getItem('Token');
        console.log(data);
        noteService.archieveNote(data,token).then((data) => {
            console.log(data);
            window.location.reload();
        })
        .catch((err) => {
            console.log("error = " + err);
        });
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    // updateNote = (e, colorValue, value) => {
    //     let token = localStorage.getItem("Token")
    //     let data = {
    //         noteIdList: [value.id],
    //         color: colorValue,
    //     }
    //     noteService.colorChange(data, token).then((result)=> {
    //         console.log(data);
    //         console.log(result);
    //         window.location.reload();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }

    deleteNote = (e, value) => {
        e.stopPropagation();
        let token = localStorage.getItem("Token");
        let data = {
            isDeleted: true,
            noteIdList: [value.id]
        }
        console.log(data.noteIdList);
        noteService.deleteNote(data,token).then((result) => {
            console.log(result);
            // window.location.reload();
            
            this.handleClose();
            this.props.getNote()
        }).catch((error) => {
            console.log(error);
        })
    }

    handleClose = () => {
        this.setState({anchorEl:null})
    }

    reminderPop = (anchor) => {
        this.setState({})
    }

    deleteForever = (value) => {
        let token = localStorage.getItem("Token");
        let data = {
            noteIdList:[value.id]
        };
        noteService.deleteForever(data,token).then((data)=> {
            console.log("Note Delete: ", data);
            this.props.getTrash();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    restore = (value) => {
        let token = localStorage.getItem("Token");
        let data = {
            isDeleted: false,
            noteIdList:[value.id],
            
        }
        noteService.deleteNote(data, token).then((data) => {
            console.log("Restore Data: ", data);
            this.props.getTrash();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    unArchiveNote = (value) => {
        let token = localStorage.getItem("Token");
        let data = {
            isArchived:false,
            noteIdList:[value.id]
        }
        noteService.archieveNote(data, token).then((data) => {
            console.log("UnArchive Data: ",data);
            this.props.getArchive();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getData = (date, time) => {
        this.props.getReminder(date, time)
    }

    render() {
        const colors = [ ' #d7aefb', '#a7ffeb', '#e8eaed', 
        '#aecbfa', '#e6c9a8', '#fdcfe8', '#f28b82', '#aecbfa'];
        return (
            <>
                <div className={this.props.gridView === true ? "gridinlineicons" :"inlineicons"} style={{cursor:"pointer"}}>
                    <div>
                        {console.log(this.props.Notes)}
                        {this.props.Notes.isDeleted===true ? (
                            <div >
                                <DeleteForeverRoundedIcon onClick={(e) => this.deleteForever(this.props.Notes)}/>
                                <RestoreFromTrashRoundedIcon onClick={(e) => this.restore(this.props.Notes)}/>
                            </div>
                        ):
                        <div className={this.props.gridView === true ? "gridinlineicons" :"inlineicons"}>
                   
                    <ReminderPop getReminder={this.getData}/>
                    <PersonAddOutlinedIcon/>
                    
                    <ColorPalet Notes={this.props.Notes} getColor={this.props.getColor}/>
                    <AddPhotoAlternateOutlinedIcon/>

                    {this.props.Notes.isArchived===true ? (
                        <UnarchiveOutlinedIcon onClick={(e) => this.unArchiveNote(this.props.Notes)} />
                    ): (
                        <ArchiveOutlinedIcon onClick={(e)=>this.archieveNote(this.props.Notes)}/>
                    )}
                    
                    <MoreVertIcon onClick={(e) => this.handleClick(e)} />
                    
                    <Menu 
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={(e)=> this.deleteNote(e, this.props.Notes)}>Delete Note</MenuItem>
                        <MenuItem onClose={this.handleClose}>Add Label</MenuItem>
                        <MenuItem onClose={this.handleClose}>Add Drawing</MenuItem>
                        <MenuItem onClose={this.handleClose}>Make a Copy</MenuItem>
                        <MenuItem onClose={this.handleClose}>Show Chackboses</MenuItem>
                        <MenuItem onClose={this.handleClose}>Copy to Google Docs</MenuItem>

                    </Menu>
                </div>
                        }
                    </div>

                </div>
            </>
        )
    }
}
