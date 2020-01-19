import {Reducer} from "redux";
import {LoadingModeState} from "../types";
import {TOGGLE_LOADING} from "../actions/loading-mode.actions";

const loadingModeReducer:Reducer<LoadingModeState> = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return !state;
        default:
            return state;
    }
};

export default loadingModeReducer;