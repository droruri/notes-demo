import {Note} from "../types/Note";

export type NotesState = Note[];

export type LoadingModeState = boolean;

export interface ApplicationState {
    notes: NotesState;
    loadingMode: LoadingModeState;
}

