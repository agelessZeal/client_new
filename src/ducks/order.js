import {
  API_URL,
  CLIENT_ROOT_URL,
  FETCH_ORDERS,
  FETCH_ORDERS_LOADER,
  FETCH_SINGLE_ORDER,
  ORDER_ERROR,
  ORDER_ANALYSIS,
  ORDER_ANALYSIS_LOADER,
  ORDER_EMAIL_SENT,
} from "./types";


// for crud operation
import {
  getData,
  postData,
  putData,
  deleteData,
  getDataAnalysis,
  postDataAnalysis,

} from './index';


export function fetchOrders(userId) {

    const url = `/orders?userId=${userId}`;
    const type = {
      actionType: FETCH_ORDERS,
      errorType: ORDER_ERROR,
      loaderType: FETCH_ORDERS_LOADER,
    }
    return dispatch => getData(type, true, url, dispatch);
}

export function fetchFilteredOrders(filter) {
    const url = '/orders';
    const type = {
      actionType: FETCH_ORDERS,
      errorType: ORDER_ERROR,
      loaderType: FETCH_ORDERS_LOADER,
    }
    return dispatch => postData(type, true, url, dispatch, filter);
}

export function fetchOrderAnalysis(payload) {
    let url = '/order_analysis_filter';
    // let url = '/order_analysis';
    const type = {
      actionType: ORDER_ANALYSIS,
      errorType: ORDER_ERROR,
      loaderType: ORDER_ANALYSIS_LOADER,
    }
    return dispatch => postData(type, true, url, dispatch, payload);
}
export function sendMailToOrderer(values) {
    let url = '/send_mail_to_orderer';
    if (values.templateId) {
      url = '/send_mail_to_orderer_with_template';
    }
    console.log('values inside sendMailToOrderer function', values)
    console.log('url sendMailToOrderer', url)
    const type = {
      actionType: ORDER_EMAIL_SENT,
      errorType: ORDER_ERROR,
      loaderType: null
    }
    return dispatch => postData(type, true, url, dispatch, values);
}

