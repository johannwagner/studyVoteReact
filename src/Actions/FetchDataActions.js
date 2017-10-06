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
    }
}