import React, { Component } from 'react';
import mobiscroll from 'mobiscroll/mobiscroll.react.min';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: false,
            btnText: 'Sign in',
            signup: "Don't have an account yet? Sign up.",
            email: '',
            emailValid: true,
            emailError: '',
            pass: '',
            passValid: true,
            passError: '',
            submitted: false
        };
    }
    
    emailChange = (event) => {
        var invalid = this.validateEmail(event.target.value);
        this.setState({
            email: event.target.value,
            emailValid: !this.state.submitted || !invalid,
            emailError: invalid || ''
        });
    }
    
    validateEmail = (email) => {
        if (email) {
            if (/[a-z]+@[a-z]+\.[a-z]+/.test(email)) {
                return null;
            } else {
                return "Invalid email";
            }
        } else {
            return "Email required";
        }
    }
    
    passChange = (event) => {
        var invalid = this.validatePass(event.target.value);
        this.setState({
            pass: event.target.value,
            passValid: !this.state.submitted || !invalid,
            passError: invalid || ''
        });
    }
    
    validatePass = (pass) => {
        if (pass) {
            if (pass.length < 6) {
                return 'At least 6 characters required';
            } else {
                return null;
            }
        } else {
            return 'Password required';
        }
    }
    
    signUp = (event) => {
        event.preventDefault();
        this.setState({
            signup: this.state.isLogin ? "Don't have an account yet? Sign up." : "Already have an account?",
            btnText: this.state.isLogin ? "Sign in" : "Sign up",
            isLogin: !this.state.isLogin
        });
    }
    
    password = (event) => {
        event.preventDefault();
    }
    
    submit = (event) => {
        event.preventDefault();
        if (this.state.submitted && this.state.emailValid && this.state.passValid) {
            mobiscroll.toast({ message: (this.state.isLogin ? 'Login' : 'Signup') + ' success!'});
        } else {
            var emailInvalid = this.validateEmail(this.state.email);
            var passInvalid = this.validatePass(this.state.pass);
            this.setState({
                submitted: true,
                emailValid: !emailInvalid,
                emailError: emailInvalid || '',
                passValid: !passInvalid,
                passError: passInvalid || ''
            });
        }
    }
    
    render() {
        return (
            <mobiscroll.Form 
                className="md-login-form" 
                action="/login" 
                method='POST'
                onSubmit={this.submit}
                novalidate
            >
                <div className="md-logo micons icon-mbsc-logo"></div>
                <div className="mbsc-form-group-inset">
                    <mobiscroll.Input type="email" name="Email" placeholder="Email" value={this.state.email} onChange={this.emailChange} valid={this.state.emailValid} errorMessage={this.state.emailError} />
                    <mobiscroll.Input type="password" name="Password" placeholder="Password" passwordToggle={true} icon="none" iconAlign="right" value={this.state.pass} onChange={this.passChange} valid={this.state.passValid} errorMessage={this.state.passError} />
                </div>
                <div className="mbsc-form-group-inset mbsc-padding mbsc-align-center">
                    <a href="#" onClick={this.signUp}>{this.state.signup}</a>
                    <br/><br/>
                    <a href="#" onClick={this.password}>Forgot password?</a>
                </div>
                <div className="mbsc-form-group-inset mbsc-padding">
                    <mobiscroll.Button type="submit" block={true}>{this.state.btnText}</mobiscroll.Button>
                </div>
            </mobiscroll.Form>
        );
    }    
}

export default Login