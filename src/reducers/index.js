import { combineReducers } from 'redux';
import orderReducer from './order_reducer';
import profileReducer from './profile_reducer';
import authReducer from './../reducers/auth_reducer';
import userReducer from './../reducers/user_reducer';
import templateReducer from './../reducers/template_reducer';
import mailReducer from './../reducers/mail_reducer';
import dashboardReducer from './../reducers/dashboard_reducer';

const rootReducer = combineReducers({
    order: orderReducer,
    profile: profileReducer,
    auth: authReducer,
    user: userReducer,
    template: templateReducer,
    mail: mailReducer,
    campaign: mailReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;
