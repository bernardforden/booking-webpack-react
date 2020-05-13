import React, { Component } from 'react';
import mobiscroll from 'mobiscroll/mobiscroll.react.min';
import './style.css'

class Signup extends React.Component {
    render() {
        return (
            <div>
                <mobiscroll.Form 
                    theme="ios-dark"
                    className="md-create-account"
                >
                    <div className="md-chart-pic"></div>

                    <div className="md-cac-title mbsc-padding">
                        <h4>Great news, your traffic <br /> is already being tracked</h4>
                        <h4>Continue by creating a new account</h4>
                    </div>
                    <div className="md-cac-cont">
                        <div className="mbsc-form-group-inset">
                            <mobiscroll.Input name="username" placeholder="Name" />
                            <mobiscroll.Input name="email" type="email" placeholder="Email address" />
                            <mobiscroll.Input name="password" type="password" placeholder="Password" passwordToggle={true} />
                        </div>
                        <div className="md-cac-btn mbsc-form-group-inset">
                            <mobiscroll.Button block={true}>Create account</mobiscroll.Button>
                            <mobiscroll.Button block={true} flat={true}>I'll do it later</mobiscroll.Button>
                        </div>
                    </div>
                </mobiscroll.Form>
            </div>
        );
    }
}

export default Signup