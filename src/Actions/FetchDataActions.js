import * as axios from 'axios';
import ActionHelper from "./ActionHelper";
import Globals from "../Constants/Globals";
//import * as Globals from "../Constants/Globals"

export default {
    fetchProgress: (clientToken, semesterId) => {

        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            },
            params: {
                semesterId: semesterId
            }
        };

        return {
            type: "FETCH_PROGRESS",
            payload: axios.get(Globals.backendUrl + '/userProgress', axiosConfig)
        }
    },
    fetchCourses: (clientToken, semesterId) => {

        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            },
            params: {
                semesterId: semesterId
            }
        };

        return {
            type: "FETCH_COURSES",
            payload: axios.get(Globals.backendUrl + '/courseInstance', axiosConfig)
        }
    },
    putUserCourseInstance: (clientToken, courseInstanceId) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        let data = {
            courseInstanceId: courseInstanceId
        };

        return {
            type: "PUT_USER_COURSE_INSTANCE",
            payload: axios.put(Globals.backendUrl + '/userCourseInstance', data, axiosConfig)
        }
    },
    fetchCourseInstanceDetail: (clientToken, courseInstanceId) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        return {
            type: "GET_COURSE_INSTANCE_DETAIL",
            payload: axios.get(Globals.backendUrl + '/courseInstance/' + courseInstanceId, axiosConfig)
        }
    },
    fetchUserProgressPerCourseInstance: (clientToken, courseInstanceId) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        return {
            type: "GET_USER_PROGRESS_PER_COURSE_INSTANCE",
            payload: axios.get(Globals.backendUrl + '/userProgress/' + courseInstanceId, axiosConfig)
        }
    },
    putAdmissionRequirementItemWeek: (clientToken, admissionRequirementItemId, taskCount, maxCount, semesterWeek, callback) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        const data = {
            admissionRequirementItemId,
            taskCount,
            maxCount,
            semesterWeek
        };

        return {
            type: "PUT_ADMISSION_REQUIREMENT_ITEM_WEEK",
            payload: axios.put(Globals.backendUrl + '/userProgress/', data, axiosConfig).then((r) => {
                if(callback) callback();
                return r;
            })
        }
    },
    putUserAccount: (displayName, userMail, userPassword) => {
        const transferData = {
            displayName,
            userMail,
            userPasswordHash: userPassword
        };

        return {
            type: "PUT_USER_ACCOUNT",
            payload: axios.put(Globals.backendUrl + '/user', transferData)
        }
    },
    putCourse: (clientToken, semesterId, shortName, displayName, docent, room, weekDay, startTime, endTime) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        const transferData = {
            shortName: shortName,
            displayName: displayName,
            docent: docent,
            semesterId: semesterId,
            room: room,
            weekDay: weekDay,
            startTime: startTime,
            endTime: endTime
        };

        return {
            type: "PUT_COURSE",
            payload: axios.put(Globals.backendUrl + '/courseInstance', transferData, axiosConfig)
        }
    },

    putAdmissionRequirementItem: (clientToken, courseInstanceId, type, expireDate, minTasks, maxTasks, minPercentage, mandatory, description) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        /*
        * @param {number} courseInstanceId mandatory
        * @param {number} admissionRequirementType admissionRequirementType
        * @param {date} expireDate? the date this admissionRequirementItem expires
        * @param {number} maxTasks? maxTasks for this admissionRequirementItem
        * @param {number} minTasks? minTasks for this admissionRequirementItem to achieve
        * @param {float} minPercentage? minPercentage for this admissionRequirementItem to achieve
        * @param {bool} mandatory? use this admissionRequirementItem to calculate the userprogress
        * @param {string} description the description of the arItem
        */
        const transferData = {
            admissionRequirementType: type,
            courseInstanceId: courseInstanceId,
            expireDate: expireDate,
            minTasks: minTasks,
            maxTasks: maxTasks,
            minPercentage: minPercentage,
            mandatory: mandatory,
            description: description
        };

        return {
            type: "PUT_ADMISSIONREQUIREMENTITEM",
            payload: axios.put(Globals.backendUrl + '/admissionRequirement/item', transferData, axiosConfig)
        }
    },
    postAdmissionRequirementItem: (clientToken, courseInstanceId, type, expireDate, minTasks, maxTasks, minPercentage, mandatory, description, aItemId) => {
        let axiosConfig = {
            headers: {
                'X-Token': clientToken
            }
        };

        /*
        * @param {number} courseInstanceId mandatory
        * @param {number} admissionRequirementType admissionRequirementType
        * @param {date} expireDate? the date this admissionRequirementItem expires
        * @param {number} maxTasks? maxTasks for this admissionRequirementItem
        * @param {number} minTasks? minTasks for this admissionRequirementItem to achieve
        * @param {float} minPercentage? minPercentage for this admissionRequirementItem to achieve
        * @param {bool} mandatory? use this admissionRequirementItem to calculate the userprogress
        * @param {string} description the description of the arItem
        */
        const transferData = {
            admissionRequirementType: type,
            courseInstanceId: courseInstanceId,
            expireDate: expireDate,
            minTasks: minTasks,
            maxTasks: maxTasks,
            minPercentage: minPercentage,
            mandatory: mandatory,
            description: description
        };

        return {
            type: "POST_ADMISSIONREQUIREMENTITEM",
            payload: axios.post(Globals.backendUrl + '/admissionRequirement/item/' + aItemId, transferData, axiosConfig)
        }
    },
    fetchSemester: (clientToken) => {
        const axiosConfig = ActionHelper.generateAxiosConfig(clientToken);

        return {
            type: "GET_SEMESTER",
            payload: axios.get(Globals.backendUrl + '/semester', axiosConfig)
        }
    }
}