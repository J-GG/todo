import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import AddBtn from "../AddBtn/AddBtn";
import NoteDialog from "../NoteDialog/NoteDialog";
import Note from "../Note/Note";
import Snackbar from "../Snackbar/Snackbar";
import NoteModel from "../../models/NoteModel";
import classNames from 'classnames';

const styles = theme => ({
    Content: {
        margin: "70px 10px 10px 80px",
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    ContentMenuOpen: {
        marginLeft: 270,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    AddBtn: {
        position: "fixed",
        right: 25,
        bottom: 25
    },
    NotesList: {
        display: "flex",
        flexWrap: "wrap"
    },
    Note: {
        margin: 10,
        width: 250
    }
});

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNoteDialogOpen: false,
            isSnackbarOpen: false,
            lastDeletedNote: undefined,
            noteShownInNoteDialog: new NoteModel(),
        };
    }

    handleNoteDialogClose = () => {
        this.setState({isNoteDialogOpen: false});
    };

    handleShowAddNoteDialog = () => {
        this.setState({
            noteShownInNoteDialog: new NoteModel(),
            isNoteDialogOpen: true
        });
    };

    handleSaveNote = (note) => {
        this.handleNoteDialogClose();
        this.props.saveNote(note);
    };

    handleDeleteBtnClick = (note) => {

        let labelsDuplicate = Object.assign([], note.labels);

        this.setState({
            lastDeletedNote: {note: note, labels: labelsDuplicate},
            isSnackbarOpen: true
        });

        this.props.deleteNote(note);
    };

    handleUndoDeleteNode = () => {
        this.handleSnackbarClose();
        if (this.state.lastDeletedNote !== undefined) {
            this.state.lastDeletedNote.labels.forEach(label => {
                label.addNote(this.state.lastDeletedNote.note);
            });
            this.props.saveNote(this.state.lastDeletedNote.note);

            this.setState({
                lastDeletedNote: undefined
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({isSnackbarOpen: false});
    };

    handleNoteClick = (note) => {
        this.setState({
            noteShownInNoteDialog: Object.assign(new NoteModel(), note),
            isNoteDialogOpen: true
        });
    };

    handleNoteColorChange = (note, colorEnum) => {
        note.color = colorEnum.name;
        this.setState({
            notes: this.state.notes
        });
        this.props.saveNote(note);
    };

    render() {
        return (
            <div
                className={classNames(this.props.classes.Content, this.props.isMenuOpen && this.props.classes.ContentMenuOpen)}>
                <Snackbar
                    open={this.state.isSnackbarOpen}
                    onClose={this.handleSnackbarClose}
                    message="Note deleted"
                    buttonMessage="UNDO"
                    buttonMessageOnClick={this.handleUndoDeleteNode}
                />
                <AddBtn
                    className={this.props.classes.AddBtn}
                    onClick={this.handleShowAddNoteDialog}
                />
                <NoteDialog
                    open={this.state.isNoteDialogOpen}
                    handleSave={this.handleSaveNote}
                    handleClose={this.handleNoteDialogClose}
                    note={this.state.noteShownInNoteDialog}
                    key={this.state.noteShownInNoteDialog.uuid}
                    labels={this.props.labels}
                    isAddNote={!this.props.notes.map(note => note.uuid).includes(this.state.noteShownInNoteDialog.uuid)}
                />
                <div className={this.props.classes.NotesList}>
                    {
                        this.props.notes.map((note) => (
                            <Note
                                className={this.props.classes.Note}
                                key={note.uuid}
                                note={note}
                                handleDelete={this.handleDeleteBtnClick}
                                handleNoteClick={this.handleNoteClick}
                                handleColorChange={this.handleNoteColorChange}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Content);
