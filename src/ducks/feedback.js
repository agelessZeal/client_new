import {
    API_URL,
    CLIENT_ROOT_URL,
    FETCH_ORDERS,
    FETCH_FEEDBACK,
    FETCH_FEEDBACK_LOADER,
    FEEDBACK_ERROR,
    FETCH_SINGLE_ORDER,
    ORDER_ERROR,
    FETCH_PRODUCTS, PRODUCT_ERROR,
    FEEDBACK_ANALYSIS,
    FEEDBACK_ANALYSIS_LOADER,
    RECENT_FEEDBACK,
    FEEDBACK_REMOVAL,
} from "./types";

// for crud operation
import {
  getData,
  postData,
  putData,
  deleteData,
  getDataAnalysis,
} from './index';


export function fetchFeedback(userId) {
    const url = `/feedback?userId=${userId}`;
    const type = {
      actionType: FETCH_FEEDBACK,
      errorType: FEEDBACK_ERROR,
      loaderType: FETCH_FEEDBACK_LOADER,
    }

    return function (dispatch) {
        getData(type, true, url, function (respData) {
            return dispatch(respData);
        })
    }
}
// get data from mws  FeedbackController.getAllFeedback
export function requestForUpdateFeedback(userId){
    const url = `/feedback_report_request?userId=${userId}`;
    const type = {
      actionType: FETCH_FEEDBACK,
      errorType: FEEDBACK_ERROR,
      loaderType: FETCH_FEEDBACK_LOADER,
    }
    console.log('request Feedback');
    return dispatch => getData(type, true, url, dispatch);
}

// export function fetchFilteredFeedback_Old(filter) {
//     // console.log(filter);
//     const url = '/feedback';
//     // return dispatch => postData(FETCH_ORDERS, ORDER_ERROR, true, url, dispatch, filter);
//     const type = {
//       actionType: FETCH_FEEDBACK,
//       errorType: FEEDBACK_ERROR,
//       loaderType: FETCH_FEEDBACK_LOADER,
//     }
//     return function (dispatch) {
//         getData(type, true, url, function (respData) {
//             return dispatch(respData);
//         })
//     }
// }

export function fetchFeedbackFilters(filter) {
    const url = '/feedback';
    const type = {
      actionType: FETCH_FEEDBACK,
      errorType: FEEDBACK_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type, true, url, dispatch, filter);
}

// export function fetchFeedbackAnalysis(filter) {
//     const url = '/feedback_analysis';
//     return dispatch => getData(FEEDBACK_ANALYSIS, FEEDBACK_ERROR, true, url, dispatch);
// }

export function fetchFeedbackAnalysis(payload) {
    let url = '/feedback_analysis';
    const type = {
      actionType: FEEDBACK_ANALYSIS,
      errorType: FEEDBACK_ERROR,
      loaderType: FEEDBACK_ANALYSIS_LOADER,
    }
    return dispatch => postData(type, true, url, dispatch, payload);
}
export function fetchRecentFeedback(userId) {
    let url = `/recent_feedback?userId=${userId}`;
    const type = {
      actionType: RECENT_FEEDBACK,
      errorType: FEEDBACK_ERROR,
      loaderType: null,
    }
    return dispatch => getDataAnalysis(type, true, url, dispatch);
}
export function removeFeedbackRequest(payload) {
    let url = '/remove_feedback_request';
    const type = {
      actionType: FEEDBACK_REMOVAL,
      errorType: FEEDBACK_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type, true, url, dispatch, payload);
}


// export const REDUCER = 'order'
