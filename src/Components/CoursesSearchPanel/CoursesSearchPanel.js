import connect from "react-redux/es/connect/connect";
import {Component} from "react/cjs/react.production.min";
import FetchDataActions from "../../Actions/FetchDataActions";
import * as React from "react";
import CourseItem from "./CourseItem";
import FormControl from "react-bootstrap/es/FormControl";
import InputGroup from "react-bootstrap/es/InputGroup";
import FormGroup from "react-bootstrap/es/FormGroup";
import StateActions from "../../Actions/StateActions";
import "./CoursesSearchPanel.css"

class CoursesSearchPanel extends Component {

    constructor() {
        super();

        this.state = {
            searchString: ''
        }
    }

    onKeyUp() {
        this.setState({searchString: this.searchTextContainer.value})
    }

    componentDidMount() {
        this.props.fetchCourses(this.props.loginToken, this.props.semesterId);

    }

    addCourse() {
        this.props.openCourseAdd((addedCourse) => {

        })
    }

    putUserCourseInstance(courseInstanceId) {
        this.props.putUserCourseInstance(this.props.loginToken, courseInstanceId)
    }

    render(){

        return (
            <div className="CoursesSearchPanel">
                {(this.props.showCoursesSearchPanelSearch ?
                    <div className="CoursesSearchPanelSearch">
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <i className={'fa fa-search'}/>
                                </InputGroup.Addon>
                                <FormControl onKeyUp={() => this.onKeyUp()} inputRef={ref => this.searchTextContainer = ref} type="text"/>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    : null)}

                {this.props.courses.filter((cItem) => {

                    if(!this.state.searchString.length && !this.props.showCoursesSearchPanelSearch) {
                        return true;
                    }

                    return cItem.course.shortName.toLowerCase().includes(this.state.searchString.toLowerCase())
                        || cItem.course.displayName.toLowerCase().includes(this.state.searchString.toLowerCase())
                }).map((cItem) => {
                    return <CourseItem key={cItem.id} courseItem={cItem} onClick={() => this.putUserCourseInstance(cItem.id)} />
                })}

                <div onClick={this.addCourse.bind(this)} className="CourseSearchPanelAdd">
                    <span>Did you find your course ? If not, create it.</span>
                </div>

            </div>
        );


    }
}

const mapStateToProps = state => {
    return {
        courses: state.fetchedData.courseItems,
        loginToken: state.login.loginToken,
        semesterId: state.login.semesterId
    }

};

const mapDispatchToProps = {
    fetchCourses: FetchDataActions.fetchCourses,
    putUserCourseInstance: FetchDataActions.putUserCourseInstance,
    openCourseAdd: StateActions.openCourseAdd
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesSearchPanel)