import './ProgressPanel.css'
import {connect} from "react-redux";
import {Component} from "react/cjs/react.production.min";
import * as React from "react";
import ProgressItem from "./ProgressItem";
import FormControl from "react-bootstrap/es/FormControl";
import InputGroup from "react-bootstrap/es/InputGroup";
import FormGroup from "react-bootstrap/es/FormGroup";
import ProgressPanelActions from "../../Actions/FetchDataActions";
import StateActions from "../../Actions/StateActions";
import LoginActions from "../../Actions/LoginActions";


class ProgressPanel extends Component {

    constructor() {
        super();

        this.state = {
            searchString: ''
        }
    }

    openSearchForCourses() {
        this.props.openCourseSelector((selectedCourse) => {

        })
    }

    onKeyUp() {
        this.setState({searchString: this.searchTextContainer.value})
    }

    componentDidMount(){
        this.updateResources();
    }

    updateResources(semesterId = this.props.login.semesterId) {
            this.props.fetchProgress(this.props.login.loginToken, semesterId);
            this.props.fetchSemester(this.props.login.loginToken);
    }

    onSemesterChange() {
        const semesterId = this.semesterSelector.value;
        console.log(semesterId);

        LoginActions.setSemester(semesterId);

        this.updateResources(semesterId);
    }

    render() {
        return (
            <div className="ProgressPanel">

                <div className="SemesterSelection">
                    <FormControl inputRef={ref => this.semesterSelector = ref} onChange={this.onSemesterChange.bind(this)} componentClass="select" placeholder="Semester">
                        {this.props.fetchedData.semesterList && this.props.fetchedData.semesterList.map((semesterItem) => {
                            return <option value={semesterItem.id}>{semesterItem.displayName}</option>
                        })}
                    </FormControl>
                </div>

                {(this.props.showProgressPanelSearch ?
                    <div className="ProgressPanelSearch">
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

                {this.props.fetchedData.progressItems.filter((pItem) => {

                    if(!this.state.searchString.length && !this.props.showProgressPanelSearch) {
                        return true;
                    }

                    return pItem.courseInstance.shortName.toLowerCase().includes(this.state.searchString.toLowerCase())
                        || pItem.courseInstance.displayName.toLowerCase().includes(this.state.searchString.toLowerCase())
                }).map((pItem) => {
                    return <ProgressItem
                        key={pItem.courseInstance.id}
                        progressItem={pItem}
                        onClick={() => this.props.openCourseDetail(pItem.courseInstance.id)}
                    />
                })}

                <div onClick={this.openSearchForCourses.bind(this)} className="ProgressPanelAdd">
                    <span>Are you part of a course ? Add it to your Dashboard.</span>
                </div>

            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        fetchedData: state.fetchedData,
        login: state.login,
    }
};

const mapDispatchToProps = {
    fetchProgress: ProgressPanelActions.fetchProgress,
    fetchSemester: ProgressPanelActions.fetchSemester,
    openCourseSelector: StateActions.openCourseSelector,
    openCourseDetail: StateActions.openCourseDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressPanel);
