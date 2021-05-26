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
    drawerPaper: {
        width: drawerWidth,
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
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
        console.log("in close button");
    };

    change = () => {
        this.setState({ open: !this.state.open });
    };

    notes = () => {
        this.props.history("/Dashboard")
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
                            <MenuIcon />
                        </IconButton>
                        <img src={Keep} alt="" srcset="" />
                        <Typography variant="h6" noWrap>
                            <span>Keep</span>
                        </Typography>
                        <div className="search">
                            <SearchIcon />
                            <input type="text" aria-label="search" placeholder=" search" />
                        </div>
                        <div className="icons">
                            <RefreshIcon />
                            <ViewStreamIcon />
                            <SettingsOutlinedIcon />
                            <AppsIcon />
                            <AccountCircleIcon></AccountCircleIcon>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer}
                    open={this.state.open}
                    variant="temporary"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className="toolbar">
                        <IconButton onClick={this.handleDrawerClose}>
                        </IconButton>
                    </div>
                    <List onMouseEnter={this.handleDrawerOpen} onMouseLeave={this.handleDrawerClose}>
                        
                        <ListItem className={classes.ListItem} onClick={this.notes}>
                            <ListItemIcon><EmojiObjectsOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Notes" />
                        </ListItem>
                        <ListItem className={classes.ListItem} >
                            <ListItemIcon><NotificationsNoneRoundedIcon /></ListItemIcon>
                            <ListItemText primary="Reminders" />
                        </ListItem>
                         <ListItem className={classes.ListItem} >
                            <ListItemIcon><EditOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Edit Labels" />
                        </ListItem>
                        <ListItem className={classes.ListItem} >
                            <ListItemIcon><ArchiveOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Archive" />
                        </ListItem>
                        <ListItem className={classes.ListItem} >
                            <ListItemIcon><DeleteOutlinedIcon /></ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                        
                    </List>
                </Drawer>
                {/* <div>
                <Router>
                    <Switch>
                        <Route exact path="/Dashboard" component={} ></Route>
                    </Switch>
                </Router>
                </div> */}
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)