import {
  FETCH_TEMPLATES,
  FETCH_TEMPLATES_LOADER,
  TEMPLATE_STATUS_TOGGLE_LOADER,
  DELETE_TEMPLATE,
  FETCH_SINGLE_TEMPLATE,
  TEMPLATE_ERROR,
  FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS,
  FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS_LOADER,
  FETCH_SINGLE_TEMPLATE_ANALYSIS,
  FETCH_SINGLE_TEMPLATE_ANALYSIS_LOADER,
} from '../ducks/types';

const staticAnalysis = [
  {
    "_id": "2018-09",
    "totalEmailSent": 2
  },
  {
    "_id": "2018-10",
    "totalEmailSent": 1
  }
]

const INITIAL_STATE = {
  templates: [],
  template: '',
  error: '',
  emailUnsubscribeAnalysis: [],
  emailUnsubscribeAnalysisLoader: false,
  templateLoader: false,
  templateStatusLoader: false,
  singleTemplateAnalysis: [],
  singleTemplateAnalysisLoader: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_TEMPLATES:
            if (Array.isArray(action.payload.templates)) {
              return { ...state, templates: action.payload.templates };
            } else if ((typeof action.payload.templates) == 'object') {
              console.log('your are inside object block');
              let templates = [...state.templates, action.payload.templates ]
              return state;
            }else {
              return state;
            }
        case FETCH_TEMPLATES_LOADER:
          return {...state, templateLoader: action.payload}
        case TEMPLATE_STATUS_TOGGLE_LOADER:
          return {...state, templateStatusLoader: action.payload}
        case FETCH_SINGLE_TEMPLATE:
            return { ...state, template: action.payload.template };
        case DELETE_TEMPLATE:
            return { ...state, templates: action.payload.templates };
        case TEMPLATE_ERROR:
            return { ...state, error: action.payload };
        case FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS:
            if (Array.isArray(action.payload.unsubscribe_analysis)) {
              return { ...state, emailUnsubscribeAnalysis: action.payload.unsubscribe_analysis };
            } else {
              return state;
            }
        case FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS_LOADER:
          return {...state, emailUnsubscribeAnalysisLoader: action.payload}
        case FETCH_SINGLE_TEMPLATE_ANALYSIS:
          // return {...state, singleTemplateAnalysis: staticAnalysis}
          return {...state, singleTemplateAnalysis: action.payload.template_analysis}
        case FETCH_SINGLE_TEMPLATE_ANALYSIS_LOADER:
          return {...state, singleTemplateAnalysisLoader: action.payload}
        default:
    }

    return state;
}
