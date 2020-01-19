import {getNextId} from "../../utilities";
import {NotesState} from "../types";
import {Reducer} from "redux";
import {Note} from "../../types/Note";
import {ActionNote, addNote, deleteNote, updateNote} from "../actions/notes.actions";
import {pushItems, updateItemById, removeItemsById} from "redux-toolbelt-immutable-helpers";

const initialState:NotesState = [];

const notesReducer: Reducer<NotesState, ActionNote> = (state = initialState, action) => {
    switch (action.type) {
        case addNote.TYPE:
            return addNoteToState(action.payload, state);
        case updateNote.TYPE:
            return updateItemById<Note>(state, action.payload.id, action.payload, (item: Note) => item.id);
        case deleteNote.TYPE:
            return removeItemsById<Note>(state, [action.payload], (item: Note) => item.id);
        default:
            return state;
    }
};

export default notesReducer;

function addNoteToState(note:Note, state:NotesState){
    const newNote = Object.assign(note, {id: getNextId(state)});
    return pushItems<Note>(state, newNote);
}