import * as React from "react";
import {Component} from "react";
import FormGroup from "react-bootstrap/es/FormGroup";
import Form from "react-bootstrap/es/Form";
import FormControl from "react-bootstrap/es/FormControl";
import 'react-datetime/css/react-datetime.css'
import * as Moment from 'moment';
import Button from "react-bootstrap/es/Button";
import connect from "react-redux/es/connect/connect";
import FetchDataActions from "../../Actions/FetchDataActions";
import './CourseAddPanel.css'


class CourseAddPanel extends Component {

    constructor() {
        super();

        this.startTime = new Moment();
        this.endTime = new Moment();
    }

    onFinish() {

        const shortNameText = this.shortNameRef.value;
        const displayNameText = this.displayNameRef.value;
        const roomText = this.roomRef.value;
        const docentText = this.docentRef.value;
        const weekDay = this.weekDayRef.value;

        const startTimeHours = Number(this.startTimeHoursRef.value);
        const startTimeMinutes = Number(this.startTimeMinutesRef.value);
        const endTimeHours = Number(this.endTimeHoursRef.value);
        const endTimeMinutes = Number(this.endTimeMinutesRef.value);

        this.props.putCourse(this.props.clientToken, this.props.semesterId, shortNameText, displayNameText, roomText, docentText, weekDay,
            {
                hours: startTimeHours,
                minutes: startTimeMinutes
            },
            {
                hours: endTimeHours,
                minutes: endTimeMinutes
            });
    }

    render() {
        return (
            <Form className={'GroupPanel'}>
                <FormGroup className={'shortName'}>
                    <FormControl
                        inputRef={ref => this.shortNameRef = ref}
                        type="text"
                        placeholder="shortName"
                    />
                </FormGroup>

                <FormGroup className={'displayName'}>
                    <FormControl
                        type="text"
                        placeholder="DisplayName"
                        inputRef={ref => this.displayNameRef = ref}
                    />
                </FormGroup>
                <FormGroup className={'room'}>
                    <FormControl
                        inputRef={ref => this.roomRef = ref}
                        type="text"
                        placeholder="Room"
                    />
                </FormGroup>

                <FormGroup className={'docent'}>
                    <FormControl
                        type="text"
                        placeholder="Docent"
                        inputRef={ref => this.docentRef = ref}
                    />
                </FormGroup>
                <FormGroup className={'weekDay'}>
                    <FormControl
                        componentClass="select"
                        placeholder="Week Day"
                        inputRef={ref => this.weekDayRef = ref}
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
                    />
                </FormGroup>
                <FormGroup className={'startTimeMinutes'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.startTimeMinutesRef = ref}
                        placeholder={'00'}
                    />
                </FormGroup>
                <span className={'until'}>until</span>
                <FormGroup className={'endTimeHours'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.endTimeHoursRef = ref}
                        placeholder={13}
                    />
                </FormGroup>
                <FormGroup className={'endTimeMinutes'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.endTimeMinutesRef = ref}
                        placeholder={'00'}
                    />
                </FormGroup>

                <Button className={'button'} onClick={this.onFinish.bind(this)}>
                    Create Course
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        fetchedData: state.fetchedData,
        clientToken: state.login.loginToken,
        semesterId: state.login.loginSemester.id
    }
};

const mapDispatchToProps = {
    putCourse: FetchDataActions.putCourse
};


export default connect(mapStateToProps, mapDispatchToProps)(CourseAddPanel);