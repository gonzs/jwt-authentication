import React, { Component, Fragment } from 'react';
import { getCookie } from '../utils/cookies';
import { connect } from 'react-redux';
import { getDashboardAction } from '../actions/dashboardActions';
import { Message, Header } from 'semantic-ui-react';

class DashboardPage extends Component {
  componentDidMount() {
    const { onGetDashboard } = this.props;
    const cookie = getCookie('token');
    onGetDashboard(cookie);
  }

  render() {
    const { dashboard } = this.props;
    let message, isSuccess;

    if (dashboard.hasOwnProperty('response')) {
      isSuccess = dashboard.response.success;
      message = dashboard.response.message;
    }
    return (
      <Fragment>
        {!isSuccess ? (
          isSuccess !== undefined ? (
            <Message warning compact>
              Loading...
            </Message>
          ) : (
            <div />
          )
        ) : (
          <Header as="h3" icon textAlign="center">
            <Header.Content>{message}</Header.Content>
          </Header>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = response => {
  return {
    dashboard: response.dashboard,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetDashboard: data => dispatch(getDashboardAction(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
