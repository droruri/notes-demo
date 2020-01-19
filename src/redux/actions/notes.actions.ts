import {Action, makeActionCreator} from "redux-toolbelt";
import {Note} from "../../types/Note";

export interface ActionNote extends Action {
    payload: Note
}

export const addNote = makeActionCreator<ActionNote>('ADD_NOTE');
export const updateNote = makeActionCreator<ActionNote>('UPDATE_NOTE');
export const deleteNote = makeActionCreator<ActionNote>('DELETE_NOTE');