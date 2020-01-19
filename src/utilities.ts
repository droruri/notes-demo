import {Note} from "./types/Note";

export const changingDummyFunction = (note: Note) => {
    return;
};

export function getNextId(notes: Note[]) {
    const maxId = Math.max(...notes.map(note => (Number(note.id))));
    return maxId + 1;
}