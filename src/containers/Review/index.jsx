import React, { Component } from 'react';
import mobiscroll from 'mobiscroll/mobiscroll.react.min';

class Review extends React.Component {

    onSubmit = () => {
        this.props.history.push('/payment');
    }

    render() {
        return (
            <div>
                <mobiscroll.Form>
                    <div className="mbsc-form-group">
                        <div className="mbsc-form-group-title">Inside Mobiscroll Form</div>
                        <label>
                            <label htmlFor="demo-non-form">Miles</label>
                            <mobiscroll.Distance
                                ref="distance"
                                units={['mi']}
                                placeholder="Please Select..."
                            />
                        </label>
                        <label>
                            <label htmlFor="demo-non-form">Kilometers</label>
                            <mobiscroll.Distance
                                ref="distance"
                                units={['km']}
                                placeholder="Please Select..."
                            />
                        </label>
                        <label>
                            <label htmlFor="demo-non-form">Convert</label>
                            <mobiscroll.Distance
                                ref="distance"
                                units={['km', 'mi']}
                                step={0.5}
                                max={800}
                                disabled
                                placeholder="Please Select..."
                            />
                        </label>
                    </div>
                    <div className="mbsc-form-group mbsc-padding">
                        <p className="mbsc-thin">Use it on any input or non-mobiscroll form.</p>
                    </div>
                    <div className="mbsc-padding">
                        <button className="mbsc-btn-block" onClick={this.onSubmit.bind(this)}>Payment</button>
                    </div>
                </mobiscroll.Form>
            </div>
        );
    }
}


export default Review