import * as React from "react";
import {ProgressBar} from "react-bootstrap";
import './AdmissionRequirementItemEvent.css'

class AdmissionRequirementItemEvent extends React.Component {
    renderEvent(aItem) {
        const progressBar = Math.ceil(aItem.result.tasksSolved * 100 / aItem.result.tasksAvailable);
        const expireDate = new Date(aItem.expireDate);
        return [
            <div className="description">
                {aItem.description}
            </div>,
            <div className="eventDate">
                Expiredate: {expireDate.toLocaleString()}
            </div>,
            <div className="progress">
                    <ProgressBar
                now={progressBar}
                label={`${progressBar}%`}
                />
            </div>
        ]
    }

    render() {
        const aItem = this.props.aItem;
        return (
            <div onClick={this.props.onClick} className="AdmissionRequirementItemEvent">
                {this.renderEvent(aItem)}
            </div>
        )
    }
}

export default AdmissionRequirementItemEvent;