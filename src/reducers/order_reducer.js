import {
  FETCH_ORDERS,
  FETCH_ORDERS_LOADER,
  FETCH_SINGLE_ORDER,
  ORDER_ERROR,
  ORDER_ANALYSIS,
  ORDER_ANALYSIS_LOADER,
  ORDER_EMAIL_SENT,
} from '../ducks/types';

const INITIAL_STATE = {
  orders: [],
  ordersLoader: false,
  order: '',
  error: '',
  orderAnalysis: [],
  orderAnalysisLoader: false,
  orderEmailSentMsg: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ORDERS:
            return { ...state, orders: action.payload.orders };
        case ORDER_ANALYSIS:
            if (Array.isArray(action.payload.order_analysis)) {
              return { ...state, orderAnalysis: action.payload.order_analysis };
            } else {
              return state;
            }
        case ORDER_ANALYSIS_LOADER:
          return {...state, orderAnalysisLoader: action.payload}
        case FETCH_ORDERS_LOADER:
          return {...state, ordersLoader: action.payload}
        case FETCH_SINGLE_ORDER:
            return { ...state, order: action.payload.order };
        case ORDER_ERROR:
            return { ...state, error: action.payload };
        case ORDER_EMAIL_SENT:
            return { ...state, orderEmailSentMsg: action.payload };
        default:
    }

    return state;
}
