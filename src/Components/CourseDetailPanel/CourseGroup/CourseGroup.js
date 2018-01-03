import './CourseGroup.css'
import * as React from "react";
import * as moment from 'moment';
import {Component} from "react/cjs/react.production.min";


class CourseGroup extends Component {

    getDayFromInteger(number){
        switch (number) {
            case 0:
                return 'Monday';
            case 1:
                return 'Tuesday';
            case 2:
                return 'Wednesday';
            case 3:
                return 'Thursday';
            case 4:
                return 'Friday';
            case 5:
                return 'Saturday';
            case 6:
                return 'Sunday';
            default:
                return 'Unknown Weekday'
        }
    }

    render() {
        let cG = this.props.courseGroup;

        const momentStartDate = moment(cG.startTime);
        const momentEndDate = moment(cG.endTime);

        cG.day = this.getDayFromInteger(cG.weekDay);
        cG.displayStartTime = momentStartDate.format('HH:mm');
        cG.displayEndTime = momentEndDate.format('HH:mm');

        return (
            <div className="CourseGroup">
                <div className="editButton" onClick={this.props.onEdit}>
                    <i className={'fa fa-edit'}/>
                </div>
                <div className="groupDocent">
                    {cG.docent}
                </div>
                <div className="groupTimes">
                    {cG.day} - {cG.displayStartTime} - {cG.displayEndTime}
                </div>
                <div className="groupRoom">
                    {cG.room}
                </div>
            </div>
        )

    }
}

export default CourseGroup;