// reducer.js
import { FETCH_ANIMALS_SUCCESS } from '../Actions/Actions';

const initialState = {
    animals: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ANIMALS_SUCCESS:
            return {
                ...state,
                animals: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
