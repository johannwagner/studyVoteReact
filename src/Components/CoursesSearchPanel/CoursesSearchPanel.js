import connect from "react-redux/es/connect/connect";
import {Component} from "react/cjs/react.production.min";
import FetchDataActions from "../../Actions/FetchDataActions";
import * as React from "react";
import CourseItem from "./CourseItem";

class CoursesSearchPanel extends Component {

    componentDidMount() {
        this.props.fetchCourses(this.props.loginToken, this.props.semesterId);

    }

    putUserCourseInstance(courseInstanceId) {
        this.props.putUserCourseInstance(this.props.loginToken, courseInstanceId)
    }

    render(){

        const courses = this.props.courses;

        return (
            <div className="CoursesSearchPanel">
                {courses.map((cItem) => <CourseItem key={cItem.id} courseItem={cItem} onClick={() => this.putUserCourseInstance(cItem.id)}/>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.fetchedData.courseItems,
        loginToken: state.login.loginToken,
        semesterId: state.login.loginSemester.id
    }

};

const mapDispatchToProps = {
    fetchCourses: FetchDataActions.fetchCourses,
    putUserCourseInstance: FetchDataActions.putUserCourseInstance
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesSearchPanel)