import NoteModel from "./NoteModel";
import ColorEnum from "./ColorEnum";
import UUID from "../toolbox/UUID";

class LabelModel {
    constructor(uuid, title = "", color = ColorEnum.WHITE.name) {
        this.uuid = UUID.isUUID(uuid) ? uuid : UUID.generateUUID();
        this.title = title;
        this.color = color;
        this.notes = [];
    }

    updateLabel(label) {
        this.uuid = label.uuid;
        this.title = label.title;
        this.color = label.color;
        this.notes = label.notes;
    }

    addNote(note) {
        if (!note instanceof NoteModel) {
            throw new TypeError("Parameter is not a NoteModel");
        }

        let noteAlreadyInList = this.notes.find((element) => {
            return note === element;
        });
        if (!noteAlreadyInList) {
            this.notes.push(note);
            note.addLabel(this);
        }
    }

    removeNote(note) {
        if (!note instanceof NoteModel) {
            throw new TypeError("Parameter is not a NoteModel");
        }

        this.notes.find((element, index) => {
            if (note !== element) {
                return false;
            }

            this.notes.splice(index, 1);
            element.removeLabel(this);

            return true;
        });
    }

    removeAllNotes() {
        for (let i = this.notes.length - 1; i >= 0; i--) {
            this.removeNote(this.notes[i]);
        }
    }
}

export default LabelModel;