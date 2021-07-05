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
import '../../Pages/Dashboard/Dashboard.css'
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
import DrawerPart from '../Drawer/DrawerPart';
import Search from "../Search/Search"
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
        width: drawerWidth - 180,
        flexShrink: 0,
        marginTop: "80px",
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: "70px",
    },
    drawerPaperClose: {
        width: drawerWidth - 180,
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
        fontWeight: '500',
        lineHeight: '1.25rem',
        paddingleft: '24px',
        color: '#202124',
        borderRadius: '0 25px 25px 0',

        '&:focus': {
            backgroundColor: '#feefc3',
            borderRadius: '0 25px 25px 0',
        },
    },
})

class Appbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            profile: false,
            counter: '',
            heading: 'Keep'
        }
        this.drawerOpen = this.handleDrawerOpen.bind(this)
        this.drawerClose = this.handleDrawerClose.bind(this)
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
        window.location.href = "http://localhost:3000";
    }

    change = () => {
        this.setState({ open: !this.state.open });
    };

    notes = () => {
        // window.location.href = 'http://localhost:3000/dashboard/notes'
    }


    handleToggle = () => {
        console.log("open");
    }

    chnageName = (data) => {
        this.setState({ heading: data })
        this.props.rout(data);
    }

    acceptInput = (data) => {
        this.props.takeInput(data)

    }

    refresh = (e) =>{
        e.stopPropagation()
        window.location.reload()
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.open);
        return (
            <div className="root">
                <CssBaseline />
                <AppBar
                    color='white'
                    position='fixed'
                    className="appBar"
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.change}
                            edge="start"
                            className={this.state.open ? "menuButton" : "hide"}
                        >
                            <MenuIcon
                                onClick={this.handleToggle}
                            />
                        </IconButton>
                        <img src={Keep} alt="" srcset="" />
                        <Typography variant="h6" noWrap>
                            {/* <span>Keep</span> */}
                            {this.state.heading}
                        </Typography>

                        <div>
                            <Search  takeInput={this.props.takeInput}/>
                        </div>

                        <div className="icons">
                            <RefreshIcon style={{cursor:"pointer"}} onClick={(e)=>this.refresh(e)}/>
                            {/* <ViewStreamIcon /> */}
                            <img onClick={() => this.props.grid()} src={this.props.gridView === false ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMywzIEwxMCwzIEMxMC41NSwzIDExLDMuNDUgMTEsNCBMMTEsMTAgQzExLDEwLjU1IDEwLjU1LDExIDEwLDExIEwzLDExIEMyLjQ1LDExIDIsMTAuNTUgMiwxMCBMMiw0IEMyLDMuNDUgMi40NSwzIDMsMyBaIE0zLDEzIEwxMCwxMyBDMTAuNTUsMTMgMTEsMTMuNDUgMTEsMTQgTDExLDIwIEMxMSwyMC41NSAxMC41NSwyMSAxMCwyMSBMMywyMSBDMi40NSwyMSAyLDIwLjU1IDIsMjAgTDIsMTQgQzIsMTMuNDUgMi40NSwxMyAzLDEzIFogTTE0LDMgTDIxLDMgQzIxLjU1LDMgMjIsMy40NSAyMiw0IEwyMiwxMCBDMjIsMTAuNTUgMjEuNTUsMTEgMjEsMTEgTDE0LDExIEMxMy40NSwxMSAxMywxMC41NSAxMywxMCBMMTMsNCBDMTMsMy40NSAxMy40NSwzIDE0LDMgWiBNMTQsMTMgTDIxLDEzIEMyMS41NSwxMyAyMiwxMy40NSAyMiwxNCBMMjIsMjAgQzIyLDIwLjU1IDIxLjU1LDIxIDIxLDIxIEwxNCwyMSBDMTMuNDUsMjEgMTMsMjAuNTUgMTMsMjAgTDEzLDE0IEMxMywxMy40NSAxMy40NSwxMyAxNCwxMyBaIE05LDkgTDksNSBMNCw1IEw0LDkgTDksOSBaIE05LDE5IEw5LDE1IEw0LDE1IEw0LDE5IEw5LDE5IFogTTIwLDkgTDIwLDUgTDE1LDUgTDE1LDkgTDIwLDkgWiBNMjAsMTkgTDIwLDE1IEwxNSwxNSBMMTUsMTkgTDIwLDE5IFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJncmlkX3ZpZXdfMjRweCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gaWQ9ImJvdW5kcyIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjAgMCAyNCAwIDI0IDI0IDAgMjQiPjwvcG9seWdvbj4KICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgPC9tYXNrPgogICAgICAgIDx1c2UgaWQ9Imljb24iIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICA8L2c+Cjwvc3ZnPgo=" : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGlkPSJsaXN0X3ZpZXdfMjRweCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gaWQ9ImJvdW5kcyIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjAgMCAyNCAwIDI0IDI0IDAgMjQiPjwvcG9seWdvbj4KICAgICAgICA8cGF0aCBkPSJNMjAsOSBMNCw5IEw0LDUgTDIwLDUgTDIwLDkgWiBNMjAsMTkgTDQsMTkgTDQsMTUgTDIwLDE1IEwyMCwxOSBaIE0zLDMgQzIuNDUsMyAyLDMuNDUgMiw0IEwyLDEwIEMyLDEwLjU1IDIuNDUsMTEgMywxMSBMMjEsMTEgQzIxLjU1LDExIDIyLDEwLjU1IDIyLDEwIEwyMiw0IEMyMiwzLjQ1IDIxLjU1LDMgMjEsMyBMMywzIFogTTMsMTMgQzIuNDUsMTMgMiwxMy40NSAyLDE0IEwyLDIwIEMyLDIwLjU1IDIuNDUsMjEgMywyMSBMMjEsMjEgQzIxLjU1LDIxIDIyLDIwLjU1IDIyLDIwIEwyMiwxNCBDMjIsMTMuNDUgMjEuNTUsMTMgMjEsMTMgTDMsMTMgWiIgaWQ9Imljb24iIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4K"} />
                            <SettingsOutlinedIcon />
                            <AppsIcon />
                            <AccountCircleIcon style={{cursor:"pointer"}} onClick={this.handleProfile}></AccountCircleIcon>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className="notes">
                    {this.state.profile ? <div className="profile">
                        <h2>{localStorage.getItem('FirstName')} {localStorage.getItem('LastName')}</h2>
                        <p>{localStorage.getItem('Email')}</p>
                        <input type="button" value="Sign Out" onClick={this.signout} />
                    </div> : null}
                </div>
                <DrawerPart open={this.state.open} drawerOpen={this.handleDrawerOpen} drawerClose={this.handleDrawerClose} nameChange={this.chnageName} selected={this.state.heading} />
            </div>
        )
    }
}

export default withStyles(styles)(Appbar)