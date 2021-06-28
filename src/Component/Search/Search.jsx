import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import GetNote from '../GetNote/GetNote';
import NoteService from '../../Services/NoteService';
import Dashboard from '../../Pages/Dashboard/Dashboard';
const noteService = new NoteService()

function Search(props) {
    const [data, setData] = React.useState("")

    const inputData = (e) => {
        const data = e.target.value;
        props.takeInput(data)
        console.log(data);
        setData(data);
    }

    return (
        <div className="search">
            <SearchIcon />
            <input 
                type="text" 
                aria-label="search" 
                placeholder=" search" 
                value={data}
                onChange={inputData}
            />
            
        </div>
    )
}

export default Search
