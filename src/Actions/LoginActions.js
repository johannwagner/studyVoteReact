import * as axios from 'axios';
import Globals from "../Constants/Globals";

export default {
    loginWithCredentials: (mailAddress, passwordHash) => {
        return {
            type: "LOGIN",
            payload: axios.post(Globals.backendUrl + '/token', {
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