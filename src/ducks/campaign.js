import {API_URL, CLIENT_ROOT_URL, EDIT_TEMPLATE, FETCH_ORDERS, FETCH_SINGLE_ORDER, ORDER_ERROR} from "./types";
import {FETCH_TEMPLATES, FETCH_SINGLE_TEMPLATE, TEMPLATE_ERROR, MAIL_ERROR, SEND_MAIL} from "./types";
import {FETCH_CAMPAIGNS, FETCH_SINGLE_CAMPAIGN, CAMPAIGN_ERROR} from "./types";

// for crud operation
import { getData, postData, putData, deleteData } from './index';
import cookie from "react-cookie";


export function fetchCampaigns() {
    const url = '/campaigns';
    const type = {
      actionType: FETCH_CAMPAIGNS,
      errorType: CAMPAIGN_ERROR,
      loaderType: null,
    }
    return function (dispatch) {
        getData(type,true, url, function (respData) {
            return dispatch(respData);
        })
    }
}

export function cCreationSubmit(formValues) {
    formValues.user = cookie.load('user') && cookie.load('user')['_id'] ? cookie.load('user')['_id'] : '';
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/create_campaign';
    const type = {
      actionType: FETCH_CAMPAIGNS,
      errorType: CAMPAIGN_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type,true, url, dispatch, formValues);
}

export function cModifySubmit(formValues) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/modify_campaign';
    const type = {
      actionType: FETCH_CAMPAIGNS,
      errorType: CAMPAIGN_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type, true, url, dispatch, formValues);
}

export function sendTestMail(id) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/send_test_mail/' + id;
    const type = {
      actionType: SEND_MAIL,
      errorType: MAIL_ERROR,
      loaderType: null,
    }
    return dispatch => getData(type, true, url, dispatch);
}

export function cDeleteSubmit(id) {
    setTimeout(function () {
        return true;
    }, 2000)
    const url = '/delete_campaign/' + id;
    const type = {
      actionType: FETCH_CAMPAIGNS,
      errorType: CAMPAIGN_ERROR,
      loaderType: null,
    }
    return dispatch => deleteData(type, true, url, dispatch);
}

// export const REDUCER = 'order'
