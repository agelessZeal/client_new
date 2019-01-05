import { createReducer } from 'redux-act';
import * as app from './app'
import { message } from 'antd'
import cookie from "react-cookie";
import {UPDATE_PROFILE, PROFILE_ERROR, FETCH_ORDERS, ORDER_ERROR, API_URL} from "./types";
import axios from "axios";

export const REDUCER = 'profile'

export const submit = ({firstName, lastName, email, password}: {firstName: string,
    lastName: string, email: string, password: string}) => (dispatch: Function, getState: Function,)=>{
    // dispatch(app.addSubmitForm(REDUCER))
    const userId = cookie.load('uid');
    let uData = {firstName, lastName, email};
    if(password){
        uData.password = password;
    }
    return updateProfile(userId, uData, dispatch);

}

export function updateProfile(...params){
    let uData = params[1];
    let id = params[0];
    const url = '/update_profile';
    const requestUrl = API_URL + url;
    let headers = { headers: { Authorization: cookie.load('token') } };

    axios.post(requestUrl, {id: id, uData: uData}, headers)
        .then((response) => {
            return response;
        })
        .catch((error) => {
           return error;
        });
}


const initialState = {}
export default createReducer({}, initialState)
