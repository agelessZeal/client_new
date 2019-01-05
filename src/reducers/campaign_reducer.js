import { DELETE_CAMPAIGN, FETCH_CAMPAIGNS, FETCH_SINGLE_CAMPAIGN, CAMPAIGN_ERROR } from '../ducks/types';

const INITIAL_STATE = { campaigns: [], campaign: '', error: '' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CAMPAIGNS:
            return { ...state, campaigns: action.payload.campaigns };
        case FETCH_SINGLE_CAMPAIGN:
            return { ...state, campaign: action.payload.campaign };
        case DELETE_CAMPAIGN:
            return { ...state, campaigns: action.payload.campaigns };
        case CAMPAIGN_ERROR:
            return { ...state, error: action.payload };
        default:
    }

    return state;
}
