import React, {Component} from 'react';
import App from "../components/App/App";
import NoteHelper from "../toolbox/NoteHelper";
import NoteModel from "../models/NoteModel";
import LabelModel from "../models/LabelModel";

class AppController extends Component {
    constructor(props) {
        super(props);

        let {notes, labels} = NoteHelper.loadData();
        this.state = {
            labels: labels,
            notes: notes,
            currentLabel: undefined
        }
    }

    saveLabel = (label) => {
        if (!label instanceof LabelModel) {
            new TypeError("The label is not a LabelModel");
            return;
        }

        console.log(label);
    };

    saveNote = (note) => {
        if (!note instanceof NoteModel) {
            new TypeError("The note is not a NoteModel");
            return;
        }

        if (note.title || note.content) {
            let noteToBeEdited = this.state.notes.find((element, index, notes) => {
                if (element.uuid !== note.uuid) {
                    return false;
                }

                notes.splice(index, 1, note);
                this.setState({
                    notes: notes
                });

                return true;
            });

            if (!noteToBeEdited) {
                this.state.notes.push(note);
            }
        }

        NoteHelper.saveData(this.state.labels, this.state.notes);
    };

    deleteNote = (note) => {
        if (!note instanceof NoteModel) {
            new TypeError("The note is not a NoteModel");
            return;
        }

        this.state.notes.find((element, index, notes) => {
            if (element.uuid !== note.uuid) {
                return false;
            }

            notes.splice(index, 1);
            this.setState({
                notes: notes
            });

            return true;
        });

        NoteHelper.saveData(this.state.labels, this.state.notes);
    };

    changeCurrentLabel = (label) => {
        let newLabel = undefined;
        if (label) {
            if (!label instanceof LabelModel) {
                throw new TypeError("The label is not a LabelModel");
            }
            newLabel = label;
        }

        this.setState({
            currentLabel: newLabel
        });
    };

    render() {
        return (
            <App
                labels={this.state.labels}
                notes={this.state.notes}
                changeCurrentLabel={this.changeCurrentLabel}
                currentLabel={this.state.currentLabel}
                saveLabel={this.saveLabel}
                saveNote={this.saveNote}
                deleteNote={this.deleteNote}
            />
        );
    }

}

export default AppController;