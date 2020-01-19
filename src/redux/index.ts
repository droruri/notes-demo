import {combineReducers} from 'redux'
import notesReducer from "./reducer/notes.reducer";
import {ApplicationState} from "./types";
import loadingModeReducer from "./reducer/loading-mode.reducer";

export const rootReducer = combineReducers<ApplicationState>({
    notes: notesReducer,
    loadingMode: loadingModeReducer
});

export type RootState = ReturnType<typeof rootReducer>;