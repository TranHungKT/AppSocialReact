import {LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    STOP_LOADING_UI,
    } from '../type';

const initialState = {
    loading: false,
    errors: null
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return initialState;
        case LOADING_UI:
            return {
                ...state,
                loading: true,
                errors: null
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false,
                errors: null
            }
        default: 
            return state
    }
}