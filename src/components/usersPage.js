import React, { Component } from 'react';
import { Header, List, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUsersAction } from '../actions/userActions';
import { getCookie } from '../utils/cookies';

class UsersPage extends Component {
  componentDidMount() {
    const { onGetUsers } = this.props;
    const cookie = getCookie('token');
    onGetUsers(cookie);
  }

  render() {
    let message, isSuccess, users;
    const { user } = this.props;

    if (user.hasOwnProperty('response')) {
      if (user.response !== undefined) {
        isSuccess = user.response.success;
        message = user.response.message;
        users = user.response.users;
      } else {
        isSuccess = false;
        message = 'Connection error';
      }
    }

    return !isSuccess ? (
      isSuccess !== undefined ? (
        <Message error compact>
          {message}
        </Message>
      ) : (
        <div />
      )
    ) : (
      <div>
        <Header as="h3" icon textAlign="center">
          <Header.Content>Users</Header.Content>
        </Header>
        <List animated verticalAlign="middle">
          {users.map((user, index) => {
            return (
              <List.Item key={index}>
                {/* <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
              /> */}
                <List.Content>
                  <List.Header>{user.name}</List.Header>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = response => {
  return {
    user: response.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUsers: data => dispatch(getUsersAction(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
