import * as axios from 'axios';

export default {
    loginWithCredentials: (mailAddress, passwordHash) => {
        return {
            type: "LOGIN",
            payload: axios.post('http://localhost:1337/token', {
                userMail: mailAddress,
                userPasswordHash: passwordHash
            })
        }
    },

    setSemester(semesterId) {
        return {
            type: "SEMESTER_CHANGE",
            semesterId: semesterId
        }
    }
}