import {Component} from "react";
import * as React from "react";
import FormGroup from "react-bootstrap/es/FormGroup";
import Form from "react-bootstrap/es/Form";
import FormControl from "react-bootstrap/es/FormControl";
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import * as Moment from 'moment';
import Button from "react-bootstrap/es/Button";
import connect from "react-redux/es/connect/connect";

class GroupPanel extends Component {

    constructor() {
        super();

        this.startTime = new Moment();
        this.endTime = new Moment();
    }

    onFinish() {

        // If groupId is not specified, you create a new group.
        if(this.props.groupId) {
            // Change existing group.


        } else {
            // Create new Group.
        }
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <FormControl type="text" placeholder="Room"/>
                </FormGroup>

                <FormGroup>
                    <FormControl type="text" placeholder="Docent"/>
                </FormGroup>

                <FormGroup>
                    <DateTime
                        onChange={(momentTime) => {
                            this.startTime = momentTime;
                        }}
                        inputProps={{placeholder :'Time on Start'}}
                    />
                </FormGroup>
                <FormGroup>
                    <DateTime
                        onChange={(momentTime) => {
                            this.endTime = momentTime;
                        }}
                        inputProps={{placeholder: 'Time on End'}}
                    />
                </FormGroup>

                <Button onClick={this.onFinish.bind(this)}>
                    Create Group
                </Button>
            </Form>
        );
    }
}




export default connect(null, null)(GroupPanel);