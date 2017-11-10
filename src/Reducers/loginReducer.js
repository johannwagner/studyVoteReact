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

        case 'PUT_USER_ACCOUNT_FULFILLED':
        case 'LOGIN_FULFILLED':

            return {
                ...state,
                loginStatus: LoginStatus.LOGIN_FULFILLED,
                loginToken: action.payload.data.token,
                loginSemester: action.payload.data.semester
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