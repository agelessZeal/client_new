import { SEND_MAIL, MAIL_ERROR } from '../ducks/types';

const INITIAL_STATE = { mail: '', error: '' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEND_MAIL:
            return { ...state, mail: action.payload.mail };
        case MAIL_ERROR:
            return { ...state, error: action.payload };
        default:
    }

    return state;
}
