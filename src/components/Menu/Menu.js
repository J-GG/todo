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
import LabelDialog from '../LabelDialog/LabelDialog';
import Snackbar from "../Snackbar/Snackbar";

import './Menu.css';
import {fromName} from "../../models/ColorEnum";
import LabelModel from "../../models/LabelModel";

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
    },
    labelTitle: {
        wordBreak: "break-all"
    }
});

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labelShownInLabelDialog: new LabelModel(),
            isLabelDialogOpen: false,
            menuOfLabelShown: undefined,
            isSnackbarOpen: false
        };
    }

    handleMouseEnterLabel = (label) => {
        this.setState({
            showLabelMoreIcon: label.uuid
        });
    };

    handleMouseLeaveLabel = () => {
        this.setState({
            showLabelMoreIcon: false
        });
    };

    handleLabelMoreOpen = (event, label) => {
        this.setState({
            anchorE1: event.currentTarget,
            menuOfLabelShown: label
        });
    };

    handleLabelMoreClose = () => {
        this.setState({
            anchorE1: null,
            showLabelMoreIcon: false,
            menuOfLabelShown: undefined
        });
    };

    handleShowAddLabelDialog = () => {
        this.setState({
            labelShownInLabelDialog: new LabelModel(),
            isLabelDialogOpen: true
        });
    };

    handleSaveLabel = (label) => {
        this.handleLabelDialogClose();
        this.props.saveLabel(label);
    };

    handleLabelDialogClose = () => {
        this.setState({isLabelDialogOpen: false});
    };

    handleLabelEdit = (label) => {
        this.setState({
            labelShownInLabelDialog: label,
            isLabelDialogOpen: true
        });
        this.handleLabelMoreClose();
    };

    handleDeleteLabel = (label) => {
        this.handleLabelMoreClose();
        if (label === this.props.currentLabel) {
            this.handleChangeCurrentLabel();
        }

        let notesDuplicate = Object.assign([], label.notes);

        this.setState({
            lastDeletedLabel: {label: label, notes: notesDuplicate},
            isSnackbarOpen: true
        });
        this.props.deleteLabel(label);
    };

    handleSnackbarClose = () => {
        this.setState({isSnackbarOpen: false});
    };

    handleUndoDeleteLabel = () => {
        this.handleSnackbarClose();
        if (this.state.lastDeletedLabel !== undefined) {
            this.state.lastDeletedLabel.notes.forEach(note => {
                note.addLabel(this.state.lastDeletedLabel.label);
            });
            this.props.saveLabel(this.state.lastDeletedLabel.label);

            this.setState({
                lastDeletedLabel: undefined
            });
        }
    };

    handleChangeCurrentLabel = (label) => {
        this.props.changeCurrentLabel(label);
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
                            <ListItem button onClick={() => this.handleChangeCurrentLabel()}
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
                                              onClick={() => this.handleChangeCurrentLabel(label)}
                                              className={classNames(this.props.currentLabel === label && this.props.classes.menuItemActive)}
                                              key={label.uuid}>
                                        <ListItemIcon>
                                            <Avatar
                                                className={this.props.classes.labelIcon}
                                                style={{backgroundColor: fromName(label.color).color}}>{label.title.substr(0, 1)}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={label.title.substr(0, 25)}
                                                      className={this.props.classes.labelTitle}/>
                                        <ListItemSecondaryAction
                                            className={this.state.showLabelMoreIcon === label.uuid ? "Menu-labelEditIcon--show" : "Menu-labelEditIcon"}
                                            onMouseEnter={() => this.handleMouseEnterLabel(label)}
                                            onMouseLeave={this.handleMouseLeaveLabel}
                                        >
                                            <IconButton onClick={(event) => this.handleLabelMoreOpen(event, label)}>
                                                <MoreVert/>
                                            </IconButton>
                                            <PopupMenu
                                                anchorEl={this.state.anchorE1}
                                                open={Boolean(this.state.menuOfLabelShown === label)}
                                                onClose={this.handleLabelMoreClose}
                                            >
                                                <MenuItem
                                                    onClick={() => this.handleLabelEdit(label)}>Edit</MenuItem>
                                                <MenuItem
                                                    onClick={() => this.handleDeleteLabel(label)}>Delete</MenuItem>
                                            </PopupMenu>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            }
                            <ListItem button onClick={this.handleShowAddLabelDialog}>
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary="New label"/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <LabelDialog
                    open={this.state.isLabelDialogOpen}
                    handleSave={this.handleSaveLabel}
                    handleClose={this.handleLabelDialogClose}
                    label={this.state.labelShownInLabelDialog}
                    key={this.state.labelShownInLabelDialog.uuid}
                    isAddLabel={!this.props.labels.map(label => label.uuid).includes(this.state.labelShownInLabelDialog.uuid)}
                />
                <Snackbar
                    open={this.state.isSnackbarOpen}
                    onClose={this.handleSnackbarClose}
                    message="Label deleted"
                    buttonMessage="UNDO"
                    buttonMessageOnClick={this.handleUndoDeleteLabel}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Menu);