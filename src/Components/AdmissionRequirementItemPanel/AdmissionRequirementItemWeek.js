import * as React from "react";
import {ProgressBar} from "react-bootstrap";
import './AdmissionRequirementItemWeek.css'

class AdmissionRequirementItemWeek extends React.Component {
    renderWeekContext(aItem) {
        const progressBar = Math.ceil(aItem.result.tasksSolved * 100 / aItem.result.tasksAvailable);

        return [
            <div className="weekAbsolute">
                {aItem.result.tasksSolved} / {aItem.result.tasksAvailable} Tasks
            </div>,
            <div className="weekProgress">
                    <ProgressBar
                now={progressBar}
                label={`${progressBar}%`}
                />
            </div>
        ]
    }

    renderEmptyWeek() {
        return (
            <div className="weekProgress">
                Empty Week
            </div>
        )

    }
    render() {
        const aItem = this.props.aItem;
        return (
            <div onClick={this.props.onClick} className="AdmissionRequirementItemWeek">
                <div className="semesterWeek">
                    Week {this.props.emptyWeek ? this.props.weekNumber : aItem.requirementWeek.semesterWeek}
                </div>
                {this.props.emptyWeek ? this.renderEmptyWeek() : this.renderWeekContext(aItem)}
            </div>
        )
    }
}

export default AdmissionRequirementItemWeek;