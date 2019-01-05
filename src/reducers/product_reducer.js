import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_LOADER,
  FETCH_SINGLE_PRODUCT,
  PRODUCT_ERROR,
  TOP_TEN_PRODUCT,
} from '../ducks/types';

const INITIAL_STATE = {
  products: [],
  productsLoader: false,
  product: '',
  error: '',
  totalNegativeReview: 0,
  topTenProduct: [],
 };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
             ...state,
             products: action.payload.products,
             totalNegativeReview: action.payload.totalNegativeReview
           };
        case FETCH_PRODUCTS_LOADER:
          return {...state, productsLoader: action.payload}
        case FETCH_SINGLE_PRODUCT:
            return { ...state, product: action.payload.product };
        case PRODUCT_ERROR:
            return { ...state, error: action.payload };
        case TOP_TEN_PRODUCT:
          return {...state, topTenProduct: action.payload.top_product}
        default:
    }
    return state;
}
