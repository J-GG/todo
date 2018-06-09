import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from "@material-ui/core/Avatar";
import deepOrange from '@material-ui/core/colors/deepOrange';
import PopupMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Menu.css';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: 240,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })},
    drawerPaperClose: {
        width: 70,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    categoryIcon: {
        width: 30,
        height: 30,
        backgroundColor: deepOrange[100],
    }
});

class Menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuOpen: false,
            showCategoryMenuIcon: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    handleMouseEnterCategory = () => {
        this.setState({
            showCategoryMoreIcon: true
        });
    };

    handleMouseLeaveCategory = () => {
        this.setState({
            showCategoryMoreIcon: false
        });
    };

    handleCategoryMoreClick = (event) => {
      this.setState({
          anchorE1: event.currentTarget
      });
    };

    handleCategoryMoreClose = () => {
        this.setState({
            anchorE1: null,
            showCategoryMoreIcon: false
        });
    };

    render() {
        return (
            <div className="Menu">
                <Drawer variant="permanent"
                        classes={{paper: classNames(this.props.classes.drawerPaper, !this.state.menuOpen && this.props.classes.drawerPaperClose)}}
                        open={this.state.menuOpen}>
                    <div className="Menu-itemsList">
                    <List>
                        <ListItem button onClick={this.handleDrawerToggle}>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button onMouseEnter={this.handleMouseEnterCategory} onMouseLeave={this.handleMouseLeaveCategory}>
                            <ListItemIcon>
                                <Avatar className={this.props.classes.categoryIcon}>T</Avatar>
                            </ListItemIcon>
                            <ListItemText primary="Todo" />
                                <ListItemSecondaryAction
                                    className={this.state.showCategoryMoreIcon ? "Menu-categoryEditIcon--show" : "Menu-categoryEditIcon"}
                                    onMouseEnter={this.handleMouseEnterCategory}
                                    onMouseLeave={this.handleMouseLeaveCategory}
                                >
                                    <IconButton
                                        aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                                        onClick={this.handleCategoryMoreClick}
                                    >
                                        <MoreVert/>
                                    </IconButton>
                                    <PopupMenu
                                        id="simple-menu"
                                        anchorEl={this.state.anchorE1}
                                        open={Boolean(this.state.anchorE1)}
                                        onClose={this.handleCategoryMoreClose}
                                    >
                                        <MenuItem onClick={this.handleCategoryMoreClose}>Edit</MenuItem>
                                        <MenuItem onClick={this.handleCategoryMoreClose}>Delete</MenuItem>
                                    </PopupMenu>
                                </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="New category" />
                        </ListItem>
                    </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Menu);
