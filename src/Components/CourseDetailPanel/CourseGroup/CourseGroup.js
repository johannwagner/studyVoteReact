import './CourseGroup.css'
import * as React from "react";
import * as moment from 'moment';
import {Component} from "react/cjs/react.production.min";


class CourseGroup extends Component {


    render() {
        let cG = this.props.courseGroup;

        const momentStartDate = moment(cG.startTime);
        const momentEndDate = moment(cG.endTime);

        cG.day = momentStartDate.format('dddd');
        cG.displayStartTime = momentStartDate.format('hh:mm a');
        cG.displayEndTime = momentEndDate.format('hh:mm a');

        return (
            <div className="CourseGroup">
                <div className="groupDocent">
                    Gunther Saake
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