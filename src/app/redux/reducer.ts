import { AppState } from './appState';
import { Action } from './action';
import { ActionType } from './actionType';

export class Reducer {

    public static reduce(oldState: AppState, action: Action): AppState {

        const newState = { ...oldState };

        switch (action.type) {
            // bring the bgColor
            case ActionType.getBgColor:
                newState.bgColor = action.payload;
                break;
        }

        return newState;
    }
}