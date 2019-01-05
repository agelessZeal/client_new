import { FETCH_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from './../ducks/types';

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            console.log(action.payload);
            return { ...state, profile: action.payload };
        case ERROR_RESPONSE:
            return { ...state, error: action.payload };
    }

    return state;
}