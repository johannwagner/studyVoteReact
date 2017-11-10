const defaultState = {
    openCourseSelector: false,
    openCourseSelectorFunction: null,
    openGroupDetail: false,
    openGroupDetailId: null,
    openCourseDetail: false,
    openCourseDetailId: null,
    openCourseDetailGroup: null,
    openCourseAdd: false

};

export default function locationReducer(state = defaultState, action) {
    switch (action.type) {

        case "OPEN_COURSE_SELECTOR":
            return {
                ...state,
                openCourseSelector: true,
                openCourseSelectorFunction: action.onSelect
            };
        case "CLOSE_COURSE_SELECTOR":
            return {
                ...state,
                openCourseSelector: false,
                openCourseSelectorFunction: null
            };

        case "PUT_USER_COURSE_INSTANCE_FULFILLED":
            return {
                ...state,
                openCourseSelector: false,
                openCourseSelectorFunction: null
            };
        case "OPEN_COURSE_DETAIL":
            return {
                ...state,
                openCourseDetail: true,
                openCourseDetailId: action.detailCourseId
            };
        case "CLOSE_COURSE_DETAIL":
            return {
                ...state,
                openCourseDetail: false
            };
        case "OPEN_GROUP_DETAIL":
            return {
                ...state,
                openGroupDetail: true,
                openGroupDetailId: action.groupId,
                openGroupDetailGroup: action.group
            };
        case "CLOSE_GROUP_DETAIL":
            return {
                ...state,
                openGroupDetail: false
            };
        case "OPEN_ADMISSION_REQUIREMENT_ITEM":
            return {
                ...state,
                openAdmissionRequirementItem: true,
                openAdmissionRequirementItemId: action.admissionRequirementId
            };
        case "CLOSE_ADMISSION_REQUIREMENT_ITEM":
            return {
                ...state,
                openAdmissionRequirementItem: false
            };

        case "OPEN_COURSE_ADD":
            return {
                ...state,
                openCourseAdd: true
            };
        case "CLOSE_COURSE_ADD":
            return {
                ...state,
                openCourseAdd: false
            };

        default:
            return state;
    }
}