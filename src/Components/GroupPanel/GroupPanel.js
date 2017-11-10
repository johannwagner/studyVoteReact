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

        if(this.props.group) {
            throw Error('Not implemented');
        }



    }

    render() {
        return (
            <Form className={'GroupPanel'}>
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
                    Create Group
                </Button>
            </Form>
        );
    }
}




export default connect(null, null)(GroupPanel);