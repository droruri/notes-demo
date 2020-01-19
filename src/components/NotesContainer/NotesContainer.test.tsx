import React from "react";
import NotesContainer from "./NotesContainer";
import {Note} from "../../types/Note";
import {ApplicationState} from "../../redux/types";
import InitializedComponentWithStore from "../../test.utils";

const initialNotes:Note[] = [{id:1, description:'Amir'}, {id:2, description: 'Maya'}];
const initialPartialState:Partial<ApplicationState> = {notes: initialNotes,loadingMode:false};

describe('NotesContainer component', () => {
    it('renders without crash', () => {
        const {queryByText} = InitializedComponentWithStore(initialPartialState, <NotesContainer/>);
        expect(queryByText('Amir')).toBeInTheDocument();
        expect(queryByText('Maya')).toBeInTheDocument();
    });
});