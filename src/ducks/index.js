import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {pendingTasksReducer} from 'react-redux-spinner'
import app from './app'
import login from './login'
import { logout } from 'ducks/app'
// import order from './order'
import orderReducer from './../reducers/order_reducer';
import feedbackReducer from './../reducers/feedback_reducer';
import productReducer from './../reducers/product_reducer';
import authReducer from './../reducers/auth_reducer';
import userReducer from './../reducers/user_reducer';
import templateReducer from './../reducers/template_reducer';
import campaignReducer from './../reducers/campaign_reducer';
import mailReducer from './../reducers/mail_reducer';
import dashboardReducer from './../reducers/dashboard_reducer';
import cookie from 'react-cookie';

// for crud operation
import axios from 'axios';
import { STATIC_ERROR, FETCH_USER, API_URL, CLIENT_ROOT_URL } from './types';


function dispatchLoader (dispatch, loaderType, bool) {
  if (loaderType) {
    dispatch({
        type: loaderType,
        payload: bool,
    });
  }
}

export default combineReducers({
    routing: routerReducer,
    pendingTasks: pendingTasksReducer,
    app,
    login,
    order: orderReducer,
    feedback: feedbackReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    template: templateReducer,
    campaign: campaignReducer,
    mail: mailReducer,
    dashboard: dashboardReducer,
})


export function updateProfile(values) {
}

export function fetchUser(uid) {
    return function (dispatch) {
        let aToken = cookie.load('token');
        if(!aToken){
          return  dispatch(logout())
        }
        axios.get(`${API_URL}/user/${uid}`, {
            headers: { Authorization: aToken },
        }).then((response) => {
                dispatch({
                    type: FETCH_USER,
                    payload: response.data,
                });
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, errorType);
            });
            // .catch(response => dispatch(errorHandler(response)));
            // .catch(response => dispatch({type: 'auth', message: 'something issues'}));
    };
}



export function errorHandler(dispatch, response, type) {
    let errorMessage;

    // NOT AUTHENTICATED ERROR
    // if (response.error && response.error.status && response.error.status === 401) {
    //     errorMessage = 'You are not authorized to do this.';
    //     return  dispatch(logout())
    // }
    //
    // dispatch({
    //     type,
    //     payload: errorMessage,
    // });
}


// Post Request
export function postData(type, isAuthReq, url, dispatch, data) {
  const {actionType, errorType, loaderType} = type
    dispatchLoader(dispatch, loaderType, true)
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        var myHeaders = new Headers({
            Authorization: aToken,
            "Content-Type": "application/json",
        });
    }

    // axios.post(requestUrl, data, headers)
    //     .then((response) => {
    //         dispatch({
    //             type: action,
    //             payload: response.data,
    //         });
    //     })
    //     .catch((error) => {
    //         console.log('postData error', error);
    //         errorHandler(dispatch, error.response, errorType);
    //     });

    fetch(requestUrl, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: myHeaders,
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then((response) => {
            dispatch({
                type: actionType,
                payload: response,
            });
            dispatchLoader(dispatch, loaderType, false)
        })
    .catch((error) => {
        dispatchLoader(dispatch, loaderType, false)
        errorHandler(dispatch, error.response, errorType);
    })


}
// Post Request With multipart
export function postDataMultiPart(type, isAuthReq, url, dispatch, data) {
    const {actionType, errorType, loaderType} = type
    const requestUrl = API_URL + url;

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        var myHeaders = new Headers({
            Authorization: aToken,
        });
    }

    // axios.post(requestUrl, data, headers)
    //     .then((response) => {
    //         dispatch({
    //             type: action,
    //             payload: response.data,
    //         });
    //     })
    //     .catch((error) => {
    //         console.log('postData error', error);
    //         errorHandler(dispatch, error.response, errorType);
    //     });

    fetch(requestUrl, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: myHeaders,
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: data, // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then((response) => {
            dispatch({
                type: actionType,
                payload: response,
            });
        })
    .catch((error) => {
        console.log('postData error', error);
        errorHandler(dispatch, error.response, errorType);
    })


}

