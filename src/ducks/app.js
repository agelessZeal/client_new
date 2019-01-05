import { createAction, createReducer } from 'redux-act'
import { push } from 'react-router-redux'
import { pendingTask, begin, end } from 'react-redux-spinner'
import { notification } from 'antd'
import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import {API_URL, CLIENT_ROOT_URL, AUTH_ERROR, AUTH_USER} from "./types";


const REDUCER = 'app'
const NS = `@@${REDUCER}/`

const _setFrom = createAction(`${NS}SET_FROM`)
const _setLoading = createAction(`${NS}SET_LOADING`)
const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`)

export const setUserState = createAction(`${NS}SET_USER_STATE`)
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`)
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`)
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`)
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`)
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`)
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`)

export const setLoading = isLoading => {
  const action = _setLoading(isLoading)
  action[pendingTask] = isLoading ? begin : end
  return action
}

export const resetHideLogin = () => (dispatch, getState) => {
  const state = getState()
  if (state.pendingTasks === 0 && state.app.isHideLogin) {
    dispatch(_setHideLogin(false))
  }
  return Promise.resolve()
}

export const initAuth = roles => (dispatch, getState) => {
  // console.log('roles inside initAuth', roles)
  // Use Axios there to get User Data by Auth Token with Bearer Method Authentication

  const userRole = window.localStorage.getItem('app.Role')
  // console.log('userRole initAuth', userRole)
  const state = getState();
  console.log('state', state)
  let pagRoute = state.routing.location.pathname;
  console.log('pagRoute initAuth', pagRoute)


  const users = {
    administrator: {
      email: 'admin@mediatec.org',
      role: 'administrator',
    },
    agent: {
      email: 'agent@mediatec.org',
      role: 'agent',
    },
  }

  const setUser = userState => {
    dispatch(
      setUserState({
        userState: {
          ...userState,
        },
      }),
    )

    if (!roles.find(role => role === userRole)) {
      if (!(pagRoute === '/dashboard')) {
        dispatch(push('/dashboard'))
      }
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
  }


  switch (pagRoute){
      case '/auth/register':
          return Promise.reject();
      default:
          break;
  }

  switch (userRole) {
    case 'administrator':
      return setUser(users.administrator, userRole)

    case 'agent':
      return setUser(users.agent, userRole)

    default:
      const location = state.routing.location
      const from = location.pathname + location.search
      dispatch(_setFrom(from))
      dispatch(push('/login'))
      return Promise.reject()
  }
};

export function connect_seller(sellerid, sellertoken, username, dispatch) {
  /*const userId = cookie.load('uid');
  const url = `/demo/order/config?userId=${userId}&sellerId=${sellerid}&sellerToken=${sellertoken}&username=${username}`;
  console.log("UserId: ", userId);
  const type = {};
  return dispatch => getData(type, true, url, dispatch);*/
  console.log("API_URL: "+API_URL);
  axios.post(`${API_URL}/demo/order/config`, { userId: cookie.load('uid'), sellerId: sellerid, sellerToken: sellertoken, username: username })
    .then((response) => {
      dispatch(push('/dashboard'));
      notification.open({
        type: 'success',
        message: 'You have successfully connected!',
        description:
          'Welcome to the Seller Capital, You could browse whatever you want !',
      });
      return true
    })
    .catch((error) => {
      dispatch(push('/connectselleraccount'))
      //dispatch(_setFrom(''));
      notification.open({
        type: 'faild',
        message: 'Connect Seller Faild',
        description:
          'You have entered wrong id,token,email, please try again later !',
      });
      return false;
    });
};

export function login(username, password, dispatch) {
  // Use Axios there to get User Auth Token with Basic Method Authentication
    let errors = [];
    axios.post(`${API_URL}/auth/login`, { email: username, password: password })
        .then((response) => {
            cookie.save('token', response.data.token, { path: '/' });
            cookie.save('user', response.data.user, { path: '/' });
            cookie.save('uid', response.data.user['_id'], { path: '/' });
            window.localStorage.setItem('app.Authorization', '');
            window.localStorage.setItem('app.Role', 'administrator');
            dispatch(_setHideLogin(true));
            dispatch(push('/dashboard'));
            notification.open({
                type: 'success',
                message: 'You have successfully logged in!',
                description:
                    'Welcome to the Seller Capital, You could browse whatever you want !',
            })
            return true
        })
        .catch((error) => {
            // dispatch(push('/login'))
            dispatch(_setFrom(''));
          if(error && error.response){
            var resStatus = error.response.status;
            if(resStatus === 401){
                errors.push({code: 401, message: 'Login Failed!', description: 'You have entered wrong username/password, please try again later !'});
                return errors;
            }
          }
        });

          notification.open({
              type: 'success',
              message: 'Login failed',
              description:
                  'Welcome to the Seller Capital, You could browse whatever you want !',
          })
  return false;
}

export function register(firstName, lastName, email, password, dispatch){
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password  })
        .then((response) => {
            if(response && response.status === 201 ){
                cookie.save('token', response.data.token, { path: '/' });
                cookie.save('user', response.data.user, { path: '/' });
                cookie.save('uid', response.data.user['_id'], { path: '/' });
                window.localStorage.setItem('app.Authorization', '')
                window.localStorage.setItem('app.Role', 'administrator')
                dispatch(_setHideLogin(true))
                console.log("register success")
                dispatch(push('/connectselleraccount'));//connectselleraccount
                notification.open({
                    type: 'success',
                    message: 'You have successfully Signed UP!',
                    description:
                        'Welcome to the Seller Capital, You could browse whatever you want !',
                })
                return true
            }

        })
        .catch((error) => {
            // dispatch(push('/login'))
            dispatch(_setFrom(''));
            if(error && error.response){
                var resStatus = error.response.status;
                if(resStatus === 401){
                    notification.open({
                        type: 'warning',
                        message: 'Login Failed!',
                        description:
                            'You have entered wrong username/password, please try again later !',
                    })
                }else if(resStatus === 422){
                    notification.open({
                        type: 'warning',
                        message: 'Login Failed!',
                        description:
                            'You have entered wrong username/password, please try again later !',
                    })
                }
            }
        });
    return false
}

export const logout = () => (dispatch, getState) => {
  dispatch(
    setUserState({
      userState: {
        email: '',
        role: '',
      },
    }),
  )
  window.localStorage.setItem('app.Authorization', '')
  window.localStorage.setItem('app.Role', '')
  dispatch(push('/login'))
}

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: false,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: true,
    themeLight: false,
    squaredBorders: false,
    borderLess: true,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    email: '',
    role: '',
  },
}

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => ({ ...state, userState }),
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param }
      const newState = { ...state, layoutState }
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState))
      return newState
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog }
      if (activeDialog !== '') {
        const id = activeDialog
        result.dialogForms = { ...state.dialogForms, [id]: true }
      }
      return result
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms }
      delete dialogForms[id]
      return { ...state, dialogForms }
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true }
      return { ...state, submitForms }
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms }
      delete submitForms[id]
      return { ...state, submitForms }
    },
  },
  initialState,
)
