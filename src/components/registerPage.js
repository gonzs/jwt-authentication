import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
  Loader,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Initial Values
const initialValues = { name: '', email: '', password: '' };

// Validation Schema
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Mandatory Field'),
  email: Yup.string()
    .email('Invalid email')
    .required('Mandatory Field'),
  password: Yup.string()
    .min(6, 'Too Short')
    .max(12, 'Too Long')
    .required('Mandatory Field'),
});

const RegisterPage = ({ register, onRegisterUser }) => {
  // onSubmit event
  const onSubmit = (values, { setSubmitting }) => {
    onRegisterUser(values);
    setTimeout(() => setSubmitting(false), 1000);
    return;
  };

  let message, isSuccess;

  if (register.hasOwnProperty('response')) {
    if (register.response !== undefined) {
      isSuccess = register.response.success;
      message = register.response.message;
    } else {
      isSuccess = false;
      message = 'Connection error';
    }
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
        <Message positive compact>
          {message}
        </Message>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Label>Name</Label>
              <Input type="text" name="name" onChange={handleChange} />
              {errors.name && touched.name ? (
                <Message floating color="red" size="mini">
                  {errors.name}
                </Message>
              ) : (
                <div />
              )}
            </Form.Field>

            <Form.Field>
              <Label>Email</Label>
              <Input type="email" name="email" onChange={handleChange} />
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
              <Input type="password" name="password" onChange={handleChange} />
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
                {!isSubmitting ? (
                  'Register'
                ) : (
                  <Loader size="tiny" active inline />
                )}
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Already have account? <Link to="login">Login here</Link>
      </Message>
    </Fragment>
  );
};

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
