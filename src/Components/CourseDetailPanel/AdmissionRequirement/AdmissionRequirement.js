import './AdmissionRequirement.css'
import {Component} from "react/cjs/react.production.min";
import * as React from "react";
import * as moment from 'moment';

class AdmissionRequirement extends Component {



    render() {
        const typeTranslation = ['Vote', 'Event'];

        let aReq = this.props.admissionRequirementItem;
        aReq.displayDate = moment(new Date(aReq.expireDate))
            .format("dddd, MMMM Do YYYY, hh:mm:ss a");

        return (
            <div className="AdmissionRequirement">
                <div className="Type">
                    Admission Requirement Type: {typeTranslation[aReq.admissionRequirementType]}
                </div>
                <div className="Mandatory">
                    Mandatory: {aReq.mandatory ? <i className={'fa fa-check'}/> : <i className={'fa fa-times'}/>}
                </div>
                <div className="Description">

                </div>
                <div className="ExpireDate">
                    Maturity Date: {aReq.displayDate}
                </div>
            </div>
        );
    }

}

export default AdmissionRequirement;