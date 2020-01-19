import {ApplicationState} from "./redux/types";
import React, {ReactNode} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render} from '@testing-library/react'
import {rootReducer} from "./redux";

const InitializedComponentWithStore = (storeSpecificProperties: Partial<ApplicationState>, componentToRender:ReactNode) => {
    let initialState: ApplicationState;
    let store;
    initialState = {
        notes: [],
        loadingMode: false
    };

    initialState = Object.assign(initialState, storeSpecificProperties);

    store = createStore(rootReducer, initialState);
    return {
        ...render(<Provider store={store}>{componentToRender}</Provider>)
    }
};

export default InitializedComponentWithStore;