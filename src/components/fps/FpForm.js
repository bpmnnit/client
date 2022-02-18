import React from 'react';
import { Field, reduxForm } from 'redux-form';
import gs from '../../apis/gs';

class FpForm extends React.Component {
  constructor(props) {
    super(props);
    const { initialValues } = props;
    this.state = {
      types: ['', 'DEPARTMENTAL', 'OUTSOURCED', 'VSP'],
      region: [{ _id: '', title: ''}],
      chief: [{ _id: '', name: '', designation: '', discipline: ''}],
      selectedType: initialValues && initialValues.type ? initialValues.type : '',
      selectedRegion: initialValues && initialValues.region ? initialValues.region._id : '',
      selectedChief: initialValues && initialValues.chief ? initialValues.chief._id : ''
    };
  }

  componentDidMount() {
    const getPreData = async () => {
      const response = await gs.get('/pr');
      this.setState({
        region: [...this.state.region, ...response.data.regs],
        chief: [...this.state.chief, ...response.data.peops],
      });
    };

    getPreData();
  }

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

  setSelectedValue = (label) => {
    switch(label.toLowerCase()) {
      case 'type':
        return this.state.selectedType;
      case 'region':
        return this.state.selectedRegion;
      case 'chief':
        return this.state.selectedChief;
      default:
        break;  
    }
  }

  handleChange = (event, label) => {
    switch(label.toLowerCase()) {
      case 'type':
        this.setState({ selectedType: event.target.value });
        break;
      case 'region':
        this.setState({ selectedRegion: event.target.value });  
        break;
      case 'chief':
        this.setState({ selectedChief: event.target.value });
        break;
      default:
        break;  
    }
  }

  renderSelect = ({ input, label, type, meta, children }) => {
    const className=`field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select 
          {...input}
          className='ui search dropdown'
          onChange={(event) => {this.handleChange(event, label)}}
          value={this.setSelectedValue(label)}
        >
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
        <Field name='type' type='select' component={this.renderSelect} label='Type'>
          {
            this.state.types.map((element, index) => {
              return <option value={element} key={index}>{element}</option>
            })
          }
        </Field>
        <Field name='region' type='select' component={this.renderSelect} label='Region' >
          {
            this.state.region ? this.state.region.map((element, index) => {
              return <option value={element._id} key={index}>{element.title}</option>
            }): ''
          }
        </Field>
        <Field name='chief' type='select' component={this.renderSelect} label='Chief'>
          {
            this.state.chief ? this.state.chief.map((element, index) => {
              return <option value={element._id} key={index}>{`${element.name} (${element.designation}-${element.discipline})`}</option>
            }): ''
          }
        </Field>
        <button className='ui button primary' type='submit' disabled={this.props.submitting}>Save</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if(!formValues.name) {
    errors.name = 'Name is required.';
  }

  if(!formValues.type) {
    errors.type = 'Type is required.';
  }

  if(!formValues.region || formValues.region === '') {
    errors.region = 'Region is required.';
  }

  return errors;
};

const formWrpapped = reduxForm({ form: 'fpForm', validate })(FpForm);

export default formWrpapped;