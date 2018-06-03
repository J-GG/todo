import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AddBtn from "../AddBtn/AddBtn";
import AddNoteDialog from "../AddNoteDialog/AddNoteDialog";
import Note from "../Note/Note";
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './Content.css';

const styles = {
    AddBtn: {
        position: "absolute",
        right: "25px",
        bottom: "25px"
    },
    Note: {
        margin: "10px",
        width: "250px",
        maxHeight: "250px",
        cursor: "pointer"
    }
};

class Content extends Component {

    constructor(props){
        super(props);

        let notes = [];
        try {
            notes = localStorage.getItem("notes") !== null ? JSON.parse(localStorage.getItem("notes")) : notes;
        } catch (e) {}

        this.state = {
            notes: notes,
            addNoteDialogOpen: false,
            snackbarOpen: false,
            deletedNote: {}
        };
    }

    handleAddNoteDialogClose = () => {
        this.setState({addNoteDialogOpen: false});
    };

    handleShowAddNoteDialog = () => {
        this.setState({addNoteDialogOpen: true});
    };

    addNote = (title, content) => {
        this.setState({addNoteDialogOpen: false});

        if(title.length > 0 || content.length > 0) {
            let id = this.state.notes.length > 0 ? this.state.notes[this.state.notes.length - 1].id + 1 : 0;
            let note = {
                id: id,
                title: title,
                content: content
            };
            let newNotes = [...this.state.notes, note];
            this.setState({
                notes: newNotes
            });
            localStorage.setItem('notes', JSON.stringify(newNotes));
        }
    };

    handleDeleteBtnClick = (key) => {
        let notes = this.state.notes;
        notes.find((element, index, notes) => {
            if(element.id !== key){
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
        if(this.state.deletedNote !== undefined) {
            this.state.notes.push(this.state.deletedNote[0]);
            this.setState({
                deletedNote: undefined
            });
            localStorage.setItem('notes', JSON.stringify(this.state.notes));
        }
    };

    handleSnackbarClose = () => {
        this.setState({ snackbarOpen: false });
    };

    render() {
        return (
            <div className="Content">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: "left"}}
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
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleSnackbarClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <AddBtn
                    className={this.props.classes.AddBtn}
                    onClick={this.handleShowAddNoteDialog }
                />
                <AddNoteDialog
                    open={this.state.addNoteDialogOpen}
                    handleAdd={this.addNote}
                    handleClose={this.handleAddNoteDialogClose}
                />
                <div className="NotesList">
                    {
                        this.state.notes.map((note) => (
                            <Note
                                className={this.props.classes.Note}
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                handleDelete={this.handleDeleteBtnClick}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Content);
