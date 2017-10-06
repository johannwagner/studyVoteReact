import './CourseItem.css'
import {Component} from "react/cjs/react.production.min";
import * as React from "react";

class CourseItem extends Component {
    render() {

        const cItem = this.props.courseItem;

        return (
            <div className="CourseItem" onClick={this.props.onClick}>
                <div className="CourseItemMain">
                    {cItem.course.displayName}
                </div>
                <div className="CourseItemShort">
                    {cItem.course.shortName}
                </div>

            </div>
        );
    }
}

export default CourseItem;