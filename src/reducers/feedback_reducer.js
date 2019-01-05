import {
  FETCH_FEEDBACK,
  FETCH_FEEDBACK_LOADER,
  FETCH_SINGLE_FEEDBACK,
  FEEDBACK_ERROR,
  FEEDBACK_ANALYSIS,
  FEEDBACK_ANALYSIS_LOADER,
  RECENT_FEEDBACK,
  FEEDBACK_REMOVAL,
} from '../ducks/types';

const INITIAL_STATE = {
  feedbacks: [],
  feedbacksLoader: false,
  single_feedback: {},
  error: '',
  totalNegativeFeedback: 0,
  totalNeutralFeedback: 0,
  totalFeedbackRequestRemoval: 2,
  feedbackAnalysis: [],
  feedbackAnalysisLoader: false,
  recentFeedback: [],
  feedbackRemoval: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_FEEDBACK:
            return {
              ...state,
              feedbacks: action.payload.feedbacks,
              totalNeutralFeedback: action.payload.totalNeutralFeedback,
              totalNegativeFeedback: action.payload.totalNegativeFeedback,
              totalFeedbackRequestRemoval: action.payload.totalFeedbackRequestRemoval,
             };
        case FETCH_SINGLE_FEEDBACK:
            return { ...state, single_feedback: action.payload.feedback };
        case FEEDBACK_ANALYSIS:
          return {...state, feedbackAnalysis: action.payload.feedback_analysis}
        case FETCH_FEEDBACK_LOADER:
          return {...state, feedbacksLoader: action.payload }
        case FEEDBACK_ANALYSIS_LOADER:
          return {...state, feedbackAnalysisLoader: action.payload}
        case RECENT_FEEDBACK:
          return {...state, recentFeedback: action.payload.recent_feedback}
        case FEEDBACK_ERROR:
            return { ...state, error: action.payload };
        case FEEDBACK_REMOVAL:
            return { ...state, feedbackRemoval: action.payload };
        default:
    }

    return state;
}
