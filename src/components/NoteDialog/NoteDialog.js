import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AddNoteDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: this.props.note
        };
    }

    handleChange = (event) => {
        this.state.note[event.target.name] = event.target.value;
    };

    render() {
        let isAddNote = !(this.state.note.title || this.state.note.content);
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    onClose={this.props.handleClose}
                    fullWidth={true}
                >
                    <DialogTitle>
                        {isAddNote ? "Create a new note" : "Edit a note"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            defaultValue={this.state.note.title}
                            onChange={this.handleChange}
                        />
                        <TextField
                            name="content"
                            label="Content"
                            multiline
                            fullWidth
                            rows="5"
                            defaultValue={this.state.note.content}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.props.handleSave(this.state.note)}
                            color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddNoteDialog;