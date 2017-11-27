import React, {Component} from 'react';
import './App.css';
import {connect} from "react-redux";
import HorizontalStackPanel from "./Components/HorizontalStackPanel/HorizontalStackPanel";
import LoginConstants from "./Constants/LoginConstants";
import LoginPanel from "./Components/LoginPanel/LoginPanel";
import DummyPanel from "./Components/DummyPanel/DummyPanel";
import ProgressPanel from "./Components/ProgressPanel/ProgressPanel";
import CoursesSearchPanel from "./Components/CoursesSearchPanel/CoursesSearchPanel";
import StateActions from "./Actions/StateActions";
import CourseDetailPanel from "./Components/CourseDetailPanel/CourseDetailPanel";
import GroupPanel from "./Components/GroupPanel/GroupPanel";
import CourseAddPanel from "./Components/CourseAddPanel/CourseAddPanel";
import AdmissionRequirementItemPanel from "./Components/AdmissionRequirementItemPanel/AdmissionRequirementItemPanel";
import AdmissionRequirementItemAddPanel from "./Components/AdmissionRequirementItemAddPanel/AdmissionRequirementItemAddPanel";

class App extends Component {
    constructor() {
        super();

        this.state = {
            dummyShown: true,
            showProgressPanelSearch: false
        }
    }

  render() {
    return (
      <div className="App">
          <HorizontalStackPanel>
              <LoginPanel
                  showCondition={this.props.loginState.loginStatus !== LoginConstants.LOGIN_FULFILLED}
                  stackTitle={"Login"}
              />
              <DummyPanel
                  showCondition={this.props.loginState.loginStatus === LoginConstants.LOGIN_FULFILLED}
                  stackTitle={"Welcome"}

              />
              <ProgressPanel
                  showCondition={this.props.loginState.loginStatus === LoginConstants.LOGIN_FULFILLED}
                  stackTitle={"Current Progress"}
                  forwardIcon={'fa-search'}
                  showProgressPanelSearch={this.state.showProgressPanelSearch}
                  forwardAction={() => this.setState({showProgressPanelSearch: !this.state.showProgressPanelSearch})}
              />
              <CourseDetailPanel
                  stackTitle={"Course"}
                  hasBack={true}
                  courseInstanceId={this.props.state.openCourseDetailId}
                  backAction={() => {
                      this.props.closeCourseDetail();
                  }}
                  showCondition={this.props.state.openCourseDetail}
              />
              <CoursesSearchPanel
                  stackTitle={"All Courses"}
                  hasBack={true}
                  backAction={() => {
                      this.props.closeCourseSelector();
                  }}
                  showCondition={this.props.state.openCourseSelector}
                  onSelect={this.props.state.openCourseSelectorFunction}
                  forwardIcon={'fa-search'}
                  showCoursesSearchPanelSearch={this.state.showCoursesSearchPanelSearch}
                  forwardAction={() => this.setState({showCoursesSearchPanelSearch: !this.state.showCoursesSearchPanelSearch})}
              />
              <CourseAddPanel
                  stackTitle={"Add Course"}
                  hasBack={true}
                  backAction={() => {
                      this.props.closeCourseAdd();
                  }}
                  showCondition={this.props.state.openCourseAdd}
              />
              <GroupPanel
                  showCondition={this.props.state.openGroupDetail}
                  groupId={this.props.state.openGroupDetailId}
                  group={this.props.state.openGroupDetailGroup}
                  stackTitle={'Groups'}
                  hasBack={true}
                  backAction={() => {
                      this.props.closeGroupDetail();
                  }}
              />
              <AdmissionRequirementItemPanel
                  showCondition={this.props.state.openAdmissionRequirementItem}
                  stackTitle={'Admission Requirement'}
                  hasBack={true}
                  backAction={() => {
                      this.props.closeAdmissionRequirementItem();
                  }}
              />
              <AdmissionRequirementItemAddPanel
                  showCondition={this.props.state.openAdmissionRequirementAdd}
                  stackTitle={' Add Admissionrequirement'}
                  hasBack={true}
                  backAction={() => {
                      this.props.closeAddAdmissionRequirementItem();
                  }}
              />

          </HorizontalStackPanel>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        loginState: state.login,
        state: state.state
    }
};

const mapDispatchToProps = {
    closeCourseSelector: StateActions.closeCourseSelector,
    closeCourseDetail: StateActions.closeCourseDetail,
    closeGroupDetail: StateActions.closeGroupDetail,
    closeAdmissionRequirementItem: StateActions.closeAdmissionRequirementItem,
    closeCourseAdd: StateActions.closeCourseAdd,
    closeAddAdmissionRequirementItem: StateActions.closeAddAdmissionRequirementItem
};




export default connect(mapStateToProps, mapDispatchToProps)(App);
