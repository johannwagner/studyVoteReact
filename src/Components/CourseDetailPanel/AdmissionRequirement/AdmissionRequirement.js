import './AdmissionRequirement.css'
import {Component} from "react/cjs/react.production.min";
import * as React from "react";
//import * as moment from 'moment';

class AdmissionRequirement extends Component {



    render() {
        const typeTranslation = ['Vote', 'Event'];

        let aReq = this.props.admissionRequirementItem;
        //aReq.displayDate = moment(new Date(aReq.expireDate))
         //   .format("dddd, MMMM Do YYYY, hh:mm:ss a");
        aReq.displayDate = new Date(aReq.expireDate).toLocaleString();
        return (
            <div onClick={this.props.onClick} className="AdmissionRequirement">
                <div className="Description">
                    {aReq.description}
                </div>
                <div className="Type">
                    Type: {typeTranslation[aReq.admissionRequirementType]}
                </div>
                <div className="Mandatory">
                    Mandatory: {aReq.mandatory ? <i className={'fa fa-check'}/> : <i className={'fa fa-times'}/>}
                </div>
                <div className="ExpireDate">
                    {aReq.admissionRequirementType === 1 ? 'Maturity Date: ' + aReq.displayDate : null}
                </div>
            </div>
        );
    }

}

export default AdmissionRequirement;