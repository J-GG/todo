import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import ColorEnum from "../../models/ColorEnum";
import Avatar from "@material-ui/core/Avatar";
import classNames from 'classnames';

const styles = theme => ({
    colorPanel: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "row"
    },
    colorButton: {
        width: "20px",
        height: "20px",
        margin: "2px",
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
    },
    selectedColorButton: {
        boxShadow: "inset 0 0 0 2px rgba(0, 0, 0, 0.4)"
    }
});

class ColorPanel extends Component {

    getStyleFromColorEnum = (colorEnum) => {
        return {
            backgroundColor: colorEnum.color
        };
    };

    render() {
        return (
            <div className={this.props.classes.colorPanel}>
                {
                    Object.keys(ColorEnum).map((key) => (
                        <Avatar
                            className={classNames("ColorPanel-colorButton " + this.props.classes.colorButton, this.props.selectedColor === key && this.props.classes.selectedColorButton)}
                            style={this.getStyleFromColorEnum(ColorEnum[key])}
                            key={key}
                            onClick={() => this.props.handleClickColor(ColorEnum[key])}
                        />
                    ))
                }
            </div>
        );
    }
}

export default withStyles(styles)(ColorPanel);