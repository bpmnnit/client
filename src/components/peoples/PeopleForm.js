import React from 'react';
import { Field, reduxForm } from 'redux-form';

class PeopleForm extends React.Component {
  state = {
    designations: ['', 'Executive Director', 'Group General Manager', 'Chief General Manager', 'General Manager', 'Deputy General Manager (Geophysics-Surface)', 'Deputy General Manager (Geophysics-Wells)', 'Deputy General Manager', 'Chief Manager', 'Chief Geophysicist', 'Chief Geophysicist (Wells)', 'Chief Geophysicist (Surface)', 'Chief Geologist', 'Chief Chemist', 'Chief Engineer', 'Deputy Suptdg. Geophysicist (Surface)', 'Deputy Suptdg. Geophysicist (Wells)', 'Deputy Suptdg. Geophysicist', 'Manager', 'Superintending Geophysicist (Surface)', 'Superintending Geophysicist (Wells)', 'Superintending Geophysicist', 'Senior Geophysicist (Surface)', 'Senior Geophysicist (Wells)', 'Senior Geophysicist', 'Superintending Geologist', 'Superintending Chemist', 'Superintending Engineer', 'Executive Engineer', 'Senior Officer', 'Officer', 'Assistant Executive Engineer', 'Senior Geologist', 'Senior Chemist', 'Geophysicist (Surface)', 'Geophysicist (Wells)', 'Geophysicist', 'Geologist', 'Chemist', 'Assistant Officer', 'Assistant Engineer', 'Personal Secretary', 'Chief Superintendent', 'Senior Foreman', 'Senior Superintendent', 'Superintendent', 'Foreman', 'Assistant Superintendent', 'Assistant Foreman', 'Junior Engineer', 'Junior Superintendent', 'Junior Accountant', 'Topman', 'Chargeman', 'Assistant Grade I', 'Junior Technician', 'Rig man', 'Assistant Grade II', 'Assistant Junior Technician', 'Assistant Rig man', 'Assistant Grade III', 'Junior Assistant Technician', 'Junior Assistant A-I', 'Head Worker W-VII', 'Deputy Head Worker', 'Senior Worker W-V', 'Attendant Grade -I', 'Attendant Grade -II', 'Attendant Grade –III', 'Junior Attendant', 'Junior Assistant', 'Junior Technician', 'Assistant Technician', 'Chief Foreman', 'Scientific Assistant', 'Junior Scientific Assistant', 'Engineering Assistant', 'Junior Engineering Assistant', 'Deputy Superintending Engineer', 'Junior Motor Vehicle Driver'],
    disciplines: ['', 'Geophysics', 'E&T', 'Programming', 'Survey', 'Electronics', 'Instrumentation', 'HR', 'MM', 'IT', 'P&A', 'Mechanical', 'Mathematics', 'Duplicating Mechanical', 'Drilling', 'Marine', 'Technical', 'Field', 'Crane', 'Office', 'H/V', 'H/E', 'Auto', 'Auto Elect', 'Winch', 'Hygiene', 'Geoscience', 'T/B', 'Steno', 'Diesel'],
    levels: ['', 'E9', 'E8', 'E7', 'E6', 'E5', 'E4', 'E3', 'E2', 'E1', 'E0', 'A4', 'A3', 'A2', 'A1', 'W7', 'W6', 'W5', 'W4', 'W3', 'W2', 'W1', 'S4', 'S3', 'S2', 'S1', 'F2', 'F1'],
    crcs: ['', 'L1', 'L2', 'L3', 'L4', ]
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
        <Field name='cpf' type='number' component={this.renderField} label='CPF Number'/>
        <Field name='name' type='text' component={this.renderField} label='Name'/>
        <Field name='email' type='email' component={this.renderField} label='Email'/>
        <Field name='designation' component={this.renderSelect} label='Designation'>
          {
            this.state.designations.map((element, index) => {
              return <option value={element} key={index}>{element}</option>
            })
          }
        </Field>
        <Field name='discipline' component={this.renderSelect} label='Discipline'>
          {
            this.state.disciplines.map((element, index) => {
              return <option value={element} key={index}>{element}</option>
            })
          }    
        </Field>
        <Field name='charge' type='text' component={this.renderField} label='Charge'/>
        <Field name='level' type='select' component={this.renderSelect} label='Level'>
          {
            this.state.levels.map((element, index) => {
              return <option value={element} key={index}>{element}</option>
            })
          }
        </Field>  
        <Field name='mobile' type='number' component={this.renderField} label='Mobile'/>
        <Field name='crc' type='select' component={this.renderSelect} label='CRC'>
          {
            this.state.crcs.map((element, index) => {
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

  if(!formValues.cpf) {
    errors.cpf = 'CPF Number is required & must be an integer.';
  }

  if(!formValues.name) {
    errors.name = 'Name is required.';
  }

  if(!formValues.email) {
    errors.email = 'Email is required.';
  }

  if(!formValues.designation) {
    errors.designation = 'Designation is required.';
  }

  if(!formValues.discipline) {
    errors.discipline = 'Discipline is required.';
  }

  return errors;
};

const formWrpapped = reduxForm({ form: 'peopleForm', validate })(PeopleForm);

export default formWrpapped;