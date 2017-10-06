import {Component} from "react/cjs/react.production.min";
import {connect} from "react-redux";
import * as React from "react";
import FetchDataActions from "../../Actions/FetchDataActions";
import './CourseDetailPanel.css'
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import ListGroup from "react-bootstrap/es/ListGroup";
import AdmissionRequirement from "./AdmissionRequirement/AdmissionRequirement";
import CourseGroup from "./CourseGroup/CourseGroup";
import StateActions from "../../Actions/StateActions";


class CourseDetailPanel extends Component {


    componentWillMount() {
        this.props.fetchCourseInstanceDetail(this.props.loginToken, this.props.courseInstanceId)
    }

    addGroup() {
        this.props.openGroupDetail(null, null);
    }

    addAdmissionRequirement() {

    }

    render() {
        let cInst = this.props.courseInstanceDetail;

        if(!cInst) {
            return null;
        }

        return (
            <div className="CourseDetailPanel">
                <div className="CourseName">{cInst.course.displayName}</div>
                <div className="CourseSmallName">{cInst.course.shortName}</div>
                <div className="CourseAdmissionRequirements">
                    <ListGroup>
                        <b>Admission Requirements</b>
                        {cInst.admissionRequirement &&
                         cInst.admissionRequirement.admissionRequirementItems &&
                         cInst.admissionRequirement.admissionRequirementItems.map((aItem) => {
                            return (
                                <ListGroupItem>
                                    <AdmissionRequirement key={aItem.id} admissionRequirementItem={aItem}/>
                                </ListGroupItem>
                            )
                        })}

                        <ListGroupItem
                            className={"Selectable"}
                            onClick={this.addAdmissionRequirement.bind(this)}
                        >
                            Add Admission Requirement
                        </ListGroupItem>
                    </ListGroup>
                </div>
                <div className="CourseGroups">
                    <ListGroup>
                        <b>Groups</b>
                        {cInst.courseInstanceGroups &&
                         cInst.courseInstanceGroups.map((cG) => {
                            return (
                                <ListGroupItem>
                                    <CourseGroup
                                        key={cG.id}
                                        courseGroup={cG}/>
                                </ListGroupItem>
                            )
                        })}

                        <ListGroupItem
                            className={"Selectable"}
                            onClick={this.addGroup.bind(this)}
                        >
                            Add Group
                        </ListGroupItem>

                    </ListGroup>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginToken: state.login.loginToken,
        courseInstanceDetail: state.fetchedData.courseInstanceDetail
    }
};

const mapDispatchToProps = {
    fetchCourseInstanceDetail: FetchDataActions.fetchCourseInstanceDetail,
    openGroupDetail: StateActions.openGroupDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailPanel);