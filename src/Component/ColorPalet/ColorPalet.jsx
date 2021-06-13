import React from 'react'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { Popper } from '@material-ui/core';
import NoteService from '../../Services/NoteService'

const noteService = new NoteService()

function ColorPalet(props) {

    const[open,setOpen]=React.useState(false)
    const[anchorEl,setanchorEl]=React.useState(null)

    const handleClick = (event) => {
        setOpen(!open)
        setanchorEl(event.currentTarget)
    }

    const id = open ? 'simple-popper' : undefined;  

    const updateNote = (e, colorValue, value) => {
        let token = localStorage.getItem("Token")
        let data = {
            noteIdList: [value.id],
            color: colorValue,
        }
        console.log("For color: ",data);
        noteService.colorChange(data, token).then((result)=> {
            console.log(data);
            console.log(result);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const updateColor = (colorValue) => {
        props.getColor(colorValue)
    }

    const colors = [ ' #d7aefb', '#a7ffeb', '#e8eaed', 
        '#aecbfa', '#e6c9a8', '#fdcfe8', '#f28b82', '#aecbfa'];

    return (
        <div>
            <ColorLensOutlinedIcon aria-describedby={id} type="button" onClick={handleClick} style={{cursor:"pointer"}}/>
            <Popper  placement="right-start" id={id} open={open} anchorEl={anchorEl}>
                <div>
                    {
                        open ? <div className="colorbox">
                            {
                                colors.map((value) => {
                                    return (
                                        <>
                                            <div className="colorsmall" onClick={(e)=>{props.Notes ? updateNote(e, value, props.Notes): updateColor(value)}} style={{backgroundColor:value}} ></div>
                                        </>
                                    )
                                })
                            }
                        </div>:null
                    }
                </div>

            </Popper>
        </div>
    )
}

export default ColorPalet
