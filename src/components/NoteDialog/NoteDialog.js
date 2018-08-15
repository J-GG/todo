import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from "@material-ui/core/FormLabel";
import ColorPanel from "../ColorPanel/ColorPanel";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        minWidth: "30%",
        maxWidth: "100%",
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class NoteDialog extends Component {

    handleChange = (event) => {
        if (event.target.name === "labels") {
            this.props.note.removeAllLabels();
            event.target.value.forEach(selectedLabelTitle => {
                let label = this.props.labels.find(label => {
                    return label.title === selectedLabelTitle;
                });
                this.props.note.addLabel(label);
            });
        } else {
            this.props.note[event.target.name] = event.target.value;
        }
        this.forceUpdate();
    };

    handleColorChange = (colorEnum) => {
        this.props.note.color = colorEnum.name;
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
                        {this.props.isAddNote ? "Create a new note" : "Edit a note"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus={true}
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            defaultValue={this.props.note.title}
                            onChange={this.handleChange}
                        />
                        <TextField
                            name="content"
                            label="Content"
                            multiline
                            fullWidth
                            rows="5"
                            defaultValue={this.props.note.content}
                            onChange={this.handleChange}
                        />
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="select-multiple-chip">Labels</InputLabel>
                            <Select
                                multiple
                                name="labels"
                                value={this.props.note.labels.map(label => label.title)}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-chip"/>}
                                renderValue={selected => (
                                    <div className={this.props.classes.chips}>
                                        {selected.map(value => <Chip key={value} label={value}
                                                                     className={this.props.classes.chip}/>)}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {this.props.labels.map(label => (
                                    <MenuItem
                                        key={label.uuid}
                                        value={label.title}
                                        style={{
                                            fontWeight:
                                                this.props.note.labels.map(label => label.title).indexOf(label.title) === -1
                                                    ? this.props.theme.typography.fontWeightRegular
                                                    : this.props.theme.typography.fontWeightMedium,
                                        }}
                                    >
                                        {label.title}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormLabel component="legend">Color</FormLabel>
                        <ColorPanel
                            selectedColor={this.props.note.color}
                            handleClickColor={this.handleColorChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.props.handleSave(this.props.note)}
                            color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NoteDialog);