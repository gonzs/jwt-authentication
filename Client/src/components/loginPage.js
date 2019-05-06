import React, { Fragment } from 'react';
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
  Loader,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Initial Values
const initialValues = { email: '', password: '' };

// Validation Schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Mandatory Field'),
  password: Yup.string()
    .min(6, 'Too Short')
    .max(12, 'Too Long')
    .required('Mandatory Field'),
});

const LoginPage = ({ onLoginUser, login }) => {
  // onSubmit event
  const onSubmit = (values, { setSubmitting }) => {
    onLoginUser(values);
    setTimeout(() => setSubmitting(false), 1000);
    return;
  };

  let isSuccess, message;

  if (login.hasOwnProperty('response')) {
    if (login.response !== undefined) {
      isSuccess = login.response.success;
      message = login.response.message;

      if (isSuccess) {
        setCookie('token', login.response.token, 1);
      }
    } else {
      isSuccess = false;
      message = 'Connection error';
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

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="gonzalosisnero@gmail.com"
              />
              {errors.email && touched.email ? (
                <Message floating color="red" size="mini">
                  {errors.email}
                </Message>
              ) : (
                <div />
              )}
            </Form.Field>
            <Form.Field>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Gonza.1234"
              />
              {errors.password && touched.password ? (
                <Message floating color="red" size="mini">
                  {errors.password}
                </Message>
              ) : (
                <div />
              )}
            </Form.Field>
            <Form.Field>
              <Button type="submit" color="blue">
                {!isSubmitting ? 'Login' : <Loader size="tiny" active inline />}
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Don't have account? <Link to="register">Register here</Link>
      </Message>
    </Fragment>
  );
};

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
