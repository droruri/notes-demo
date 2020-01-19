import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {addNote} from "../../redux/actions/notes.actions";

export const AddNote: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const onAddingNote = () => {
        dispatch(addNote({id: 0,description:text}));
        setText('');
    };

    const onNoteTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value);

    return (
        <div className="add-note-wrapper">
            <h4>Add New Note</h4>
            <textarea data-testid="AddNote-noteInput" value={text} onChange={onNoteTextChange}/>
            <br/>
            <button type="button" className="btn btn-success btn-sm" disabled={!text} onClick={onAddingNote}>
                Add Note
            </button>
        </div>
    )
};
