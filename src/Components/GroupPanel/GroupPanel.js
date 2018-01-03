import * as React from "react";
import {Component} from "react";
import FormGroup from "react-bootstrap/es/FormGroup";
import Form from "react-bootstrap/es/Form";
import FormControl from "react-bootstrap/es/FormControl";
import 'react-datetime/css/react-datetime.css'
import * as Moment from 'moment';
import Button from "react-bootstrap/es/Button";
import connect from "react-redux/es/connect/connect";
import './GroupPanel.css'
import GroupActions from "../../Actions/GroupActions";
import FetchDataActions from "../../Actions/FetchDataActions";


class GroupPanel extends Component {

    constructor() {
        super();

        this.startTime = new Moment();
        this.endTime = new Moment();
    }

    onFinish() {

        const roomText = this.roomRef.value;
        const docentText = this.docentRef.value;
        const weekDay = this.weekDayRef.value;

        const startTimeHours = Number(this.startTimeHoursRef.value);
        const startTimeMinutes = Number(this.startTimeMinutesRef.value);
        const endTimeHours = Number(this.endTimeHoursRef.value);
        const endTimeMinutes = Number(this.endTimeMinutesRef.value);


        /**
         * If I insert a group through the props, I want to edit the group.
         * If I save the group, I don't want to create a new group on the server,
         * I just wanna update the current group without removing references, etc.
         */

        const transmitData = {
            room: roomText,
            docent: docentText,
            weekDay: weekDay,
            endTime: {
                hours: endTimeHours,
                minutes: endTimeMinutes
            },
            startTime: {
                hours: startTimeHours,
                minutes: startTimeMinutes
            }
        };

        if(this.props.group) {
            // Reload CourseInstance after editing to get updated groups
            this.props.postGroup(this.props.clientToken, this.props.courseInstanceId,this.props.group.id, transmitData).then(() =>
                    this.props.fetchCourseInstanceDetail(this.props.clientToken, this.props.courseInstanceId)
            )
        } else {
            this.props.putGroup(this.props.clientToken, this.props.courseInstanceId, transmitData);
        }

        this.props.backAction();
    }

    render() {

        let startTimeHours, endTimeHours, startTimeMinutes, endTimeMinutes;

        if(this.props.group) {

            const startTime = new Date(this.props.group.startTime);
            const endTime = new Date(this.props.group.endTime);

            startTimeHours = startTime.getHours();
            startTimeMinutes = startTime.getMinutes();
            endTimeHours = endTime.getHours();
            endTimeMinutes = endTime.getMinutes();


        }

        return (
            <Form className={'GroupPanel'}>

                <h2 className={'header'}> {this.props.group ? 'Edit Group' : 'Add Group'} </h2>
                <FormGroup className={'room'}>
                    <FormControl
                        inputRef={ref => this.roomRef = ref}
                        type="text"
                        placeholder="Room"
                        defaultValue={this.props.group && this.props.group.room}
                    />
                </FormGroup>

                <FormGroup className={'docent'}>
                    <FormControl
                        type="text"
                        placeholder="Docent"
                        inputRef={ref => this.docentRef = ref}
                        defaultValue={this.props.group && this.props.group.docent}

                    />
                </FormGroup>
                <FormGroup className={'weekDay'}>
                    <FormControl
                        componentClass="select"
                        placeholder="Week Day"
                        inputRef={ref => this.weekDayRef = ref}
                        defaultValue={this.props.group && this.props.group.weekDay}
                    >
                        <option value={0}>Monday</option>
                        <option value={1}>Tuesday</option>
                        <option value={2}>Wendesday</option>
                        <option value={3}>Thursday</option>
                        <option value={4}>Friday</option>
                        <option value={5}>Saturday</option>
                    </FormControl>
                </FormGroup>

                <FormGroup className={'startTimeHours'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.startTimeHoursRef = ref}
                        placeholder={11}
                        defaultValue={startTimeHours}
                    />
                </FormGroup>
                <FormGroup className={'startTimeMinutes'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.startTimeMinutesRef = ref}
                        placeholder={'00'}
                        defaultValue={startTimeMinutes}
                    />
                </FormGroup>
                <span className={'until'}>until</span>
                <FormGroup className={'endTimeHours'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.endTimeHoursRef = ref}
                        placeholder={13}
                        defaultValue={endTimeHours}
                    />
                </FormGroup>
                <FormGroup className={'endTimeMinutes'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.endTimeMinutesRef = ref}
                        placeholder={'00'}
                        defaultValue={endTimeMinutes}
                    />
                </FormGroup>

                <Button className={'button'} onClick={this.onFinish.bind(this)}>
                    {this.props.group ?  'Modify Group' : 'Create Group'}
                </Button>
            </Form>
        );
    }
}


const mapDispatchToProps = {
    putGroup: GroupActions.putGroup,
    postGroup: GroupActions.postGroup,
    fetchCourseInstanceDetail: FetchDataActions.fetchCourseInstanceDetail
};

const mapStateToProps = state => {

  return {
      courseInstanceId: state.state.openGroupDetailCourseInstanceId,
      clientToken: state.login.loginToken
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(GroupPanel);