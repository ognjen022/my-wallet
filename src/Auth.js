import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { startLoginWithGoogle } from './store/actions/authActions';
import Particles from 'react-particles-js';
import './Auth.css';

function Auth() {
  const dispatch = useDispatch();
  const history = useHistory();

  const navigateToExpenses = () => {
    history.push('/expenses');
  };

  const responseGoogle = (response) => {
    const person = {
      name: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      pic: response.profileObj.imageUrl,
    };
    dispatch(
      startLoginWithGoogle(
        response.tokenObj.access_token,
        navigateToExpenses,
        person
      )
    );
  };

  return (
    <div>
      <Particles
        className="example"
        params={{
          particles: {
            number: {
              value: 65,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
            },
          },
        }}
        style={{
          width: '100%',
          background: 'rgb(2,0,36)',
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 26%, rgba(0,212,255,1) 100%)',
        }}
      />
      <GoogleLogin
        render={(renderProps) => (
          <div className="wrapper">
            <button
              onClick={renderProps.onClick}
              className="loginBtn loginBtn--google"
              disabled={renderProps.disabled}
            >
              Log in With Google
            </button>
          </div>
        )}
        clientId="100731628029-g9kceh0p79pnv4mbd9octm3ol2odqsj3.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={responseGoogle}
        onFailure={(err) => console.log(err)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default Auth;
