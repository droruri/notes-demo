import React from 'react';
import {createStore} from 'redux';
import MainScreen from "./screens/MainScreen/MainScreen";
import {rootReducer} from "./redux";
import {Provider} from "react-redux";
import {Note} from "./types/Note";
import {ApplicationState} from "./redux/types";

const initialNotes:Note[] = [{id:1, description: 'My 1 note'}, {id:2, description: 'My 2 note'}];

const initialState: ApplicationState = {
    notes: initialNotes,
    loadingMode: false
};

const store = createStore(rootReducer,initialState);
const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="app">
                <MainScreen/>
            </div>
        </Provider>
    );
};

export default App;
