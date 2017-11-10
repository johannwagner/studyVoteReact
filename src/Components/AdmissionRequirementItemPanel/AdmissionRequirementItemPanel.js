import * as React from "react";
import {connect} from "react-redux";
import FetchDataActions from "../../Actions/FetchDataActions";
import AdmissionRequirementItemWeek from "./AdmissionRequirementItemWeek";
import {Button, FormControl} from 'react-bootstrap';
import './AdmissionRequirementItemPanel.css'
import * as axios from 'axios';


class AdmissionRequirementItemPanel extends React.Component {

    constructor() {
        super();

        this.state = {
            semesterWeek: null
        }
    }

    sendAdmissionRequirementItemWeek() {
        this.props.putAdmissionRequirementItemWeek(
            this.props.clientToken,
            this.props.admissionRequirementItemId,
            Number(this.tasksDone.value),
            Number(this.tasksAvailable.value),
            this.state.semesterWeek,
            () => {
                this.props.fetchUserProgressPerCourseInstance(this.props.clientToken, this.props.courseInstanceId)
            }
        );
    }

    componentDidMount() {
        this.props.fetchUserProgressPerCourseInstance(this.props.clientToken, this.props.courseInstanceId);
        axios.get('http://localhost:1337/semester/' + this.props.semesterId + '/currentWeek', {headers: {'X-Token': this.props.clientToken}}).then((data) => {
            this.setState({
                semesterWeek: data.data.semesterWeek
            })
        })
    }

    render() {

        if(!this.props.userProgressPerCourseInstance || !this.state.semesterWeek) {
            return null;
        }


        const semesterWeekItem = this.props.userProgressPerCourseInstance.progress && this.props.userProgressPerCourseInstance.progress.find(p => p.requirementWeek.semesterWeek === this.state.semesterWeek);


        return [
            <div className="AdmissionRequirementItem">
                {this.props.userProgressPerCourseInstance.progress.map((item) => {
                    return (
                        <AdmissionRequirementItemWeek
                            key={JSON.stringify(item)}
                            onClick={() => {
                                debugger;
                                this.setState({semesterWeek: item.requirementWeek.semesterWeek})
                            }}
                            aItem={item}
                        />
                    )
                })}
            </div>,
            <div className="NewItem">
                <h4>New Entry for Week {this.state.semesterWeek}</h4>
                <FormControl
                    id="tasksDone"
                    type="number"
                    inputRef={ref => this.tasksDone = ref}
                    defaultValue={semesterWeekItem && semesterWeekItem.result.tasksSolved}
                    placeholder="Tasks Done"
                />
                <FormControl
                    id="tasksAvailable"
                    type="number"
                    placeholder="Tasks Available"
                    inputRef={ref => this.tasksAvailable = ref}
                    value={semesterWeekItem && semesterWeekItem.result.tasksAvailable}
                    disabled={!!semesterWeekItem}
                />
                <Button
                    onClick={this.sendAdmissionRequirementItemWeek.bind(this)}
                >
                    Boobs.
                </Button>
            </div>
        ]

    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        fetchedData: state.fetchedData,
        clientToken: state.login.loginToken,
        semesterId: state.login.loginSemester.id,
        courseInstanceId: state.fetchedData.courseInstanceDetail.id,
        userProgressPerCourseInstance: state.fetchedData.userProgressPerCourseInstance && state.fetchedData.userProgressPerCourseInstance.find((i) => i.id === state.state.openAdmissionRequirementItemId),
        admissionRequirementItem: state.fetchedData.courseInstanceDetail.admissionRequirement.admissionRequirementItems.find((i) => i.id === state.state.openAdmissionRequirementItemId),
        admissionRequirementItemId: state.state.openAdmissionRequirementItemId
    }
};

const mapDispatchToProps = {
    fetchUserProgressPerCourseInstance: FetchDataActions.fetchUserProgressPerCourseInstance,
    putAdmissionRequirementItemWeek: FetchDataActions.putAdmissionRequirementItemWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(AdmissionRequirementItemPanel);