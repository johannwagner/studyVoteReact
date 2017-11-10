
export default {
    openCourseSelector: (onSelect) => {
        return {
            type: "OPEN_COURSE_SELECTOR",
            onSelect: onSelect
        }
    },
    closeCourseSelector: () => {
        return {
            type: "CLOSE_COURSE_SELECTOR"
        }
    },
    openCourseDetail: (detailCourseId) => {
        return {
            type: "OPEN_COURSE_DETAIL",
            detailCourseId: detailCourseId
        }
    },
    closeCourseDetail: () => {
        return {
            type: "CLOSE_COURSE_DETAIL"
        }
    },
    openGroupDetail: (courseInstanceId, groupId, group) => {
        return {
            type: "OPEN_GROUP_DETAIL",
            groupCourseInstanceId: courseInstanceId,
            groupId: groupId,
            group: group
        }
    },
    closeGroupDetail: () => {
        return {
            type: "CLOSE_GROUP_DETAIL"
        }
    },
    openAdmissionRequirementItem: (aItemId) => {
        return {
            type: "OPEN_ADMISSION_REQUIREMENT_ITEM",
            admissionRequirementId: aItemId
        }
    },
    closeAdmissionRequirementItem: () => {
        return {
            type: "CLOSE_ADMISSION_REQUIREMENT_ITEM",
        }
    },
    openCourseAdd: (onSelect) => {
        return {
            type: "OPEN_COURSE_ADD",
            onSelect: onSelect
        }
    },
    closeCourseAdd: () => {
        return {
            type: "CLOSE_COURSE_ADD"
        }
    }
}