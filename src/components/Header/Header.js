import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ColorEnum, {fromName} from "../../models/ColorEnum";

const styles = theme => ({
    appBar: {
        position: 'fixed',
        color: "#000000"
    }
});

class Header extends Component {

    render() {
        return (
            <AppBar
                className={this.props.classes.appBar}
            >
                <Toolbar className={this.props.toolbar}
                         style={{
                             paddingLeft: 10,
                             backgroundColor: this.props.currentLabel ? fromName(this.props.currentLabel.color).color : ColorEnum.WHITE.color
                         }}>
                    <IconButton
                        onClick={this.props.handleClickMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap>
                        {this.props.currentLabel ? this.props.currentLabel.title : "All notes"}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);