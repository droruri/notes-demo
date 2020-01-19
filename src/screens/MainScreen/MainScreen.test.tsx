import {fireEvent, render, prettyDOM, wait} from "@testing-library/react";

import React from "react";
import {Note} from "../../types/Note";
import MainScreen from "./MainScreen";
import {ApplicationState} from "../../redux/types";
import InitializedComponentWithStore from "../../test.utils";

const initialNotes:Note[] = [{id:1, description:'My first note'}, {id:2, description: 'My second note'}];
const initialPartialState:Partial<ApplicationState> = {notes: initialNotes};

describe('MainScreen component', () => {
    it('renders without crash', () => {
        const {container, queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        expect(queryByText('My first note')).toBeInTheDocument();
        expect(queryByText('My second note')).toBeInTheDocument();
    });

    it('filter messages', () => {
        const {getByTestId,queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        const filterInput = getByTestId('NotesFilter-filterInput');
        fireEvent.change(filterInput, {target:{value:'first'}});
        expect(queryByText('My first note')).toBeInTheDocument();
        expect(queryByText('My second note')).not.toBeInTheDocument();
    });

    it('adds new note', () => {
        const {getByTestId, getByText, queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        const addNoteInput = getByTestId('AddNote-noteInput');
        const addNoteButton = getByText('Add Note');
        fireEvent.change(addNoteInput, {target:{value:'my third note'}});
        fireEvent.click(addNoteButton);
        expect(queryByText('My first note')).toBeInTheDocument();
        expect(queryByText('My second note')).toBeInTheDocument();
        expect(queryByText('my third note')).toBeInTheDocument();
    });

    it('adds new note with existing filter - should display the note', () => {
        const {getByTestId, getByText,queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        const filterInput = getByTestId('NotesFilter-filterInput');
        fireEvent.change(filterInput, {target:{value:'note'}});
        addNewNote(getByTestId, getByText, 'my third note');
        expect(queryByText('My first note')).toBeInTheDocument();
        expect(queryByText('My second note')).toBeInTheDocument();
        expect(queryByText('my third note')).toBeInTheDocument();
    });

    it('adds new note with existing filter - should not display the note', () => {
        const {getByTestId, getByText,queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        const filterInput = getByTestId('NotesFilter-filterInput');
        addNewNote(getByTestId, getByText, 'my third note');
        fireEvent.change(filterInput, {target:{value:'bla'}});
        expect(queryByText('my third note')).not.toBeInTheDocument();
    });

    it('updates note - should display the updated note', () => {
        const {getAllByTestId,queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        const firstNoteEditButton = getAllByTestId("SavedNote-editNote")[0];
        fireEvent.click(firstNoteEditButton);
        editNoteAndSaveIt();

        function editNoteAndSaveIt() {
            const textarea = getAllByTestId("SavedNote-textarea")[0];
            const saveButton = getAllByTestId("SavedNote-saveNote")[0];
            fireEvent.change(textarea, {target: {value: 'First note - new value'}});
            fireEvent.click(saveButton);
        }
        expect(queryByText('First note - new value')).toBeInTheDocument();
    });

    it('updates note & filter - should display the updated note', () => {
        const {getByTestId, getAllByTestId,queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        const firstNoteEditButton = getAllByTestId("SavedNote-editNote")[0];
        const filterInput = getByTestId('NotesFilter-filterInput');
        fireEvent.click(firstNoteEditButton);
        editFirstNoteAndSaveIt();
        fireEvent.change(filterInput, {target:{value:'First note - new value'}});

        function editFirstNoteAndSaveIt() {
            const textarea = getAllByTestId("SavedNote-textarea")[0];
            const saveButton = getAllByTestId("SavedNote-saveNote")[0];
            fireEvent.change(textarea, {target: {value: 'First note - new value'}});
            fireEvent.click(saveButton);
        }
        expect(queryByText('First note - new value')).toBeInTheDocument();
    });

    it('deletes note - should not display the deleted note', () => {
        const {getAllByTestId ,queryByText} = InitializedComponentWithStore(initialPartialState, <MainScreen/>);
        deleteFirstNote();

        function deleteFirstNote() {
            const deleteButton = getAllByTestId("SavedNote-deleteNote")[0];
            fireEvent.click(deleteButton);
        }

        expect(queryByText('My first note')).not.toBeInTheDocument();
    });
});

function addNewNote(getByTestId:any, getByText:any, note:string) {
    const addNoteInput = getByTestId('AddNote-noteInput');
    const addNoteButton = getByText('Add Note');
    fireEvent.change(addNoteInput, {target: {value: note}});
    fireEvent.click(addNoteButton);
}