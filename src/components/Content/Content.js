import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import AddBtn from "../AddBtn/AddBtn";
import NoteDialog from "../NoteDialog/NoteDialog";
import Note from "../Note/Note";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import "./Content.css";

const styles = {
    AddBtn: {
        position: "fixed",
        right: "25px",
        bottom: "25px"
    },
    Note: {
        margin: "10px",
        width: "250px"
    }
};

class Content extends Component {

    constructor(props) {
        super(props);

        let notes = [];
        try {
            notes = localStorage.getItem("notes") !== null ? JSON.parse(localStorage.getItem("notes")) : notes;
        } catch (e) {
        }

        this.state = {
            notes: notes,
            isAddNoteDialog: true,
            addNoteDialogOpen: false,
            snackbarOpen: false,
            deletedNote: undefined,
            editNote: undefined,
        };
    }

    handleAddNoteDialogClose = () => {
        this.setState({addNoteDialogOpen: false});
    };

    handleShowAddNoteDialog = () => {
        this.setState({
            editNote: undefined,
            addNoteDialogOpen: true
        });
    };

    handleSaveNote = (isAddNote, note) => {
        this.setState({addNoteDialogOpen: false});

        if (note.title.length > 0 || note.content.length > 0) {
            if (isAddNote) {
                let id = Math.max.apply(Math, this.state.notes.map((note) => note.id)) + 1;
                let newNote = {
                    id: id,
                    title: note.title,
                    content: note.content
                };
                this.state.notes.push(newNote);
            } else {
                this.state.notes.find((element, index, notes) => {
                    if (element.id !== note.id) {
                        return false;
                    }

                    element.title = note.title;
                    element.content = note.content;
                    notes.splice(index, 1, element);

                    return true;
                });
            }
            localStorage.setItem('notes', JSON.stringify(this.state.notes));
        }
    };

    handleDeleteBtnClick = (noteKey) => {
        let notes = this.state.notes;
        notes.find((element, index, notes) => {
            if (element.id !== noteKey) {
                return false;
            }

            let deletedNote = notes.splice(index, 1);
            this.setState({
                deletedNote: deletedNote
            });

            return true;
        });
        this.setState({
            snackbarOpen: true,
            notes: notes
        });
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
    };

    handleUndoDeleteNode = () => {
        this.handleSnackbarClose();
        if (this.state.deletedNote !== undefined) {
            this.state.notes.push(this.state.deletedNote[0]);
            this.setState({
                deletedNote: undefined
            });
            localStorage.setItem('notes', JSON.stringify(this.state.notes));
        }
    };

    handleSnackbarClose = () => {
        this.setState({snackbarOpen: false});
    };

    handleNoteClick = (noteKey) => {
        let note = this.state.notes.find((element) => {
            return element.id === noteKey;
        });
        this.setState({
            editNote: {
                id: note.id,
                title: note.title,
                content: note.content
            },
            addNoteDialogOpen: true
        });
    };

    handleColorChange = (noteKey, color) => {
        this.state.notes.find((note, index, notes) => {
            if (note.id !== noteKey) {
                return false;
            }

            note.color = color;
            notes.splice(index, 1, note);
            this.setState({
                notes: this.state.notes
            });
            localStorage.setItem('notes', JSON.stringify(this.state.notes));
            return true;
        });
    };

    render() {
        return (
            <div className="Content">
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: "left"}}
                    open={this.state.snackbarOpen}
                    onClose={this.handleSnackbarClose}
                    autoHideDuration={6000}
                    message={"Note deleted"}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleUndoDeleteNode}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            color="inherit"
                            onClick={this.handleSnackbarClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
                <AddBtn
                    className={this.props.classes.AddBtn}
                    onClick={this.handleShowAddNoteDialog}
                />
                <NoteDialog
                    open={this.state.addNoteDialogOpen}
                    handleSave={this.handleSaveNote}
                    handleClose={this.handleAddNoteDialogClose}
                    editNote={this.state.editNote}
                    key={Math.random()}
                />
                <div className="NotesList">
                    {
                        this.state.notes.map((note) => (
                            <Note
                                className={this.props.classes.Note}
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                color={note.color}
                                content={note.content}
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
