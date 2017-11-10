import * as React from "react";
import {Component} from "react";
import {Alert, Button, FormControl, FormGroup} from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import './LoginPanel.css'
import {connect} from "react-redux";
import LoginActions from "../../Actions/LoginActions";
import FetchDataActions from "../../Actions/FetchDataActions";

class LoginPanel extends Component {

    constructor() {
        super();
        this.state = {
            isDisplayNameOpen: false
        }
    }

    openDisplayName() {
        this.setState({
            isDisplayNameOpen: true
        })
    }

    createAccountWithCredentials() {

        const userMail = this.emailRef.value;
        const userPassword = this.passwordRef.value;
        const displayName = this.displayNameRef.value;

        if(!userMail || !userPassword || !displayName) {
            //TODO: Show error message
            return;
        }

        this.props.registerWithCredentials(displayName, userMail, userPassword)


    }

    loginWithCredentials() {

        const userMail = this.emailRef.value;
        const userPassword = this.passwordRef.value;

        this.props.loginWithCredentials(userMail, userPassword);
    }

    renderDisplayName() {
        return (
            <FormGroup controlId="formHorizontalDisplayName">
                <FormControl inputRef={ref => this.displayNameRef = ref} type="text" placeholder="Display Name"/>
            </FormGroup>
        )
    }

    renderMessage() {

        return null;

        return (
            <Alert className="alertBox" bsStyle="danger">
                <h4>Error!</h4>
                <p>Text</p>
            </Alert>
        )
    }

    render() {
        return (
            <div className="LoginPanel">
                {this.renderMessage()}
                <Form style={{margin: 'auto'}}>
                    <FormGroup controlId="formHorizontalEmail">
                        <FormControl inputRef={ref => this.emailRef = ref} type="email" placeholder="Email"/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <FormControl inputRef={ref => this.passwordRef = ref} type="password" placeholder="Password"/>
                    </FormGroup>


                    { this.state.isDisplayNameOpen ? this.renderDisplayName() : null}


                    <Button onClick={this.loginWithCredentials.bind(this)} bsStyle={"success"} className={'firstButton'}>
                        Login
                    </Button>
                    <Button bsStyle={"primary"} className={'firstButton'}>
                        Forgot Password
                    </Button>
                    <Button onClick={ this.state.isDisplayNameOpen ? this.createAccountWithCredentials.bind(this) : this.openDisplayName.bind(this) } bsStyle={"danger"}>
                        Create Account
                    </Button>
                </Form>
            </div>

        )
    }
}

const mapDispatchToProps = {
    loginWithCredentials: LoginActions.loginWithCredentials,
    registerWithCredentials: FetchDataActions.putUserAccount
};

export default connect(null, mapDispatchToProps)(LoginPanel);