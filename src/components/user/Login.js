import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      cpf: '',
      password: '',
      loading: false,
    };
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.cpf, this.state.password))
        .then(() => {
          history.push('/profile');
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <div className="login-form">
        <div className="middle-div">
          <i className="huge icons">
            <i className="big circle outline icon"></i>
            <i className="user icon"></i>
          </i>
        </div>
        <Form
          className="ui form"
          onSubmit={this.handleLogin}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="field">
            <label>CPF</label>
            <input
              type="number"
              name="cpf"
              placeholder="CPF Number"
              value={this.state.cpf}
              onChange={this.onChangeCpf}
              validations={[required]}
            ></input>
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
              validations={[required]}
            ></input>
          </div>
          <button className="ui button" disabled={this.state.loading}>
            {this.state.loading && (
              <div className="ui active centered inline loader">
                <div className="ui text loader">Loading</div>
              </div>
            )}
            Login
          </button>
          {message && (
            <div className="ui negative message">
              <div className="header">Attention:</div>
              <p>{message}</p>
            </div>
          )}

          <CheckButton
            style={{ display: 'none' }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
      // <div className='col-md-12'>
      //   <div className='card card-container'>
      //     <img
      //       src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
      //       alt='profile-img'
      //       className='profile-imag-card'
      //     />

      //     <Form onSubmit={ this.handleLogin } ref={(c) => { this.form = c; }} >
      //       <div className='form-group'>
      //         <label htmlFor='cpf'>CPF</label>
      //         <input
      //           type='text'
      //           className='form-control'
      //           name='cpf'
      //           value={this.state.cpf}
      //           onChange={this.onChangeCpf}
      //           validations={[required]}
      //         />
      //       </div>

      //       <div className='form-group'>
      //         <label htmlFor='password'>Password</label>
      //         <input
      //           type='text'
      //           className='form-control'
      //           name='password'
      //           value={this.state.password}
      //           onChange={this.onChangePassword}
      //           validations={[required]}
      //         />
      //       </div>

      //       <div className="form-group">
      //         <button className="btn btn-primary btn-block" disabled={this.state.loading}>
      //           {this.state.loading && (
      //             <span className="spinner-border spinner-border-sm"></span>
      //           )}
      //           <span>Login</span>
      //         </button>
      //       </div>

      //       {message && (
      //         <div className="form-group">
      //           <div className="alert alert-danger" role="alert">
      //             {message}
      //           </div>
      //         </div>
      //       )}

      //       <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }} />
      //     </Form>
      //   </div>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
