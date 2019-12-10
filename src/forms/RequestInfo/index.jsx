import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { InputField } from '../../fields'
import { InputFieldWrapper } from '../shared'

import { SubmitButton, StyledForm } from './components'
import { validationSchema } from './validationSchema'

export const RequestInfo = ({ initialValues, disabled, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        dirty,
      }) => (
        <StyledForm onSubmit={handleSubmit}>
          <InputFieldWrapper>
            <InputField
              type="text"
              id="name"
              name="name"
              placeholder="Enter company name"
              fieldName="company name"
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              error={errors.name}
              value={values.name}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputField
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              fieldName="your name"
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.name}
              error={errors.name}
              value={values.name}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <InputField
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              fieldName="email address"
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
              value={values.email}
            />
          </InputFieldWrapper>
          <SubmitButton
            disabled={!dirty || Object.entries(errors).length !== 0}
            width={[1, 165]}
            type="submit"
          >
            Request more info
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  )
}

RequestInfo.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
}

RequestInfo.defaultProps = {}

export default RequestInfo
