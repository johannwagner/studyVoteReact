
const defaultState = {
    fetchProgressPending: false,
    progressItems: [],

    fetchCoursesPending: false,
    courseItems: [],

    putUserCourseInstancePending: false,

    getCourseInstanceDetailPending: false,
    courseInstanceDetail: null,

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


        default:
            return state;
    }
}