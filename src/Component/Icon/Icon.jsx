import React, { Component } from 'react';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import NoteService from '../../Services/NoteService';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { colors, Menu, MenuItem } from '@material-ui/core';


const noteService = new NoteService();

export default class Icon extends Component {

    constructor(props){
        super(props);
        this.state = {
            anchorEl: null,
            show: false,
            color: ""
        }
    }

    changeShow = () => {
        this.setState({ show: !this.state.show })
    }

    archieveNote = (value) => {
        console.log(value);
        let data = {
            noteList: [value.id],
            isArchived: true
        }
        let token = localStorage.getItem('Token');
        console.log(data);
        noteService.archieveNote(data,token).then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log("error = " + err);
        });
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })
    };

    updateNote = (e, colorValue, value) => {
        let token = localStorage.getItem("Token")
        let data = {
            noteIdList: [value.id],
            color: colorValue
        }
        noteService.colorChange(data, token).then((result)=> {
            console.log(data);
            console.log(result);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteNote = (e, value) => {
        e.stopPropagation();
        let token = localStorage.getItem("Token");
        let data = {
            isDelete: true,
            noteIdList: [value.id]
        }
        noteService.deleteForeverNote(data,token).then((result) => {
            console.log(result);
            window.location.reload();
            this.handleClose();
        }).catch((error) => {
            console.log(error);
        })
    }

    handleClose = () => {
        this.setState({anchorEl:null})
    }

    render() {
        const colors = [ ' #d7aefb', '#a7ffeb', '#e8eaed', 
        '#aecbfa', '#e6c9a8', '#fdcfe8', '#f28b82', '#aecbfa'];
        return (
            <>
                <div className="inlineicons">
                    <AddAlertOutlinedIcon/>
                    <PersonAddOutlinedIcon/>
                    <ColorLensOutlinedIcon onClick={this.changeShow}/>
                    <AddPhotoAlternateOutlinedIcon/>
                    <ArchiveOutlinedIcon onClick={()=>this.archieveNote(this.props.Notes)}/>
                    <MoreVertIcon onClick={(e) => this.handleClick(e)} />
                    {
                        this.state.show ? <div className="colorbox">
                            {
                                colors.map((value) => {
                                    return (
                                        <>
                                            <div className="colorsmall" onClick={(e)=>this.updateNote(e, value, this.props.Notes)} style={{backgroundColor:value}} ></div>
                                        </>
                                    )
                                })
                            }
                        </div>:null
                    }
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
            </>
        )
    }
}
