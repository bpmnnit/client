import React from 'react';
import { Field, reduxForm } from 'redux-form';

class BasinForm extends React.Component {
  state = {
    categories: ['', 'CATEGORY-I', 'CATEGORY-II', 'CATEGORY-III', 'CATEGORY-IV'],
  };

  renderError({error, touched}) {
    if(touched && error) {
      return(
        <span className='ui red header' style={{'fontSize': '85%'}}>{error}</span>
      );
    }
  }

  renderField = ({ input, label, type, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} />
        {this.renderError(meta)}
      </div>
    );
  }

  renderSelect = ({ input, label, type, meta, children }) => {
    const className=`field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select {...input} className='ui search dropdown'>
          {children}
        </select>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field name='name' type='text' component={this.renderField} label='Name'/>
        <Field name='category' component={this.renderSelect} label='Category'>
          {
            this.state.categories.map((element, index) => {
              return <option value={element} key={index}>{element}</option>
            })
          }
        </Field>
        <button className='ui button primary' type='submit'>Save</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.name) {
    errors.name = 'Name is required.';
  }

  if(!formValues.category) {
    errors.category = 'Category is required.';
  }

  return errors;
};

const formWrpapped = reduxForm({ form: 'basinForm', validate })(BasinForm);

export default formWrpapped;