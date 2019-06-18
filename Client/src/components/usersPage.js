import React, { Component } from 'react';
import { Header, Table, Message, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUsersAction, deleteUsersAction } from '../actions/userActions';
import { getCookie } from '../utils/cookies';
import MenuAdminPage from './menuAdminPage';

class UsersPage extends Component {
  componentDidMount() {
    const { onGetUsers } = this.props;
    const cookie = getCookie('token');
    onGetUsers(cookie);
  }

  render() {
    let message, isSuccess, users;
    const { user, onDeleteUsers } = this.props;
    const cookie = getCookie('token');

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
        <MenuAdminPage />

        <Header as="h3" icon textAlign="center">
          <Header.Content>Users</Header.Content>
        </Header>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Name</Table.HeaderCell>
              <Table.HeaderCell width={1}>Delete ?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      onClick={() => {
                        onDeleteUsers({ token: cookie, id: user._id });
                        alert('User was deleted');
                      }}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
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
    onDeleteUsers: data => dispatch(deleteUsersAction(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
