import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'
import { notification } from 'antd'

export const REDUCER = 'seller'

export const submit = ({ sellerid, sellertoken, username}: { sellerid: string, sellertoken: string, username: string}) => (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(app.addSubmitForm(REDUCER));

  let isConnected = app.connect_seller(sellerid, sellertoken, username, dispatch);
  if (isConnected && typeof isConnected === 'boolean') {
    dispatch(app.deleteSubmitForm(REDUCER))
  } else if(isConnected && typeof isConnected === 'object') {
    message.error('Invalid username or password');
    notification.open({
      type: 'success',
      message: 'Login Failed!',
      description:
        'You have entered wrong username/password, please try again later !',
    })
    dispatch(isConnected)
    // message.error('Invalid username or password')
  }else{
    dispatch(app.deleteSubmitForm(REDUCER))
  }
};

const initialState = {};
export default createReducer({}, initialState)
