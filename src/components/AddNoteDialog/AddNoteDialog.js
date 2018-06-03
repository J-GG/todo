import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AddNoteDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            content: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    onClose={this.props.handleClose}
                    fullWidth={true}
                >
                    <DialogTitle>
                        Create a new Note
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="content"
                            name="content"
                            label="Content"
                            multiline
                            fullWidth
                            rows="5"
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.handleAdd(this.state.title, this.state.content)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddNoteDialog;