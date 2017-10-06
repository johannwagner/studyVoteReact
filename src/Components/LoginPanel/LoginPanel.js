import {Component} from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import * as React from "react";
import Form from "react-bootstrap/es/Form";
import './LoginPanel.css'
import {connect} from "react-redux";
import LoginActions from "../../Actions/LoginActions";

class LoginPanel extends Component {

    loginWithCredentials() {

        const userMail = this.emailRef.value;
        const userPassword = this.passwordRef.value;

        this.props.loginWithCredentials(userMail, userPassword);
    }

    render() {
        return (<Form style={{margin: 'auto'}}>
            <FormGroup controlId="formHorizontalEmail">
                    <FormControl inputRef={ref => this.emailRef = ref} type="email" placeholder="Email"/>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
                    <FormControl inputRef={ref => this.passwordRef = ref} type="password" placeholder="Password"/>
            </FormGroup>

            <Button onClick={this.loginWithCredentials.bind(this)} bsStyle={"success"} className={'firstButton'}>
                Login
            </Button>
            <Button bsStyle={"primary"}>
                Forgot Password
            </Button>
        </Form>)
    }
}

const mapDispatchToProps = {
    loginWithCredentials: LoginActions.loginWithCredentials
};

export default connect(null, mapDispatchToProps)(LoginPanel);