export function putDataFetchAPI(type, isAuthReq, url, dispatch, data) {
    const {actionType, errorType, loaderType} = type
    const requestUrl = API_URL + url;
    dispatchLoader(dispatch, loaderType, true)

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        var myHeaders = new Headers({
            Authorization: aToken,
            "Content-Type": "application/json",
        });
    }

    // axios.post(requestUrl, data, headers)
    //     .then((response) => {
    //         dispatch({
    //             type: action,
    //             payload: response.data,
    //         });
    //     })
    //     .catch((error) => {
    //         console.log('postData error', error);
    //         errorHandler(dispatch, error.response, errorType);
    //     });

    fetch(requestUrl, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: myHeaders,
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then((response) => {
            dispatch({
                type: actionType,
                payload: response,
            });
          dispatchLoader(dispatch, loaderType, false)
        })
    .catch((error) => {
        dispatchLoader(dispatch, loaderType, false)
        errorHandler(dispatch, error.response, errorType);
    })


}

export function putDataFetchAPIMultiPart(type, isAuthReq, url, dispatch, data) {
    const {actionType, errorType, loaderType} = type
    const requestUrl = API_URL + url;

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        var myHeaders = new Headers({
            Authorization: aToken,
        });
    }
    fetch(requestUrl, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: myHeaders,
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: data, // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then((response) => {
            dispatch({
                type: actionType,
                payload: response,
            });
        })
    .catch((error) => {
        console.log('postData error', error);
        errorHandler(dispatch, error.response, errorType);
    })


}

// Get Request
export function getData(type, isAuthReq, url, dispatch) {
    const {actionType, errorType, loaderType} = type;
    dispatchLoader(dispatch, loaderType, true);
    const requestUrl = API_URL + url;
    let headers = {};
    console.log("URL: ", url);
    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        headers = { headers: { Authorization: aToken } };
    }

    axios.get(requestUrl, headers)
        .then((response) => {
            dispatch({
                type: actionType,
                payload: response.data,
            });
            dispatchLoader(dispatch, loaderType, false)
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, errorType);
            dispatchLoader(dispatch, loaderType, false)
        });
}

// Put Request
export function putData(type, isAuthReq, url, dispatch, data) {
  const {actionType, errorType, loaderType} = type
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        headers = { headers: { Authorization: aToken } };
    }

    axios.put(requestUrl, data, headers)
        .then((response) => {
            dispatch({
                type: actionType,
                payload: response.data,
            });
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, errorType);
        });
}

// Delete Request
export function deleteData(type, isAuthReq, url, dispatch) {
    const {actionType, errorType, loaderType} = type
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        headers = { headers: { Authorization: aToken } };
    }

    axios.delete(requestUrl, headers)
        .then((response) => {
            dispatch({
                type: actionType,
                payload: response.data,
            });
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, errorType);
        });
}
// Get Request only for feedback request
export function getDataAnalysis(type, isAuthReq, url, dispatch) {
    const {actionType, errorType, loaderType} = type
    dispatchLoader(dispatch, loaderType, true)
    const requestUrl = API_URL + url;
    let headers = {};
    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        headers = { headers: { Authorization: aToken } };
    }


    axios.get(requestUrl, headers)
        .then((response) => {
            dispatch({
                type: actionType,
                payload: response.data,
            });
            dispatchLoader(dispatch, loaderType, false)
        })
        .catch((error) => {
            dispatchLoader(dispatch, loaderType, false)
            errorHandler(dispatch, error.response, errorType);
        });
}
// Post Request
export function postDataAnalysis(type, isAuthReq, url, dispatch, data) {
  const {actionType, errorType, loaderType} = type
    // const requestUrl = API_URL + url;
    const requestUrl = 'http://178.128.73.230:9001/api' + url;
    let headers = {};

    if (isAuthReq) {
        const aToken = cookie.load('token');
        if(!aToken){
            return  dispatch(logout())
        }
        var myHeaders = new Headers({
            Authorization: aToken,
            "Content-Type": "application/json",
        });
    }

    // axios.post(requestUrl, data, headers)
    //     .then((response) => {
    //         dispatch({
    //             type: action,
    //             payload: response.data,
    //         });
    //     })
    //     .catch((error) => {
    //         console.log('postData error', error);
    //         errorHandler(dispatch, error.response, errorType);
    //     });

    fetch(requestUrl, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, cors, *same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, same-origin, *omit
        headers: myHeaders,
        // redirect: "follow", // manual, *follow, error
        // referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then((response) => {
            dispatch({
                type: actionType,
                payload: response,
            });
        })
    .catch((error) => {
        console.log('postData error', error);
        errorHandler(dispatch, error.response, errorType);
    })


}
