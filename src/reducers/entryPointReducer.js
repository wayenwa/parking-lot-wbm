import { INITIAL_ENTRY_POINTS, INIT_DATA } from '../shared/constants'

const initialState = { INIT_DATA,INITIAL_ENTRY_POINTS }

export function entryPointReducer( state = initialState, action ) {
    switch (action.type) {
        case 'increment':
          return { INIT_DATA : [...state.INITIAL_ENTRY_POINTS],INITIAL_ENTRY_POINTS : [ ...state.INITIAL_ENTRY_POINTS, action.payload ] };
        case 'decrement':
            var array = [...state.INITIAL_ENTRY_POINTS];

            var index = state.INITIAL_ENTRY_POINTS.indexOf(action.payload)

            if (index !== -1) {
                array.splice(index, 1);
                return { INIT_DATA : [...state.INITIAL_ENTRY_POINTS], INITIAL_ENTRY_POINTS : array }
            }
        default:
          return state;
    }
}