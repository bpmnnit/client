import React from 'react';
import { Field, reduxForm } from 'redux-form';

class RegionForm extends React.Component {
  renderError({error, touched}) {
    if(touched && error) {
      return(
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="name" component={this.renderInput} label="Region Name" />
        <Field name="description" component={this.renderInput} label="Region Description" />
        <button className="ui button primary">Create Region</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.name) {
    errors.name = 'You must enter a name';
  }

  if(!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors
};

const formWrpapped = reduxForm({ form: 'regionForm', validate })(RegionForm);

export default formWrpapped;