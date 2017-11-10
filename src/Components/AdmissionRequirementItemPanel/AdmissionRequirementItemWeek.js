import * as React from "react";
import {ProgressBar} from "react-bootstrap";
import './AdmissionRequirementItemWeek.css'

class AdmissionRequirementItemWeek extends React.Component {
    render() {
        const aItem = this.props.aItem;
        const progressBar = Math.ceil(aItem.result.tasksSolved * 100 / aItem.result.tasksAvailable);
        return (
            <div onClick={this.props.onClick} className="AdmissionRequirementItemWeek">
                <div className="semesterWeek">
                    Week {aItem.requirementWeek.semesterWeek}
                </div>
                <div className="weekAbsolute">
                    {aItem.result.tasksSolved} / {aItem.result.tasksAvailable} Tasks
                </div>
                <div className="weekProgress">
                    <ProgressBar
                        now={progressBar}
                        label={`${progressBar}%`}
                    />
                </div>
            </div>
        )
    }
}

export default AdmissionRequirementItemWeek;