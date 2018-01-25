import * as axios from 'axios';
import ActionHelper from "./ActionHelper";
import Globals from "../Constants/Globals";

export default {
    putGroup(clientToken, courseInstanceId, groupInformation) {
        const axiosConfig = ActionHelper.generateAxiosConfig(clientToken);


        return {
            type: "PUT_COURSE_INSTANCE_GROUP",
            payload: axios.put(Globals.backendUrl + `/courseInstance/${courseInstanceId}/group/`, groupInformation, axiosConfig)
        }
    },
    postGroup(clientToken, courseInstanceId, groupId, groupInformation) {
        const axiosConfig = ActionHelper.generateAxiosConfig(clientToken);

        return {
            type: "POST_COURSE_INSTANCE_GROUP",
            payload: axios.post(Globals.backendUrl + `/courseInstance/${courseInstanceId}/group/${groupId}`, groupInformation, axiosConfig)
        }
    }
}