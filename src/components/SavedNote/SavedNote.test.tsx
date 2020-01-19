import {fireEvent} from "@testing-library/react";
import React from "react";
import {Note} from "../../types/Note";
import {ApplicationState} from "../../redux/types";
import {SavedNote} from "./SavedNote";
import InitializedComponentWithStore from "../../test.utils";

const initialNotes:Note[] = [{id:1, description:'My first note'}, {id:2, description: 'My second note'}];
const initialPartialState:Partial<ApplicationState> = {notes: initialNotes};
let note:Note;
const noteText = 'Saved SavedNote';
beforeEach(() => {
    note = {id:1, description: noteText};
});

describe('SavedNote component', () => {
    it('renders without crash & with option to press edit', () => {
        const {getByTestId, getByText}=InitializedComponentWithStore(initialPartialState, <SavedNote noteDescription={note}/>);
        getByText(noteText);
        getByTestId('SavedNote-editNote');
    });

    it('opens edit mode properly', () => {
        const {getByTestId, queryByText, queryByTestId}=InitializedComponentWithStore(initialPartialState, <SavedNote noteDescription={note}/>);
        const editButton = getByTestId("SavedNote-editNote");
        fireEvent.click(editButton);

        const textarea = getByTestId("SavedNote-textarea");
        fireEvent.change(textarea, { target: { value: 'new value' } });
        expect(queryByText('new value')).toBeInTheDocument();
        expect(queryByTestId("SavedNote-saveNote")).toBeInTheDocument();
    });

    it('saves the new note & exit edit mode', () => {
        const {getByTestId, queryByText}=InitializedComponentWithStore(initialPartialState, <SavedNote noteDescription={note}/>);
        const editButton = getByTestId("SavedNote-editNote");
        fireEvent.click(editButton);
        editNoteAndSaveIt();
        assertAfterSaving();


        function editNoteAndSaveIt() {
            const textarea = getByTestId("SavedNote-textarea");
            const saveButton = getByTestId("SavedNote-saveNote");
            fireEvent.change(textarea, {target: {value: 'new value'}});
            fireEvent.click(saveButton);
        }

        function assertAfterSaving() {
            expect(queryByText('Save')).not.toBeInTheDocument();
            expect(queryByText('Edit')).toBeInTheDocument();
            expect(queryByText('new value')).toBeInTheDocument();
        }
    });
});