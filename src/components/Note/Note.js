import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import ColorPanel from "../ColorPanel/ColorPanel";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import {fromName} from "../../models/ColorEnum";

import "./Note.css";

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
        let content = this.props.note.content.length > 150 ? this.props.note.content.substr(0, 150) + "..." : this.props.note.content;
        return (
            <div>
                <Card className={this.props.className}
                      style={this.getStyleFromColorEnum(fromName(this.props.note.color))}>
                    <CardContent onClick={() => this.props.handleNoteClick(this.props.note)}
                                 className="Note-pointer">
                        <Typography variant="title" gutterBottom>
                            <span className="Note-title">
                                {this.props.note.title.length > 40 ? this.props.note.title.substr(0, 40) + "..." : this.props.note.title}
                            </span>
                        </Typography>
                        <Typography component="p">
                            {content.split("\n").map(function (item) {
                                return (
                                    <span key={Math.random()}>
                                        {item}<br/>
                                    </span>
                                )
                            })}
                        </Typography>
                    </CardContent>
                    <CardContent style={{paddingTop: 0, paddingBottom: 0}}
                                 onClick={() => this.props.handleNoteClick(this.props.note)}
                                 className="Note-pointer">
                        <Typography component="div">
                            {
                                this.props.note.labels.map((label) => (
                                    <Chip label={label.title}
                                          style={{margin: 2, fontSize: "0.6rem", borderRadius: 2, cursor: "pointer"}}
                                          key={label.uuid}
                                    />
                                ))
                            }
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing className="Note-bottomBtn"
                                 style={{paddingTop: 3, paddingBottom: 3}}>
                        <Tooltip title="Color">
                            <IconButton onMouseEnter={this.handleShowColorPanel}
                                        onMouseLeave={this.handleHideColorPanel}>
                                <ColorLensIcon/>
                            </IconButton>

                        </Tooltip>
                        <Paper elevation={4}
                               className={colorPanelClasses}
                               onMouseEnter={this.handleShowColorPanel}
                               onMouseLeave={this.handleHideColorPanel}>
                            <ColorPanel
                                selectedColor={this.props.note.color}
                                handleClickColor={(colorEnum) => this.props.handleColorChange(this.props.note, colorEnum)}
                            />
                        </Paper>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => this.props.handleDelete(this.props.note)}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Note;