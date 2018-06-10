import ColorEnum from "./ColorEnum";
import LabelModel from "./LabelModel";
import UUID from "../toolbox/UUID";

class NoteModel {
    constructor(uuid, title = "", content = "", color = ColorEnum.WHITE, labels = []) {
        this.uuid = UUID.isUUID(uuid) ? uuid : UUID.generateUUID();
        this.title = title;
        this.content = content;
        this.color = color;
        this.labels = labels;
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

        return this.labels.find((element, index) => {
            if (label !== element) {
                return false;
            }

            this.labels.splice(index, 1);
            element.removeNote(this);

            return true;
        });
    }
}

export default NoteModel;