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
        this.props.fetchProgress(this.props.login.loginToken, this.props.login.loginSemester.id);
    }

    render() {
        return <div className="ProgressPanel">
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
    openCourseSelector: StateActions.openCourseSelector,
    openCourseDetail: StateActions.openCourseDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressPanel);
