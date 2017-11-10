import * as axios from 'axios';

export default {
    fetchProgress: (clientToken, semesterId = 1) => {

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
            payload: axios.get('http://localhost:1337/userProgress', axiosConfig)
        }
    },
    fetchCourses: (clientToken, semesterId = 1) => {

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
            payload: axios.get('http://localhost:1337/courseInstance', axiosConfig)
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
            payload: axios.put('http://localhost:1337/userCourseInstance', data, axiosConfig)
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
            payload: axios.get('http://localhost:1337/courseInstance/' + courseInstanceId, axiosConfig)
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
            payload: axios.get('http://localhost:1337/userProgress/' + courseInstanceId, axiosConfig)
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
            payload: axios.put('http://localhost:1337/userProgress/', data, axiosConfig).then((r) => {
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
            payload: axios.put('http://localhost:1337/user', transferData)
        }
    }
}