import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../utils/cookies';
import {
  Form,
  Input,
  Button,
  Label,
  Message,
  Icon,
  Header,
} from 'semantic-ui-react';

class LoginPage extends Component {
  onHandleLogin = event => {
    const { onLoginUser } = this.props;

    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email,
      password,
    };

    onLoginUser(data);
  };

  render() {
    const { login } = this.props;
    let isSuccess, message;

    if (login.hasOwnProperty('response')) {
      isSuccess = login.response.success;
      message = login.response.message;

      if (isSuccess) {
        setCookie('token', login.response.token, 1);
      }
    }

    return (
      <Fragment>
        <Header as="h3" icon textAlign="center">
          <Icon name="user circle outline" circular />
          <Header.Content>Login Page</Header.Content>
        </Header>

        {!isSuccess ? (
          isSuccess !== undefined ? (
            <Message error compact>
              {message}
            </Message>
          ) : (
            <div />
          )
        ) : (
          <Redirect to="dashboard" />
        )}

        <Form onSubmit={this.onHandleLogin} className="attached fluid segment">
          <Form.Field>
            <Label>Email</Label>
            <Input type="email" name="email" />
          </Form.Field>
          <Form.Field>
            <Label>Password</Label>
            <Input type="password" name="password" />
          </Form.Field>
          <Form.Field>
            <Button type="submit" color="blue">
              Login
            </Button>
          </Form.Field>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          Don't have account? <Link to="register">Register here</Link>
        </Message>
      </Fragment>
    );
  }
}

const mapStateToProps = response => {
  return {
    login: response.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: data => {
      dispatch(loginUserAction(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
