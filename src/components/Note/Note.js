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
import ColorEnum, {fromName} from "../../models/ColorEnum";

import "./Note.css";

const styles = {
    colorButton: {
        width: "20px",
        height: "20px",
        margin: "2px",
        boxShadow: "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
    }
};

class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showColorPanel: false
        };
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

    getStyleFromColorEnum = (colorEnum) => {
        return {
            backgroundColor: colorEnum.color
        };
    };

    render() {
        let colorPanelClasses = this.state.showColorPanel ? "ColorPanel ColorPanel--show" : "ColorPanel";
        return (
            <div>
                <Card className={this.props.className}
                      style={this.getStyleFromColorEnum(fromName(this.props.color))}>
                    <CardContent onClick={() => this.props.handleNoteClick(this.props.uuid)} className="Note-text">
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
                            <IconButton onMouseEnter={this.handleShowColorPanel}
                                        onMouseLeave={this.handleHideColorPanel}>
                                <ColorLensIcon/>
                            </IconButton>

                        </Tooltip>
                        <Paper elevation={4} className={colorPanelClasses} onMouseEnter={this.handleShowColorPanel}
                               onMouseLeave={this.handleHideColorPanel}>
                            {
                                Object.keys(ColorEnum).map((key) => (
                                    <Avatar className={"ColorPanel-colorButton " + this.props.classes.colorButton}
                                            style={this.getStyleFromColorEnum(ColorEnum[key])}
                                            key={key}
                                            onClick={() => this.props.handleColorChange(this.props.uuid, ColorEnum[key])}
                                    />
                                ))
                            }
                        </Paper>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => this.props.handleDelete(this.props.uuid)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(Note);