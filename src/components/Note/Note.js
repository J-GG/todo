import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";
import cyan from "@material-ui/core/colors/cyan";

import "./Note.css";

const styles = {
    colorButton: {
        width: "20px",
        height: "20px",
        margin: "2px",
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
    },
    redButton: {
        backgroundColor: red[200]
    },
    orangeButton: {
        backgroundColor: orange[200]
    },
    purpleButton: {
        backgroundColor: purple[200]
    },
    indigoButton: {
        backgroundColor: indigo[200]
    },
    blueButton: {
        backgroundColor: blue[200]
    },
    greenButton: {
        backgroundColor: green[200]
    },
    yellowButton: {
        backgroundColor: yellow[200]
    },
    pinkButton: {
        backgroundColor: pink[200]
    },
    tealButton: {
        backgroundColor: teal[200]
    },
    cyanButton: {
        backgroundColor: cyan[200]
    },
    brownButton: {
        backgroundColor: brown[200]
    },
    greyButton: {
        backgroundColor: grey[200]
    }
};

function getColorFromName(colorName, colors) {
    let color = undefined;
    switch (colorName) {
        case "RED":
            color = colors.redButton;
            break;
        case "ORANGE":
            color = colors.orangeButton;
            break;
        case "YELLOW":
            color = colors.yellowButton;
            break;
        case "PINK":
            color = colors.pinkButton;
            break;
        case "PURPLE":
            color = colors.purpleButton;
            break;
        case "INDIGO":
            color = colors.indigoButton;
            break;
        case "BLUE":
            color = colors.blueButton;
            break;
        case "TEAL":
            color = colors.tealButton;
            break;
        case "GREEN":
            color = colors.greenButton;
            break;
        case "BROWN":
            color = colors.brownButton;
            break;
        case "GREY":
            color = colors.greyButton;
            break;
        default:
            break;
    }
    return color;
}

class Note extends Component {

    constructor(props) {
        super(props);
        this.state ={
            showColorPanel: false
        }
    }

    handleShowColorPanel = () => {
        this.setState({
            showColorPanel: true
        });
    };

    handleHideColorPanel = () => {
        this.setState({
            showColorPanel: false
        });
    };

    render() {
        let colorPanelClasses = this.state.showColorPanel ? "ColorPanel ColorPanel--show" : "ColorPanel";
        return (
            <div>
                <Card className={this.props.className + " " + getColorFromName(this.props.color, this.props.classes)}>
                    <CardContent onClick={() => this.props.handleNoteClick(this.props.id)} className="Note-text">
                        <Typography variant="title" gutterBottom>
                            <span className="Note-title">
                                {this.props.title.length > 40 ? this.props.title.substr(0, 40) + "..." : this.props.title}
                            </span>
                        </Typography>
                        <Typography component="p">
                            {this.props.content.length > 150 ? this.props.content.substr(0, 150) + "..." : this.props.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing className="Note-bottomBtn">
                        <Tooltip title="Color">
                            <IconButton onMouseEnter={this.handleShowColorPanel} onMouseLeave={this.handleHideColorPanel}>
                                <ColorLensIcon/>
                            </IconButton>
                        </Tooltip>
                        <Paper elevation={4} className={colorPanelClasses} onMouseEnter={this.handleShowColorPanel} onMouseLeave={this.handleHideColorPanel}>
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton} onClick={() => this.props.handleColorChange(this.props.id)} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.redButton} onClick={() => this.props.handleColorChange(this.props.id, "RED")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.orangeButton} onClick={() => this.props.handleColorChange(this.props.id, "ORANGE")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.yellowButton} onClick={() => this.props.handleColorChange(this.props.id, "YELLOW")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.pinkButton} onClick={() => this.props.handleColorChange(this.props.id, "PINK")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.purpleButton} onClick={() => this.props.handleColorChange(this.props.id, "PURPLE")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.indigoButton} onClick={() => this.props.handleColorChange(this.props.id, "INDIGO")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.blueButton} onClick={() => this.props.handleColorChange(this.props.id, "BLUE")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.tealButton} onClick={() => this.props.handleColorChange(this.props.id, "TEAL")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.greenButton} onClick={() => this.props.handleColorChange(this.props.id, "GREEN")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.brownButton} onClick={() => this.props.handleColorChange(this.props.id, "BROWN")} />
                            <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton + " " + this.props.classes.greyButton} onClick={() => this.props.handleColorChange(this.props.id, "GREY")} />
                        </Paper>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => this.props.handleDelete(this.props.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Note);