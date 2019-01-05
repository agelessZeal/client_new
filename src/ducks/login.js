import { createReducer } from 'redux-act'
import * as app from './app'
import { message } from 'antd'
import { notification } from 'antd'

export const REDUCER = 'login';

export const submit = ({ username, password }: { username: string, password: string }) => (
  dispatch: Function,
  getState: Function,
) => {
  dispatch(app.addSubmitForm(REDUCER));

  let isLoggined = app.login(username, password, dispatch)
    console.log('message', isLoggined)

  if (isLoggined && typeof isLoggined === 'boolean') {
    dispatch(app.deleteSubmitForm(REDUCER))
    console.log('error happend boolean')
  } else if(isLoggined && typeof isLoggined === 'object') {

    console.log('error happend object')
    console.log('message', isLoggined)
      message.error('Invalid username or password')
      notification.open({
          type: 'success',
          message: 'Login Failed!',
          description:
              'You have entered wrong username/password, please try again later !',
      })
    dispatch(isLoggined)
    // message.error('Invalid username or password')
  }else{
    console.log('error happend janina')
      dispatch(app.deleteSubmitForm(REDUCER))
  }
};

const initialState = {}
export default createReducer({}, initialState)
