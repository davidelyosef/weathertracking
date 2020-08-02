import { createAction, props } from '@ngrx/store';
import { SavedCity } from 'src/models/savedCity';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const bgColor1 = createAction('[Change background-color] Black');
export const bgColor2 = createAction('[Change background-color] White');

export const searchingCities = createAction(
    '[Saving City]',
    props<{ lastCity: SavedCity }>()
);