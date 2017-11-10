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
        this.props.openGroupDetail(this.props.courseInstanceDetail.id, null, null);
    }

    addAdmissionRequirement() {

    }

    openAdmissionRequirementItem(admissionRequirementItem) {
        this.props.openAdmissionRequirementItem(admissionRequirementItem.id);
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
                                <ListGroupItem  className={'Selectable'}>
                                    <AdmissionRequirement
                                        onClick={() => {
                                            this.openAdmissionRequirementItem(aItem)
                                        }}
                                        key={aItem.id}
                                        admissionRequirementItem={aItem}/>
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
                                        onEdit={() => {
                                            this.props.openGroupDetail(this.props.courseInstanceDetail.id, cG.groupId, cG)
                                        }}
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
        courseInstanceDetail: state.fetchedData.courseInstanceDetail,
    }
};

const mapDispatchToProps = {
    fetchCourseInstanceDetail: FetchDataActions.fetchCourseInstanceDetail,
    openGroupDetail: StateActions.openGroupDetail,
    openAdmissionRequirementItem: StateActions.openAdmissionRequirementItem
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailPanel);