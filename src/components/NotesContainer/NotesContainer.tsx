import React, {ChangeEvent, useEffect, useState} from "react";
import {SavedNote} from "../SavedNote/SavedNote";
import {Note} from "../../types/Note";
import {RootState} from "../../redux";
import {useSelector} from "react-redux";

const notesSelector = (state: RootState) => state.notes;

const NotesContainer: React.FC = () => {
    const stateNotes = useSelector(notesSelector);
    const [filteredNotes, setFilteredNotes]=useState<Note[]>([]);
    const [filterText, setFilterText]=useState<string>('');

    useEffect(()=>{
        const tempNotes = [...stateNotes.filter(_note => _note.description.includes(filterText))];
        setFilteredNotes(tempNotes);
    },[stateNotes, filterText]);

    const onChange = (event:ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };

    function getNotes() {
        return filteredNotes.map((note) =>
            <SavedNote key={Number(note.id)} noteDescription={note}/>);
    }

    return (
        <div>
            <h4>My Notes</h4>
            <input className="filter-input" data-testid="NotesFilter-filterInput" placeholder="Filter Notes" value={filterText} onChange={onChange}/>
            <React.Fragment>
                {getNotes()}
            </React.Fragment>
        </div>

    );
};


export default NotesContainer;