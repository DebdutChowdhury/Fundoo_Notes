import React from 'react'
import Icon from '../Icon/Icon'
import Pin from '../Assets/pin.jpeg'
import { InputBase } from '@material-ui/core'
import Card from '../Card/Card'

export default function MapData(props) {
    console.log("MapData grid",props.gridView);
    return (
        <div className={props.gridView === true ? "gridNotess": "notess"}>
        {console.log(props.note)}
        {
                        props.note.map((value, index) => {
                            var style = {backgroundColor : value.color}
                            return (
                                <div className={props.gridView === true ? "gridNoteBox": "notebox"} key={value} style={style}>
                                    <Card 
                                        value={value}
                                        style={style}
                                        gridView={props.gridView}
                                    />
                                </div> 
                            )
                        })
                    }
        </div>
    )
}
//  {/* {props.NotesArray.map((value, index) => {
//             var style = { backgroundColor: value.color }
//             console.log("value", value)
//             return (
//                 <div className="notebox" style={style}>
//                     {/* <div onClick={(e) => handleClickOpen(e, value)}> */}
//                         <div className="inline1">
//                             <h4 style={{ width: '90%' }}>{value.title}</h4>
//                             <img src={Pin} alt="" />
//                         </div>
//                         <p>{value.description}</p>
//                     {/* </div> */}
//                     <Icon Notes={value} 
//                         // setColor={setColor} 

//                     />
//                 </div>
//             )
//         })} */}

{/* <InputBase
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
                                    
                                    <Icon 
                                        Notes={value} 
                                        // archive={archive} 
                                        // getArchive={note}

                                    /> */}