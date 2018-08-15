import LabelModel from "../models/LabelModel";
import NoteModel from "../models/NoteModel";

class NoteHelper {
    static loadData() {
        let parsedNotes = localStorage.getItem("notes") !== null ? JSON.parse(localStorage.getItem("notes")) : [];
        let parsedLabels = localStorage.getItem("labels") !== null ? JSON.parse(localStorage.getItem("labels")) : [];

        let labels = [];
        parsedLabels.forEach((element) => {
            let label = Object.assign(new LabelModel(), element);
            labels.push(label);
        });

        let notes = [];
        parsedNotes.forEach((parsedNote) => {
            let labelsUuid = parsedNote.labelsUuid || [];
            delete parsedNote.labelsUuid;
            let note = Object.assign(new NoteModel(), parsedNote);

            labelsUuid.forEach((labelUuid) => {
                let label = labels.find((labelInList) => {
                    return labelInList.uuid === labelUuid;
                });

                if (label) {
                    note.addLabel(label);
                } else {
                    throw new TypeError("The UUID " + labelUuid + " of the LabelModel doesn't exist");
                }
            });

            notes.push(note);
        });

        return {
            labels: labels,
            notes: notes
        }
    }

    static saveData(labels, notes) {
        let labelsDuplicate = [];
        labels.forEach((label) => {
            if (!label instanceof LabelModel) {
                new TypeError("The label is not a LabelModel");
                return;
            }
            let labelDuplicate = Object.assign(new LabelModel(), label);
            delete labelDuplicate.notes;
            labelsDuplicate.push(labelDuplicate);
        });

        let notesDuplicate = [];
        notes.forEach((note) => {
            if (!note instanceof NoteModel) {
                throw new TypeError("The note is not a NoteModel");
            }
            let noteDuplicate = Object.assign(new NoteModel(), note);
            noteDuplicate.labelsUuid = noteDuplicate.labels.map(label => label.uuid);
            delete noteDuplicate.labels;
            notesDuplicate.push(noteDuplicate);
        });

        localStorage.setItem('labels', JSON.stringify(labelsDuplicate));
        localStorage.setItem('notes', JSON.stringify(notesDuplicate));
    }
}

export default NoteHelper;