import * as ActionTypes from './ActionTypes';
export const Partners = (state = { isLoading: true,
    errMess: null,
    partners: [] }, action) => {
        console.log("Partners Reducer", action);
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            console.log("action.payload", action.payload);
            return {...state, partners: action.payload, errMess: null, isLoading: false};
        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null};
        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};