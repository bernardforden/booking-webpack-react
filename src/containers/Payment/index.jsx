import React, { Component } from 'react';
import mobiscroll from 'mobiscroll/mobiscroll.react.min';

class Payment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            val: new Date("2020-12")
        };
    }

    onSubmit = () => {
        this.props.history.push('/finish');
    }

    render() {
        var now = new Date(),
            until = new Date(now.getFullYear() + 10, now.getMonth());

        return (
            <div>
                <mobiscroll.Form>
                    <div className="mbsc-form-group">
                        <div className="mbsc-form-group-title">Add a new credit card</div>
                        <label>
                            <label htmlFor="demo-non-form">Name</label>
                            <input type="text" placeholder="Required" />
                        </label>
                        <label>
                            <label htmlFor="demo-non-form">Card</label>
                            <input type="text" placeholder="Credit card number" />
                        </label>
                        <label>
                            <label htmlFor="demo-non-form">Expiration</label>
                            <mobiscroll.Date
                                theme="ios-dark"
                                dateWheels="mm - MM  yy"
                                dateFormat="mm/yy"
                                min={now}
                                minWidth={100}
                                max={until}
                                value={this.state.val}
                                placeholder="Required"
                            />
                        </label>
                        <label>
                            <label htmlFor="demo-non-form">Security</label>
                            <input type="text" placeholder="3-digit CVV" />
                        </label>
                    </div>
                    <div className="mbsc-padding">
                        <button className="mbsc-btn-block" onClick={this.onSubmit.bind(this)}>Finish</button>
                    </div>
                </mobiscroll.Form>
            </div>
        );
    }
}

export default Payment