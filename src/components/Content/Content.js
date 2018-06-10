import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import AddBtn from "../AddBtn/AddBtn";
import NoteDialog from "../NoteDialog/NoteDialog";
import Note from "../Note/Note";
import SnackbarNote from "../SnackbarNote/SnackbarNote";
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
            isAddNoteDialogOpen: false,
            isSnackbarOpen: false,
            lastDeletedNote: undefined,
            noteShownInNoteDialog: new NoteModel(),
        };
    }

    handleAddNoteDialogClose = () => {
        this.setState({isAddNoteDialogOpen: false});
    };

    handleShowAddNoteDialog = () => {
        this.setState({
            noteShownInNoteDialog: new NoteModel(),
            isAddNoteDialogOpen: true
        });
    };

    handleSaveNote = (note) => {
        this.setState({isAddNoteDialogOpen: false});
        this.props.saveNote(note);
    };

    handleDeleteBtnClick = (noteUuid) => {
        this.props.notes.find((note, index, notes) => {
            if (note.uuid !== noteUuid) {
                return false;
            }

            let deletedNote = notes.splice(index, 1);
            this.setState({
                lastDeletedNote: deletedNote,
                isSnackbarOpen: true,
                notes: notes
            });
            this.props.deleteNote(note);

            return true;
        });
    };

    handleUndoDeleteNode = () => {
        this.handleSnackbarClose();
        if (this.state.lastDeletedNote !== undefined) {
            this.props.saveNote(this.state.lastDeletedNote[0]);
            this.setState({
                deletedNote: undefined
            });
        }
    };

    handleSnackbarClose = () => {
        this.setState({isSnackbarOpen: false});
    };

    handleNoteClick = (noteUuid) => {
        let note = this.props.notes.find((element) => {
            return element.uuid === noteUuid;
        });
        this.setState({
            noteShownInNoteDialog: note ? note : new NoteModel(),
            isAddNoteDialogOpen: true
        });
    };

    handleColorChange = (noteUuid, colorEnum) => {
        this.props.notes.find((note, index, notes) => {
            if (note.uuid !== noteUuid) {
                return false;
            }

            note.color = colorEnum.name;
            notes.splice(index, 1, note);
            this.setState({
                notes: notes
            });
            this.props.saveNote(note);

            return true;
        });
    };

    render() {
        return (
            <div
                className={classNames(this.props.classes.Content, this.props.isMenuOpen && this.props.classes.ContentMenuOpen)}>
                <SnackbarNote
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
                    open={this.state.isAddNoteDialogOpen}
                    handleSave={this.handleSaveNote}
                    handleClose={this.handleAddNoteDialogClose}
                    note={this.state.noteShownInNoteDialog}
                    key={this.state.noteShownInNoteDialog.uuid}
                />
                <div className={this.props.classes.NotesList}>
                    {
                        this.props.notes.map((note) => (
                            <Note
                                className={this.props.classes.Note}
                                key={note.uuid}
                                uuid={note.uuid}
                                title={note.title}
                                content={note.content}
                                labels={note.labels}
                                color={note.color}
                                handleDelete={this.handleDeleteBtnClick}
                                handleNoteClick={this.handleNoteClick}
                                handleColorChange={this.handleColorChange}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Content);
