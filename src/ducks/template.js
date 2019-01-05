import {API_URL, CLIENT_ROOT_URL, FETCH_ORDERS, FETCH_SINGLE_ORDER, ORDER_ERROR} from "./types";
import {
  FETCH_TEMPLATES,
  FETCH_TEMPLATES_LOADER,
  FETCH_SINGLE_TEMPLATE,
  TEMPLATE_ERROR,
  MAIL_ERROR,
  SEND_MAIL,
  FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS,
  FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS_LOADER,
  TEMPLATE_STATUS_TOGGLE_LOADER,
  FETCH_SINGLE_TEMPLATE_ANALYSIS,
  FETCH_SINGLE_TEMPLATE_ANALYSIS_LOADER,
} from "./types";

// for crud operation
import { getData, postData, putData, deleteData, putDataFetchAPI, postDataMultiPart, putDataFetchAPIMultiPart } from './index';


export function fetchTemplates(userId) {
    const url = `/templates?userId=${userId}`;
    const type = {
      actionType: FETCH_TEMPLATES,
      errorType: TEMPLATE_ERROR,
      loaderType: FETCH_TEMPLATES_LOADER,
    }
    return function (dispatch) {
        getData(type, true, url, function (respData) {
            return dispatch(respData);
        })
    }
}
export function toggleTemplateStatus(payload) {
    const url ='/toggle_template_status'
    const type = {
      actionType: FETCH_TEMPLATES,
      errorType: TEMPLATE_ERROR,
      loaderType: TEMPLATE_STATUS_TOGGLE_LOADER,
    }
    return dispatch => putDataFetchAPI(type, true, url, dispatch, payload);
}


export function tCreationSubmit(formValues) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/create_template';
    const type = {
      actionType: FETCH_TEMPLATES,
      errorType: TEMPLATE_ERROR,
      loaderType: null,
    }
    return dispatch => postDataMultiPart(type, true, url, dispatch, formValues);
}

export function tModifySubmit(formValues) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/modify_template';
    const type = {
      actionType: FETCH_TEMPLATES,
      errorType: TEMPLATE_ERROR,
      loaderType: null,
    }
    return dispatch => putDataFetchAPIMultiPart(type, true, url, dispatch, formValues);
}

export function sendTestMail(formValues) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/send-test-template-mail'
    const type = {
      actionType: SEND_MAIL,
      errorType: MAIL_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type, true, url, dispatch, formValues);
}

export function sendTestMailForTemplateEdit(payload) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/send-test-edit-template-mail'
    const type = {
      actionType: SEND_MAIL,
      errorType: MAIL_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type, true, url, dispatch, payload);
}

export function tDeleteSubmit(id) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/delete_template/' + id;
    const type = {
      actionType: FETCH_TEMPLATES,
      errorType: TEMPLATE_ERROR,
      loaderType: null,
    }
    return dispatch => deleteData(type, true, url, dispatch);
}

// export const REDUCER = 'order'
export function fetchEmailUnsubscribeAnalysis(userId, params) {
    let url = `/unsubscribe_analysis?user_id=${userId}`;
    if (params) {
      url += params
    }
    const type = {
      actionType: FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS,
      errorType: TEMPLATE_ERROR,
      loaderType: FETCH_EMAIL_UNSUBSCRIBE_ANALYSIS_LOADER,
    }
    return dispatch => getData(type, true, url, dispatch);
}
export function fetchSingleTemplateAnalysis(payload) {
    let url = '/template/analysis';
    const type = {
      actionType: FETCH_SINGLE_TEMPLATE_ANALYSIS,
      errorType: TEMPLATE_ERROR,
      loaderType: FETCH_SINGLE_TEMPLATE_ANALYSIS_LOADER,
    }
    return dispatch => postData(type, true, url, dispatch, payload);
}

export function resetSingleTemplateAnalysis () {
  return dispatch => {
    dispatch({
      type: FETCH_SINGLE_TEMPLATE_ANALYSIS,
      payload: {
        template_analysis: []
      }
    })

    dispatch ({
      type: FETCH_SINGLE_TEMPLATE_ANALYSIS_LOADER,
      payload: false,
    })

    return 1;
  }
}
