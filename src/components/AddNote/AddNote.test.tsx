import {fireEvent} from "@testing-library/react";
import {AddNote} from "./AddNote";
import React from "react";
import {Note} from "../../types/Note";
import {ApplicationState} from "../../redux/types";
import InitializedComponentWithStore from "../../test.utils";

const initialNotes:Note[] = [{id:1, description:'Amir'}, {id:2, description: 'Maya'}];
const initialPartialState:Partial<ApplicationState> = {notes: initialNotes,loadingMode:false};

describe('AddNote component', () => {
    it('renders without crash', () => {
        InitializedComponentWithStore(initialPartialState, <AddNote/>);
    });

    it('button will be disabled if we do not put any note', () => {
        const {getByTestId, getByText}=InitializedComponentWithStore(initialPartialState, <AddNote/>);;
        const button = getByText('Add Note');
        const noteInput = getByTestId('AddNote-noteInput');
        fireEvent.change(noteInput, { target: { value: '' } });
        expect(button).toBeDisabled();
    });

    it('button will be enabled if we put a note', () => {
        const {getByTestId, getByText}=InitializedComponentWithStore(initialPartialState, <AddNote/>);;
        const button = getByText('Add Note');
        const noteInput = getByTestId('AddNote-noteInput');
        fireEvent.change(noteInput, { target: { value: 'new value' } });
        expect(button).toBeEnabled();
    });

    it('the component will reset after press on adding note', () => {
        const {getByTestId, getByText}=InitializedComponentWithStore(initialPartialState, <AddNote/>);;
        const button = getByText('Add Note');
        const noteInput = getByTestId('AddNote-noteInput');
        fireEvent.change(noteInput, { target: { value: 'new value' } });
        fireEvent.click(button);
        expect(noteInput.textContent).toBe('');
    });


});