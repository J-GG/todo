import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AllInclusive from '@material-ui/icons/AllInclusive';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from "@material-ui/core/Avatar";
import PopupMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import './Menu.css';
import {fromName} from "../../models/ColorEnum";

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 240,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerPaperClose: {
        width: 70,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    labelIcon: {
        width: 25,
        height: 25,
        fontSize: "1rem",
    },
    drawerHeader: {
        ...theme.mixins.toolbar,
    },
    menuItemActive: {
        background: "rgba(0, 0, 0, 0.08)"
    }
});

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
            showLabelMenuIcon: false
        };
    }

    handleMouseEnterLabel = (label) => {
        this.setState({
            showCategoryMoreIcon: label.uuid
        });
    };

    handleMouseLeaveLabel = () => {
        this.setState({
            showCategoryMoreIcon: false
        });
    };

    handleLabelMoreClick = (event) => {
        this.setState({
            anchorE1: event.currentTarget
        });
    };

    handleLabelMoreClose = () => {
        this.setState({
            anchorE1: null,
            showCategoryMoreIcon: false
        });
    };

    render() {
        return (
            <div className="Menu">
                <Drawer variant="permanent"
                        classes={{paper: classNames(this.props.classes.drawerPaper, !this.props.open && this.props.classes.drawerPaperClose)}}
                        onClose={this.props.onClose}>
                    <div className={this.props.classes.drawerHeader}/>
                    <Divider/>
                    <div className="Menu-itemsList">
                        <List>
                            <ListItem button onClick={() => {
                                this.props.changeCurrentLabel()
                            }}
                                      className={classNames(!this.props.currentLabel && this.props.classes.menuItemActive)}
                            >
                                <ListItemIcon>
                                    <AllInclusive/>
                                </ListItemIcon>
                                <ListItemText primary="All notes"/>
                            </ListItem>
                            {
                                this.props.labels.map((label) => (
                                    <ListItem button onMouseEnter={() => this.handleMouseEnterLabel(label)}
                                              onMouseLeave={this.handleMouseLeaveLabel}
                                              onClick={() => {
                                                  this.props.changeCurrentLabel(label)
                                              }}
                                              className={classNames(this.props.currentLabel === label && this.props.classes.menuItemActive)}
                                              key={label.uuid}>
                                        <ListItemIcon>
                                            <Avatar
                                                className={this.props.classes.labelIcon}
                                                style={{backgroundColor: fromName(label.color).color}}>{label.title.substr(0, 1)}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={label.title}/>
                                        <ListItemSecondaryAction
                                            className={this.state.showCategoryMoreIcon === label.uuid ? "Menu-labelEditIcon--show" : "Menu-labelEditIcon"}
                                            onMouseEnter={() => this.handleMouseEnterLabel(label)}
                                            onMouseLeave={this.handleMouseLeaveLabel}
                                        >
                                            <IconButton
                                                aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                                onClick={this.handleLabelMoreClick}
                                            >
                                                <MoreVert/>
                                            </IconButton>
                                            <PopupMenu
                                                id="simple-menu"
                                                anchorEl={this.state.anchorE1}
                                                open={Boolean(this.state.anchorE1)}
                                                onClose={this.handleLabelMoreClose}
                                            >
                                                <MenuItem onClick={this.handleLabelMoreClose}>Edit</MenuItem>
                                                <MenuItem onClick={this.handleLabelMoreClose}>Delete</MenuItem>
                                            </PopupMenu>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            }
                            <ListItem button>
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="New label"/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Menu);