import {
    AppBar,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemIcon,
    withStyles,
    Toolbar,
    Typography,
} from '@material-ui/core'
import React, { Component } from 'react'
import './Dashboard.css'
import Keep from "../../Component/Assets/keep.png";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewStreamIcon from '@material-ui/icons/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import GetNote from '../../Component/GetNote/GetNote'
import { Route, Router, Switch } from 'react-router';
import Appbar from '../../Component/Appbar/Appbar';
import DrawerPart from '../../Component/Drawer/DrawerPart';
import Archive from '../../Component/ArchiveNotes/Archive';
import { BrowserRouter } from 'react-router-dom';
import CreateNote from '../../Component/CreateNote/CreateNote';
import Trash from '../../Component/Trash/Trash';
import Reminder from '../../Component/Reminder/Reminder';
import MapData from '../../Component/MapData/MapData';
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        marginTop: "100px",
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        marginTop: "80px",
    },
    drawerClose: {
        width: drawerWidth-180,
        flexShrink: 0,
        marginTop: "80px",
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: "70px",
    },
    drawerPaperClose: {
        width: drawerWidth-180,
        marginTop: "70px",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    listItems: {
        letterSpacing: '.01785714em',
        fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
        fontSize: '.875rem',
        fontWeight:'500',
        lineHeight:'1.25rem',
        paddingleft: '24px',
        color: '#202124',
        borderRadius: '0 25px 25px 0',
      
      '&:focus':{
        backgroundColor: '#feefc3',
        borderRadius: '0 25px 25px 0',
      },
    },
})

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            profile: false,
            selectedRout: 'notes',
            gridView : false,
            searchView:"",
            searchElement:[],
            newData:[],
            searchNote:[]
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
        console.log("open the Drawer", this.state.open);
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
        console.log("in close button");
    };

    handleProfile = () => {
        console.log("profile button");
        this.setState({ profile: !this.state.profile })
        
    }

    signout = () => {
        localStorage.removeItem('Token')
        localStorage.removeItem('userDetails')
        localStorage.removeItem('Email')
        localStorage.removeItem('LastName')
        localStorage.removeItem('FirstName')
        this.props.history.push("/login")
    }

    change = () => {
        this.setState({ open: !this.state.open });
    };

    notes = (value) => {
        this.setState({selectedRout:value})
    }

    setRout = (data) => {
        this.setState({selectedRout:data})
        console.log(data);
    }

    rendering =() => {
        if(this.state.selectedRout == 'notes'){
            return <GetNote searchElement={this.state.searchElement} searchNote={this.getDataFromGetNote} gridView={this.state.gridView} render = { data => <MapData gridView={this.state.gridView} note={data}/>}/>
        }
        else if (this.state.selectedRout == 'Reminder'){
            return <Reminder  render = { data => <MapData gridView={this.state.gridView} note={data}/>}/>
        }
        else if (this.state.selectedRout == 'Archive'){
            return <Archive  render = { data => <MapData gridView={this.state.gridView} note={data}/>}/>
        }
        else if (this.state.selectedRout == 'Trash'){
            return <Trash  render = { data => <MapData gridView={this.state.gridView} note={data}/>}/>
        }
        else{
            return <GetNote  render = { data => <MapData gridView={this.state.gridView} note={data}/>}/>
        }
    }

    searchNote = (value) => {
        this.setState({searchNote:value})
        console.log("DashBoard Search Value", value);
        
    }

    onClickGrid = () =>{
        this.setState({gridView: !this.state.gridView})
        console.log(this.state.gridView);
    }

    searchInput = (data) => {
        this.setState({searchView:data})
        console.log("Search data",data);
        this.filterSearch(data)
        
    }

    searchRendering = (data) => {
        console.log("data in search rendering", data);
        // this.filterSearch()
        return <MapData note={data}/>
    }

    getDataFromGetNote = (data) => {
        this.setState({searchElement:data})
        console.log("get data from getNote", data);
        console.log("SearchView",this.state.searchView);
    }

    filterSearch = (searchInput) => {
        console.log(searchInput);
        var arr = [];
        this.state.searchElement.filter(data=>data.title.includes(searchInput)).map((searchedData)=>{
            arr.push(searchedData)
            console.log("SearchData",searchedData, "arr",arr);
        })
        this.setState({newData:arr})
        console.log("outside arr",arr);
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.open);
        console.log(this.state.newData);
        console.log(this.state.searchElement);
        return (
            <div className="root">
                
                <CssBaseline />
                <Appbar rout={this.setRout} 
                    gridView={this.state.gridView}
                    grid={this.onClickGrid}
                    // searchNote={this.searchNote}
                    takeInput={this.searchInput}
                />
                {this.state.selectedRout}
                <div>

                    {/* <CreateNote /> */}
                    { this.state.searchView != "" ? this.searchRendering(this.state.newData) : this.rendering()}

                    {/* <GetNote /> */}
                    {/* <Archive/> */}
                </div>
                
                
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)