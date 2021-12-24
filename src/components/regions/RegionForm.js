import React from 'react';
import { Field, reduxForm } from 'redux-form';

class RegionForm extends React.Component {
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

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Region Title" />
        <Field name="description" component={this.renderInput} label="Region Description" />
        <button className="ui button primary">Save</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.title) {
    errors.title = 'Please enter a region title.';
  }

  if(!formValues.description) {
    errors.description = 'Please enter a region description.';
  }

  return errors;
};

const formWrpapped = reduxForm({ form: 'regionForm', validate })(RegionForm);

export default formWrpapped;