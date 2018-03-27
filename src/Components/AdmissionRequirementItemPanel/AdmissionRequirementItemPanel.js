import * as React from "react";
import {connect} from "react-redux";
import FetchDataActions from "../../Actions/FetchDataActions";
import AdmissionRequirementItemWeek from "./AdmissionRequirementItemWeek";
import {Button, FormControl} from 'react-bootstrap';
import './AdmissionRequirementItemPanel.css'
import * as axios from 'axios';
import * as _ from 'lodash';
import AdmissionRequirementItemEvent from "./AdmissionRequirementItemEvent";
import Globals from "../../Constants/Globals";

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

    sendAdmissionRequirementItemEvent() {
        this.props.putAdmissionRequirementItemWeek(
            this.props.clientToken,
            this.props.admissionRequirementItemId,
            this.eventTasksDone, // TasksDone
            1, // TasksAvailable, always 1 having events
            1, // Always use semesterWeek 1
            () => {
                this.props.fetchUserProgressPerCourseInstance(this.props.clientToken, this.props.courseInstanceId)
            }
        );
    }

    componentDidMount() {
        this.props.fetchUserProgressPerCourseInstance(this.props.clientToken, this.props.courseInstanceId);
        axios.get(Globals.backendUrl +'/semester/' + this.props.semesterId + '/currentWeek', {headers: {'X-Token': this.props.clientToken}}).then((data) => {
            this.setState({
                semesterWeek: data.data.semesterWeek,
                lastSemesterWeek: data.data.semesterWeek
            })
        })
    }

    render() {

        if(!this.props.userProgressPerCourseInstance || !this.state.semesterWeek) {
            return null;
        }

        // Handle different admissionRequirementTypes
        switch(this.props.admissionRequirementItem.admissionRequirementType)
        {
            // Voting
            case 0:
                return this.renderSemesterWeeks();
            // Event
            case 1:
                return this.renderSemesterEvent();
            default:
                return this.renderSemesterWeeks();
        }
    }

    renderSemesterWeeks()
    {
        const semesterWeekItem = this.props.userProgressPerCourseInstance.progress && this.props.userProgressPerCourseInstance.progress.find(p => p.requirementWeek.semesterWeek === this.state.semesterWeek);

        const progress = this.props.userProgressPerCourseInstance.progress ? this.props.userProgressPerCourseInstance.progress : [];
        const  filledWeeks = progress.map((i) => i.requirementWeek.semesterWeek);

        const lastSemesterWeek = this.state.lastSemesterWeek;//_.max(filledWeeks) ? _.max(filledWeeks) : this.state.lastSemesterWeek;
        const neededWeeks = _.xor(_.range(1,lastSemesterWeek + 1), filledWeeks);

        const weekDisplayContainer = [
            ...progress.map((item) => {
                return {
                    semesterWeek: item.requirementWeek.semesterWeek,
                    isEmpty: false,
                    aItem: item
                }
            }),
            ...neededWeeks.map(week => {
                return {
                    semesterWeek: week,
                    isEmpty: true,
                    aItem: null
                }
            })
        ].sort((firstItem, secondItem) => firstItem.semesterWeek - secondItem.semesterWeek);

        return [
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
                    defaultValue={semesterWeekItem && semesterWeekItem.result.tasksAvailable}
                    disabled={!!semesterWeekItem}
                />
                <Button
                    onClick={this.sendAdmissionRequirementItemWeek.bind(this)}
                >
                    Change
                </Button>
            </div>,
            <div className="AdmissionRequirementItem">
                {weekDisplayContainer.map(displayItem => {
                    return (
                        <AdmissionRequirementItemWeek
                            onClick={() => {
                                this.setState({semesterWeek: displayItem.semesterWeek})
                            }}
                            key={displayItem.semesterWeek}
                            emptyWeek={displayItem.isEmpty}
                            weekNumber={displayItem.semesterWeek}
                            aItem={displayItem.aItem}
                        />
                    )
                })}
            </div>

        ]
    }

    renderSemesterEvent()
    {
        let progress = this.props.userProgressPerCourseInstance.progress;
        let buttonStyle = 'danger';
        let buttonText = 'Failed';

        // Handle cases if progress is already in DB or not
        if(!progress) {
            // Build up display objects
            progress = [
                {
                    aItem: {
                        ...this.props.admissionRequirementItem,
                        result:
                            {
                                tasksSolved: 0,
                                tasksAvailable: 1
                            }
                    }
                }
            ];
        }
        else
        {
            // Build up display objects
            progress[0].aItem = {
                ...this.props.admissionRequirementItem,
                result: progress[0].result
            }

        }

        // Passed/Failed difference
        if(progress[0].aItem.result.tasksSolved)
        {
            this.eventTasksDone = 0;
        }
        else
        {
            buttonStyle = 'success';
            buttonText = 'Passed';
            this.eventTasksDone = 1;
        }

        return [
            <div className="AdmissionRequirementItem">
                {progress.map(displayItem => {
                    return (
                        <AdmissionRequirementItemEvent
                            key={displayItem.aItem.id}
                            aItem={displayItem.aItem}
                        />
                    )
                })}
            </div>,
            <div className="NewItem">
                <h4>Mark this event as Passed/Failed</h4>
                <Button
                    onClick={this.sendAdmissionRequirementItemEvent.bind(this)}
                    bsStyle={buttonStyle}
                >
                    {buttonText}
                </Button>
            </div>]
        //return null;
        /*if(this.props.admissionRequirementItem.type === 1)
        {
            neededWeeks.pop();
            if(progress.length < 1)
                progress.push({
                    aItem: this.props.admissionRequirementItem,
                    taskCount: 0,
                    maxCount: 1,
                    semesterWeek: 1
                });
        }*/
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        fetchedData: state.fetchedData,
        clientToken: state.login.loginToken,
        semesterId: state.login.semesterId,
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