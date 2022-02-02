import React from 'react';
import { Field, reduxForm } from 'redux-form';

class PeopleForm extends React.Component {
  renderError({error, touched}) {
    if(touched && error) {
      return(
        <div className="ui error message">
          <p>{error}</p>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="on" />
        {this.renderError(meta)}
      </div>
    );
  }

  renderSelect = (data) => {
    console.log(data);
    return (
      'Hello'
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="cpf" component={this.renderInput} label="CPF Number" />
        <Field name="name" component={this.renderInput} label="Name" />
        <Field name="email" component={this.renderInput} label="Email" />
        <label>Designation</label>
        <Field name="designation" component='select' className='ui dropdown'>
          <option></option>
          <option value="ff0000">Red</option>
          <option value="00ff00">Green</option>
          <option value="0000ff">Blue</option>
        </Field>
        <button className="ui button primary">Save</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.cpf) {
    errors.cpf = 'Please enter a CPF Number.';
  }

  if(!formValues.name) {
    errors.name = 'Please enter a Name.';
  }

  return errors;
};

const formWrpapped = reduxForm({ form: 'peopleForm', validate })(PeopleForm);

export default formWrpapped;