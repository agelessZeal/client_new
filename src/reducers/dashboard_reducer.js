import {
  FETCH_DASHBOARD,
  DASHBOARD_ERROR,
  FETCH_DASHBOARD_DATA_SUMMARY,
  FETCH_DASHBOARD_DATA_SUMMARY_LOADER,
} from '../ducks/types';

const INITIAL_STATE = {
  dashboard: '',
  error: '',
  dashboardDataSummary: {},
  dashboardDataSummaryLoader: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_DASHBOARD:
            return { ...state, dashboard: action.payload.dashboard };
        case DASHBOARD_ERROR:
            return { ...state, error: action.payload };
        case FETCH_DASHBOARD_DATA_SUMMARY:
          return {...state, dashboardDataSummary: action.payload.summary}
        case FETCH_DASHBOARD_DATA_SUMMARY_LOADER:
          return {...state, dashboardDataSummaryLoader: action.payload}
        default:
    }

    return state;
}
