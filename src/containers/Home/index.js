import React, { Component, PropTypes } from 'react';
import mobiscroll from 'mobiscroll/mobiscroll.react.min';
import 'mobiscroll/mobiscroll.react.min.css';
import './style.css';
import * as AppActions from 'actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

mobiscroll.settings = {
  theme: 'ios',
  lang: 'en'
};

class Home extends Component {
  constructor(props) {
    super(props);

    var now = new Date(),
      departureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
      returnDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);

    this.state = {
      tripType: 'round',
      origin: 'LTN',
      destination: '',
      timeRange: [departureDate, returnDate],
      adults: 1,
      children: 0,
      infant: 0,
      tripClass: 'economy',
      val: '',
      selectedMenu: 'food'
    };
  }

  static propTypes = {
    transactions: PropTypes.array,
    summary: PropTypes.object,
    gridFields: PropTypes.array,
    actions: PropTypes.object
  };

  componentWillMount() {
    const { transactions, actions } = this.props;
    actions.requestSum(transactions);
  }

  changeTripType = (value, event) => {
    var returnDate = null,
      departureDate = this.state.timeRange[0];
    if (value === 'round') {
      if (this.state.timeRange[1] != null) {
        returnDate = this.state.timeRange[1];
      } else {
        returnDate = new Date(departureDate.getFullYear(), departureDate.getMonth(), departureDate.getDate() + 7);
      }
    }

    this.setState({
      tripType: value,
      timeRange: [departureDate, returnDate]
    });
  }

  rangeSet = (event, inst) => {
    if (this.state.tripType === 'round') {
      this.setState({ timeRange: inst.getVal() });
    } else {
      this.setState({ timeRange: [inst.getVal()[0], null] });
    }
  }

  rangeChange = (event, inst) => {
    var oneWay = this.state.tripType === 'oneway';
    if (oneWay && event.control === 'calendar' && event.active === 'start') {
      inst._isVisible = false;
      inst.setActiveDate('start');
      inst._isVisible = true;
    }
    if (inst._markup) {
      inst._isValid = true;
      inst._markup.find('.mbsc-fr-btn-s .mbsc-fr-btn').removeClass('mbsc-fr-btn-d' + (oneWay ? ' mbsc-disabled' : ''));
    }
  }

  rangeClose = () => {
    if (this.state.tripType === 'oneway') {
      return true;
    }
  }

  adultsChange = (event) => {
    this.setState({ adults: +event.target.value });
  }

  childrenChange = (event) => {
    this.setState({ children: +event.target.value });
  }

  infantChange = (event) => {
    this.setState({ infant: +event.target.value });
  }

  tripClassChange = (newClass) => {
    this.setState({ tripClass: newClass });
  }

  onSearch = () => {
    this.props.history.push('/list');
  }

  selectMenu = (newMenu) => {
    this.setState({ selectedMenu: newMenu });  
  }

  getRemoteData = () => {
    return {
      url: 'https://trial.mobiscroll.com/airports/',
      remoteFilter: true,
      dataType: 'jsonp',
      processResponse: function (data) {
        var i,
          item,
          ret = [];

        if (data) {
          for (i = 0; i < data.length; i++) {
            item = data[i];
            ret.push({
              value: item.code,
              text: item.name,
              html: '<div style="font-size:16px;line-height:18px;">' + item.name + '</div><div style="font-size:10px;line-height:12px;">' + item.location + ', ' + item.code + '</div>'
            });
          }
        }

        return ret;
      }
    }
  }

  render() {
    var content;
    switch (this.state.selectedMenu) {
      case 'food':
        content = <mobiscroll.Form className="md-flight-booking"
          theme="ios-dark"
        >
          <mobiscroll.CardHeader>
            <mobiscroll.CardTitle>Re-Ordering</mobiscroll.CardTitle>
          </mobiscroll.CardHeader>
          <mobiscroll.CardContent>
            <mobiscroll.Form.Label>
              <label htmlFor="demo-non-form">Name</label>
              <input type="text" value="Your Full Name" disabled />
            </mobiscroll.Form.Label>
            <mobiscroll.Form.Label>
              <label htmlFor="demo-non-form">Card</label>
              <input type="text" value="Credit card number" disabled />
            </mobiscroll.Form.Label>
            <mobiscroll.Form.Label>
              <label htmlFor="demo-non-form">Date</label>
              <mobiscroll.Datetime
                dateWheels="|D M d|"
                placeholder="Please Select..."
              />
            </mobiscroll.Form.Label>
            <mobiscroll.Form.Label>
              <mobiscroll.Stepper value={this.state.adults} onChange={this.adultsChange} min={1} max={15} data-val="left">
                Adults
            <span className="mbsc-desc">From 14 years</span>
              </mobiscroll.Stepper>
            </mobiscroll.Form.Label>
          </mobiscroll.CardContent>
          <div className="mbsc-btn-group-block mbsc-padding">
            <button className="mbsc-btn-primary">Confirm</button>
          </div>
        </mobiscroll.Form>
        break;
      case 'tech':
        content =
          <mobiscroll.Form className="md-flight-booking">
            <label>
              <label htmlFor="demo-non-form">Origin</label>
              <mobiscroll.Select
                value={this.state.origin}
                multiline={2}
                height={50}
                filter={true}
                data={this.getRemoteData()}
                placeholder="Please select..."
              />
            </label>
            <label>
              <label htmlFor="demo-non-form">Destination</label>
              <mobiscroll.Select
                multiline={2}
                height={50}
                filter={true}
                data={this.getRemoteData()}
                placeholder="Please select..."
              />
            </label>
            <label>
              <label htmlFor="demo-non-form">Date</label>
              <mobiscroll.Datetime
                dateWheels="|D M d|"
                placeholder="Please Select..."
              />
            </label>

            <mobiscroll.Stepper value={this.state.adults} onChange={this.adultsChange} min={1} max={15} data-val="left">
              Adults
              <span className="mbsc-desc">From 14 years</span>
            </mobiscroll.Stepper>
            <mobiscroll.Stepper value={this.state.children} onChange={this.childrenChange} min={0} max={15} data-val="left">
              Children
              <span className="mbsc-desc">2-14 years</span>
            </mobiscroll.Stepper>
            <mobiscroll.Checkbox defaultChecked>
              Option 1
              <span className="mbsc-desc">Checked checkbox</span>
            </mobiscroll.Checkbox>

            <label>
              Economy
              <input type="radio" checked={this.state.tripClass === 'economy'} onChange={this.tripClassChange.bind(this, 'economy')} data-role="segmented" name="flight_type" />
            </label>
            <label>
              Comfort
              <input type="radio" checked={this.state.tripClass === 'comfort'} onChange={this.tripClassChange.bind(this, 'comfort')} data-role="segmented" name="flight_type" />
            </label>
            <label>
              Business
              <input type="radio" checked={this.state.tripClass === 'business'} onChange={this.tripClassChange.bind(this, 'business')} data-role="segmented" name="flight_type" />
            </label>

            <div className="mbsc-padding">
              <button className="mbsc-btn-block" onClick={this.onSearch.bind(this)}>Find Flights</button>
            </div>
          </mobiscroll.Form>
        break;
    }

    return <div>
      <mobiscroll.Card
        theme="ios-dark"
      >
        <mobiscroll.CardContent>
          <mobiscroll.CardTitle>Daily tips</mobiscroll.CardTitle>
        </mobiscroll.CardContent>
        <mobiscroll.TabNav
          theme="ios-dark"
          display="inline"
        >
          <mobiscroll.NavItem selected={this.state.selectedMenu == 'food'} onClick={this.selectMenu.bind(null, 'food')}>Food</mobiscroll.NavItem>
          <mobiscroll.NavItem selected={this.state.selectedMenu == 'tech'} onClick={this.selectMenu.bind(null, 'tech')}>Tech</mobiscroll.NavItem>
          <mobiscroll.NavItem selected={this.state.selectedMenu == 'travel'} onClick={this.selectMenu.bind(null, 'travel')}>Travel</mobiscroll.NavItem>
        </mobiscroll.TabNav>
        <mobiscroll.CardContent>
          {content}
        </mobiscroll.CardContent>
        <mobiscroll.CardFooter>
          <button className="mbsc-btn-flat">Read more</button>
        </mobiscroll.CardFooter>
      </mobiscroll.Card>
    </div>;
  }
}

function mapStateToProps(state) {
  const { transactions } = state;
  return {
    transactions: transactions.transactions,
    summary: transactions.summary,
    gridFields: transactions.transactionsGrid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);