import React, {ChangeEvent, memo, useEffect, useState} from "react";
import {Note} from "../../types/Note";
import {useDispatch} from "react-redux";
import {updateNote, deleteNote} from "../../redux/actions/notes.actions";

interface NoteProps {
    noteDescription: Note;
}

export const SavedNote: React.FC<NoteProps> = memo(({noteDescription}) => {
    const [note, setNote] = useState<Note>(noteDescription);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setNote(noteDescription)
    },[noteDescription]);

    const changeTitle = (event:ChangeEvent<HTMLTextAreaElement>) => {
        setNote({id:note.id, description: event.target.value});
    };

    const saveNote = () => {
        dispatch(updateNote(note));
        setEditMode(false);
    };

    const removeNote = () => {
        dispatch(deleteNote(note));
    };

    if (editMode) {
        return (
            <div className="note-wrapper border border-primary">
                <textarea
                    data-testid={"SavedNote-textarea"}
                    onChange={changeTitle}
                    value={note.description}/>
                <br/>
                <button type="button" className="btn btn-success btn-sm"
                        onClick={saveNote}
                        data-testid={"SavedNote-saveNote"} >Save</button>
            </div>
        )
    }
    return (
        <div className="note-wrapper border border-primary">
            <p>{note.description}</p>
            <button type="button" className="btn btn-primary btn-sm" data-testid={"SavedNote-editNote"}
                    onClick={() => setEditMode(true)}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm" data-testid={"SavedNote-deleteNote"}
                    onClick={removeNote}>Delete</button>
        </div>
    )
});
