
const defaultState = {
    putGroupPending: false,
    putGroupError: null,
};

export default function locationReducer(state = defaultState, action) {
    switch (action.type) {
        case 'PUT_GROUP':
            return {
                ...state,
                putGroupPending: true,
            }
        case 'PUT_GROUP_FULFILLED':
            return {
                ...state,
                putGroupPending: false,
            }
        case 'PUT_GROUP_REJECTED':
            return {
                ...state,
                putGroupPending: true,
                putGroupError: action.data
            }
        case 'POST_COURSE_INSTANCE_GROUP':
            return {
                ...state,
                postGroupPending: true
            }
        case 'POST_COURSE_INSTANCE_GROUP_FULFILLED':
            return {
                ...state,
                postGroupPending: false
            }
        case 'POST_COURSE_INSTANCE_GROUP_REJECTED':
            return {
                ...state,
                postGroupPending: false
            }
    }
}