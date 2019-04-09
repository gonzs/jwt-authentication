import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUserAction } from '../actions/authenticationActions';
import {
  Form,
  Input,
  Label,
  Button,
  Message,
  Icon,
  Header,
} from 'semantic-ui-react';

class RegisterPage extends Component {
  onHandleRegistration = event => {
    const { onRegisterUser } = this.props;

    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name,
      email,
      password,
    };

    onRegisterUser(data);
  };

  render() {
    const { register } = this.props;
    let message, isSuccess;

    if (register.hasOwnProperty('response')) {
      isSuccess = register.response.success;
      message = register.response.message;
    }

    return (
      <Fragment>
        <Header as="h3" icon textAlign="center">
          <Icon name="user circle outline" circular />
          <Header.Content>Register Page</Header.Content>
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
          <Redirect to="login" />
        )}

        <Form
          onSubmit={this.onHandleRegistration}
          className="attached fluid segment"
        >
          <Form.Field>
            <Label>Name</Label>
            <Input type="text" name="name" />
          </Form.Field>
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
              Register
            </Button>
          </Form.Field>
        </Form>
        <Message attached="bottom" warning>
          <Icon name="help" />
          Already have account? <Link to="login">Login here</Link>
        </Message>
      </Fragment>
    );
  }
}

const mapStateToProps = response => {
  return {
    register: response.register,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: data => dispatch(registerUserAction(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage);
