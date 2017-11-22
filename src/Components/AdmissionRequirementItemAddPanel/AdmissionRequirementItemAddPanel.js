import * as React from "react";
import {Component} from "react";
import FormGroup from "react-bootstrap/es/FormGroup";
import Form from "react-bootstrap/es/Form";
import FormControl from "react-bootstrap/es/FormControl";
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import 'react-datetime/css/react-datetime.css'
import * as Moment from 'moment';
import Button from "react-bootstrap/es/Button";
import connect from "react-redux/es/connect/connect";
import FetchDataActions from "../../Actions/FetchDataActions";
import './AdmissionRequirementItemAddPanel.css'
import * as DateTime from "react-datetime"

class AdmissionRequirementItemAddPanel extends Component {

    constructor() {
        super();

        this.expireDate = new Moment();
    }

    onFinish() {

        // expireDate already filled
        const admissionRequirementText = this.admissionRequirementTypeRef.value;
        const descriptionText = this.descriptionRef.value;
        const mandatoryText = this.mandatoryRef._values.value;
        const minTasksText = this.minTasksRef.value === "" ? null : this.minTasksRef.value;
        const maxTasksText = this.maxTasksRef.value === "" ? null : this.maxTasksRef.value;
        const minPercentageText = this.percentageRef.value === "" ? null : this.percentageRef.value;

        debugger;
        this.props.putAdmissionRequirementItem(
            this.props.clientToken,
            this.props.courseInstanceDetail.id,
            admissionRequirementText,
            this.expireDate,
            minTasksText,
            maxTasksText,
            minPercentageText,
            mandatoryText,
            descriptionText
        );
    }

    handleExpireDateChange(newDate) {
        this.expireDate = newDate;
    };

    render() {
        return (
            <Form className={'AdmissionRequirementItemAddPanel'}>
                <FormGroup className={'admissionRequirementType'}>
                    <FormControl
                        componentClass="select"
                        placeholder="Vote"
                        inputRef={ref => this.admissionRequirementTypeRef = ref}
                    >
                        <option value={0}>Vote</option>
                        <option value={1}>Event</option>
                    </FormControl>
                </FormGroup>

                <FormGroup className={'description'}>
                    <FormControl
                        type="text"
                        placeholder="Description"
                        inputRef={ref => this.descriptionRef = ref}
                    />
                </FormGroup>
                <DateTime
                    onChange={this.handleExpireDateChange.bind(this)}
                    className="expireDate"
                    defaultValue={new Moment()}
                    dateFormat="DD.MM.YYYY"
                    timeFormat=""
                />

                <ButtonToolbar className={'mandatory'}>
                    <ToggleButtonGroup  name="mandatory" type="radio" defaultValue={'optional'} ref={value => this.mandatoryRef = value}>
                        <ToggleButton value={0}>Mandatory</ToggleButton>
                        <ToggleButton value={1}>Optional</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>
                <FormGroup className={'minTasks'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.minTasksRef = ref}
                        placeholder={'minTasks'}
                    />
                </FormGroup>
                <span className={'of'}>of</span>
                <FormGroup className={'maxTasks'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.maxTasksRef = ref}
                        placeholder={'maxTasks'}
                    />
                </FormGroup>
                <FormGroup className={'percentage'}>
                    <FormControl
                        type="number"
                        inputRef={ref => this.percentageRef = ref}
                        placeholder={'percentage'}
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
        semesterId: state.login.loginSemester.id,
        courseInstanceDetail: state.fetchedData.courseInstanceDetail
    }
};

const mapDispatchToProps = {
    putAdmissionRequirementItem: FetchDataActions.putAdmissionRequirementItem
};


export default connect(mapStateToProps, mapDispatchToProps)(AdmissionRequirementItemAddPanel);