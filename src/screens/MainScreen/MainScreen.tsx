import React from 'react';
import {AddNote} from "../../components/AddNote/AddNote";
import NotesContainer from "../../components/NotesContainer/NotesContainer";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../redux/types";

const MainScreen: React.FC = () => {
    const loadingMode = useSelector((state:ApplicationState) => state.loadingMode);

    return (
        <React.Fragment>
            <AddNote/>
            {loadingMode?<h4>Action Finished Successfully</h4>:null}
            <br/>
            <NotesContainer/>
        </React.Fragment>
    );
};

export default MainScreen;
