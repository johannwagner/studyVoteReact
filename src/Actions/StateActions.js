
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
    openGroupDetail: (groupId, group) => {
        return {
            type: "OPEN_GROUP_DETAIL",
            groupId: groupId,
            group: group
        }
    },
    closeGroupDetail: () => {
        return {
            type: "CLOSE_GROUP_DETAIL"
        }
    }
}