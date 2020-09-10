import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = ({ onSubmit, handleSubmit }) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  const onSubmitForm = (formValues) => {
    // console.log(formValues);
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="ui form error">
      <Field name="title" component={renderInput} label="Enter Title" />
      <Field
        name="description"
        component={renderInput}
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    // only run if the user did not enter the title
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    // only run if the user did not enter the description
    errors.description = "You must enter a description";
  }

  return errors;
};


export default reduxForm({ form: "streamForm", validate })(StreamForm);
