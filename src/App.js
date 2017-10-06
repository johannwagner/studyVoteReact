import React, { Component } from 'react';
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
    closeGroupDetail: StateActions.closeGroupDetail
};




export default connect(mapStateToProps, mapDispatchToProps)(App);
