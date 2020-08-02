// Define a reducer function to handle changes in the counter value based on the provided actions.
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset, bgColor1, bgColor2, searchingCities } from './actions';

export const initialState = 0;
export const stringState = '';
export const searchedCities = [];

const _counterReducer = createReducer(initialState, 
    on(increment, state => state + 1),
    on(decrement, state => state - 1),
    on(reset, state => 0),
);

const _backgroundReducer = createReducer(stringState,
    on(bgColor1, state => 'black'),
    on(bgColor2, state => 'white'),
);

const _citiesReducer = createReducer(
    
    searchedCities, 

    on(searchingCities, (state, action) => {
        state.push(action.lastCity);
        return state;
    })  
);

export function citiesReducer(state, action) {
    return _citiesReducer(state, action);
}

export function counterReducer(state, action) {
    return _counterReducer(state, action);
}

export function backgroundReducer(state, action) {
    return _backgroundReducer(state, action);
}

