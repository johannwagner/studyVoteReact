
const defaultState = {
    fetchProgressPending: false,
    progressItems: [],

    fetchCoursesPending: false,
    courseItems: [],

    putUserCourseInstancePending: false,

    getCourseInstanceDetailPending: false,
    courseInstanceDetail: null,

    getUserProgressPerCourseInstancePending: false,
    userProgressPerCourseInstance: null,

    putUserAccountPending: false,
    putUserAccount: null,
    putUserAccountError: null,

};

export default function locationReducer(state = defaultState, action) {
    switch (action.type) {

        case "FETCH_PROGRESS_PENDING":
            return {
                ...state,
                fetchProgressPending: true
            };
        case "FETCH_PROGRESS_FULFILLED":
            return {
                ...state,
                fetchProgressPending: false,
                progressItems: action.payload.data
            };
        case "FETCH_PROGRESS_REJECTED":
            return {
                ...state,
                fetchProgressPending: false,
                progressItems: []
            };

        case "FETCH_COURSES_PENDING":
            return {
                ...state,
                fetchCoursesPending: true
            };
        case "FETCH_COURSES_FULFILLED":
            return {
                ...state,
                fetchCoursesPending: false,
                courseItems: action.payload.data
            };
        case "FETCH_COURSES_REJECTED":
            return {
                ...state,
                fetchCoursesPending: false,
                courseItems: []
            };

        case "PUT_USER_COURSE_INSTANCE_PENDING":
            return {
                ...state,
                putUserCourseInstancePending: true
            };
        case "PUT_USER_COURSE_INSTANCE_FULFILLED":
            return {
                ...state,
                putUserCourseInstancePending: false,
            };
        case "PUT_USER_COURSE_INSTANCE_REJECTED":
            return {
                ...state,
                putUserCourseInstancePending: false,
            };
        case "GET_COURSE_INSTANCE_DETAIL_PENDING":
            return {
                ...state,
                getCourseInstanceDetailPending: true
            };
        case "GET_COURSE_INSTANCE_DETAIL_FULFILLED":
            return {
                ...state,
                getCourseInstanceDetailPending: false,
                courseInstanceDetail: action.payload.data
            };
        case "GET_COURSE_INSTANCE_DETAIL_REJECTED":
            return {
                ...state,
                getCourseInstanceDetailPending: false,
                courseInstanceDetail: null,
            };
        case "GET_USER_PROGRESS_PER_COURSE_INSTANCE":
            return {
                ...state,
                getUserProgressPerCourseInstancePending: true
            };
        case "GET_USER_PROGRESS_PER_COURSE_INSTANCE_FULFILLED":
            return {
                ...state,
                getUserProgressPerCourseInstancePending: false,
                userProgressPerCourseInstance: action.payload.data
            };
        case "GET_USER_PROGRESS_PER_COURSE_INSTANCE_REJECTED":
            return {
                ...state,
                getUserProgressPerCourseInstancePending: false,
                userProgressPerCourseInstance: null
            };
        case "PUT_ADMISSION_REQUIREMENT_ITEM_WEEK":
            return {
                ...state,
                putAdmissionRequirementItemWeekPending: true
            };
        case "PUT_ADMISSION_REQUIREMENT_ITEM_WEEK_FULFILLED":
            return {
                ...state,
                putAdmissionRequirementItemWeekPending: false
            };
        case "PUT_ADMISSION_REQUIREMENT_ITEM_REJECTED":
            return {
                ...state,
                putAdmissionRequirementItemWeekPending: false
            };
        case "PUT_USER_ACCOUNT":
            return {
                ...state,
                putUserAccountPending: true
            };
        case "PUT_USER_ACCOUNT_FULFILLED":
            return {
                ...state,
                putUserAccountPending: false,
                putUserAccountError: null,

            };
        case "PUT_USER_ACCOUNT_REJECTED":
            return {
                ...state,
                putUserAccountPending: false,
                putUserAccountError: action.data
            };

        default:
            return state;
    }
}