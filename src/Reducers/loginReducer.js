import LocationConstants from "../Constants/LocationConstants";
import LoginStatus from "../Constants/LoginConstants";

const defaultState = {
    loginStatus: LoginStatus.NO_LOGIN,
    loginToken: null,
};

export default function locationReducer(state = defaultState, action) {
    switch (action.type) {

        case 'LOGIN_PENDING':
            return {
                ...state,
                loginStatus: LoginStatus.LOGIN_PENDING
            };

        case 'LOGIN_FULFILLED':

            return {
                ...state,
                loginStatus: LoginStatus.LOGIN_FULFILLED,
                loginToken: action.payload.data.token
            };

        case 'LOGIN_REJECTED':
            return {
                ...state,
                loginStatus: LoginStatus.LOGIN_REJECTED
            };

        default:
            return state;
    }
}