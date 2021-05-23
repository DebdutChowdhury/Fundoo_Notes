import {
    AppBar,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemIcon,
    makeStyles,
    Toolbar,
    Typography,
    useTheme,
} from '@material-ui/core'
import React, { Component } from 'react'
import './Dashboard.css'
import { withRouter } from 'react-router';
import Keep from "../../Component/Assets/keep.png";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewStreamIcon from '@material-ui/icons/ViewAgendaOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import MailIcon from '@material-ui/icons/Mail';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
const drawerWidth = 240;


function icon(index) {
    switch (index) {
        case 0:
            return (<ListItemIcon> <EmojiObjectsIcon /></ListItemIcon>);
        case 1:
            return (<ListItemIcon> <NotificationsNoneIcon /></ListItemIcon>);
        case 2:
            return (<ListItemIcon> <EditOutlinedIcon /></ListItemIcon>);
        case 3:
            return (<ListItemIcon> <ArchiveOutlinedIcon /> </ListItemIcon>)
        case 4:
            return (<ListItemIcon> <DeleteOutlinedIcon /> </ListItemIcon>)

        default:
            return (<ListItemIcon> <MailIcon /> </ListItemIcon>)
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    emoji: {
        fontSize: "200px",
        display: "flex",
        justifyContent: "center",
    },
    appBar: {
        boxShadow: 'none',
        border: '1px solid #dadce0',
        zIndex: theme.zIndex.drawer + 1,

    },

    menuButton: {
        marginRight: 36,
        opacity: '0.7',
    },
    hide: {
        display: '',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        borderRight: 'none',
    },
    drawerOpen: {
        width: drawerWidth,
        border: 'none',
        paddingLeft: '7px',

    },
    drawerClose: {
        paddingLeft: '7px',
        border: 'none',

        overflowX: 'hidden',
        width: theme.spacing(7) + 1,

    },
    toolbar: {
        marginLeft: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

function MiniDrawer(props) { // class
// class MiniDrawer extends Component{}

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);// state var

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const change = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                color='white'
                position='fixed'
                className={clsx(classes.appBar)}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={change}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
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
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,  // this.
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <List onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}  >
                    {['Notes', 'Reminder', 'Edit labels', 'Archive', 'Trush'].map((text, index) => (
                        <ListItem button key={text} >
                            {icon(index)}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default withRouter(MiniDrawer);