import {
  API_URL,
  CLIENT_ROOT_URL,
  FETCH_DASHBOARD,
  DASHBOARD_ERROR,
  SEND_MAIL,
  MAIL_ERROR,
  FETCH_DASHBOARD_DATA_SUMMARY,
  FETCH_DASHBOARD_DATA_SUMMARY_LOADER,
} from "./types";

// for crud operation
import { getData, postData, putData, deleteData } from './index';
import cookie from 'react-cookie';


export function getUser() {
    return cookie.load('user') || {};
}

export function fetchDashboardDataSummary(payload) {
    let url = '/dashboard/data/summary';
    const type = {
      actionType: FETCH_DASHBOARD_DATA_SUMMARY,
      errorType: DASHBOARD_ERROR,
      loaderType: FETCH_DASHBOARD_DATA_SUMMARY_LOADER,
    }
    return dispatch => postData(type, true, url, dispatch, payload);
}

export function resendWelcomeMail() {
    let user = cookie.load('user') || {};
    setTimeout(function () {
        return true;
    }, 1000)
    const url = '/resend_mail';
    const type = {
      actionType: SEND_MAIL,
      errorType: MAIL_ERROR,
      loaderType: null,
    }
    return dispatch => postData(type, true, url, dispatch, user);
}
