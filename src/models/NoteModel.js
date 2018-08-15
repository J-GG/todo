import ColorEnum from "./ColorEnum";
import LabelModel from "./LabelModel";
import UUID from "../toolbox/UUID";

class NoteModel {
    constructor(uuid, title = "", content = "", color = ColorEnum.WHITE.name, labels = []) {
        this.uuid = UUID.isUUID(uuid) ? uuid : UUID.generateUUID();
        this.title = title;
        this.content = content;
        this.color = color;
        this.labels = labels;
    }

    updateNote(note) {
        this.uuid = note.uuid;
        this.title = note.title;
        this.content = note.content;
        this.color = note.color;
        this.labels = note.labels;
    }

    addLabel(label) {
        if (!label instanceof LabelModel) {
            throw new TypeError("Parameter is not a LabelModel");
        }

        let labelAlreadyInList = this.labels.find((element) => {
            return label === element;
        });
        if (!labelAlreadyInList) {
            this.labels.push(label);
            label.addNote(this);
        }
    }

    removeLabel(label) {
        if (!label instanceof LabelModel) {
            throw new TypeError("Parameter is not a LabelModel");
        }

        this.labels.find((element, index) => {
            if (label !== element) {
                return false;
            }

            this.labels.splice(index, 1);
            element.removeNote(this);

            return true;
        });
    }

    removeAllLabels() {
        for (let i = this.labels.length - 1; i >= 0; i--) {
            this.removeLabel(this.labels[i]);
        }
    }
}

export default NoteModel;