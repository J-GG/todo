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

class LabelDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label
        };
    }

    handleChange = (event) => {
        let label = this.state.label;
        label[event.target.name] = event.target.value;
        this.setState({
            label: label
        });
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
                        {this.props.isAddLabel ? "Create a new label" : "Edit a label"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            defaultValue={this.state.label.title}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.props.handleSave(this.state.label)}
                            color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default LabelDialog;