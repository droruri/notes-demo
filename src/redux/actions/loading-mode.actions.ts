export const TOGGLE_LOADING = "TOGGLE_LOADING";

interface ToggleLoading {
    type: typeof TOGGLE_LOADING,
    payload: boolean;
}

export type LoadingModeActionTypes = ToggleLoading;

export function toggleLoading(isLoading:boolean): ToggleLoading {
    return {
        type: TOGGLE_LOADING,
        payload: isLoading
    }
}
