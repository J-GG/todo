import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import ColorPanel from "../ColorPanel/ColorPanel";
import {withStyles} from '@material-ui/core/styles';
import FormLabel from "@material-ui/core/FormLabel";

import "../Note/Note.css";

const styles = theme => ({
    colorPanel: {
        marginTop: theme.spacing.unit
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class LabelDialog extends Component {
    handleChange = (event) => {
        this.props.label[event.target.name] = event.target.value;
        this.forceUpdate();
    };

    handleColorChange = (colorEnum) => {
        this.props.label.color = colorEnum.name;
        this.forceUpdate();
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
                            defaultValue={this.props.label.title}
                            onChange={this.handleChange}
                        />
                        <div className={this.props.classes.colorPanel}>
                            <FormLabel component="legend">Color</FormLabel>
                            <ColorPanel
                                selectedColor={this.props.label.color}
                                handleClickColor={this.handleColorChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.props.handleSave(this.props.label)}
                            color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(LabelDialog);