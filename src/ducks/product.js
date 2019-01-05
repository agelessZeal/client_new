import {
  PI_URL,
  CLIENT_ROOT_URL,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_LOADER,
  FETCH_SINGLE_PRODUCT,
  PRODUCT_ERROR,
  TOP_TEN_PRODUCT,
} from "./types";


// for crud operation
import {
  getData,
  postData,
  putData,
  deleteData,
  getDataAnalysis,
} from './index';

// fetch Products from db?  ProductController.list
export function fetchProducts(userId) {
    const url = `/products?userId=${userId}`;
    console.log("UserId: ", userId);
    const type = {
      actionType: FETCH_PRODUCTS,
      errorType: PRODUCT_ERROR,
      loaderType: FETCH_PRODUCTS_LOADER,
    };
    return dispatch => getData(type, true, url, dispatch);
}

// from aws with mws token  ProductController.requestReport in server
export function requestForUpdateReport(userId){
    const url = `/product_report_request?userId=${userId}`;
    const type = {
      actionType: FETCH_PRODUCTS,
      errorType: PRODUCT_ERROR,
      loaderType: FETCH_PRODUCTS_LOADER,
    }
    return dispatch => getData(type, true, url, dispatch);
}

export function fetchProductFilters(filter) {
  const url = '/products'
    const type = {
      actionType: FETCH_PRODUCTS,
      errorType: PRODUCT_ERROR,
      loaderType: FETCH_PRODUCTS_LOADER,
    }
  return dispatch => postData(type, true, url, dispatch, filter);
}

export function fetchTopTenProduct(payload) {
    let url = '/top_product';
    const type = {
      actionType: TOP_TEN_PRODUCT,
      errorType: PRODUCT_ERROR,
      loaderType: null,
    }
  return dispatch => postData(type, true, url, dispatch, payload);
}
