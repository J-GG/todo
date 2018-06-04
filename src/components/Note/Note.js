import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import "./Note.css";

class Note extends Component {

    render() {
        return (
            <div>
                <Card className={this.props.className}>
                    <CardContent onClick={() => this.props.handleNoteClick(this.props.id)}>
                        <Typography variant="title" gutterBottom>
                            <span className="Note-title">
                                {this.props.title.length > 40 ? this.props.title.substr(0, 40) + "..." : this.props.title}
                            </span>
                        </Typography>
                        <Typography component="p">
                            {this.props.content.length > 150 ? this.props.content.substr(0, 150) + "..." : this.props.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <IconButton>
                            <ColorLensIcon />
                        </IconButton>
                        <IconButton onClick={() => this.props.handleDelete(this.props.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Note;