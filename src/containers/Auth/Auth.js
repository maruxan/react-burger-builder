import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

const Auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  // Determines if the fomr is for signing up or signing in
  const [isSignup, setIsSignup] = useState(true);

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  // If the user is authenticated when building a burger, it should be redirected to the checkout page,
  // otherwise, it should be redirected to the root page
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath('/');
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  // Input validation
  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      },
    };

    setAuthForm(updatedControls);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();

    props.onAuthSubmit(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchSignModeHanlder = () => {
    setIsSignup(!isSignup);
  };

  // State auth form to Array
  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  // Error messsage
  let errorMessage = null;
  if (props.error) {
    errorMessage = (
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        {props.error.message.replace(/_/g, ' ')}
      </p>
    );
  }

  // Redirect on login
  let authRedirect = null;
  if (props.isAuthenticated) {
    if (props.authRedirectPath === '/checkout') props.onInitPurchase();
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      <form onSubmit={authSubmitHandler}>
        {errorMessage}
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchSignModeHanlder}>
        SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.redirectPath,
    buildingBurger: state.burgerBuilder.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthSubmit: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
    onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
