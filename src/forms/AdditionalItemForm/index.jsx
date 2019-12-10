import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import NumberFormat from 'react-number-format'

import { InputField, CloseButton, ExtendedSubmitButton } from '../../fields'

import { Form, InputFieldWrapper, SectionTitle } from '../shared'

import { formatCurrency } from '../../util'

import { validationSchema } from './schema.js'

const calcTotal = ({ price = '$0.00', quantity = 0 }) => {
  if (typeof price === 'string') {
    return price ? formatCurrency(Number.parseFloat(price.substr(1)) * 100 * quantity) : '$0.00'
  } else if (typeof price === 'number') {
    return price ? formatCurrency(price * 100 * quantity) : '$0.00'
  }
}

const AdditionalItemForm = ({ initialValues, onClose, onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <SectionTitle>Off-Platform Items</SectionTitle>
            <InputFieldWrapper>
              <InputField
                type="text"
                name="name"
                fieldName="Name"
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
                name="vendor"
                fieldName="Vendor"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.vendor}
                error={errors.vendor}
                value={values.vendor}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                type="text"
                name="color"
                fieldName="Color"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.color}
                error={errors.color}
                value={values.color}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                type="text"
                name="dimensions"
                fieldName="Size"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.dimensions}
                error={errors.dimensions}
                value={values.dimensions}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                type="text"
                name="hyperlink"
                fieldName="Hyperlink"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.hyperlink}
                error={errors.hyperlink}
                value={values.hyperlink}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <NumberFormat
                fixedDecimalScale
                decimalScale={2}
                allowNegative={false}
                prefix={'$'}
                customInput={InputField}
                name="price"
                fieldName="Price"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.price}
                error={errors.price}
                value={values.price}
              />
              <InputField
                width={'50%'}
                type="text"
                name="quantity"
                fieldName="Quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.quantity}
                error={errors.quantity}
                value={values.quantity}
              />
              <InputField
                readOnly
                type="text"
                name="total"
                fieldName="Total"
                value={calcTotal(values)}
              />
            </InputFieldWrapper>
            <InputFieldWrapper alignItems="center" justifyContent="flex-end">
              <CloseButton onClick={onClose}>Close</CloseButton>
              <ExtendedSubmitButton type="submit" disabled={isSubmitting}>
                Add Item
              </ExtendedSubmitButton>
            </InputFieldWrapper>
          </Form>
        )
      }}
    </Formik>
  )
}

AdditionalItemForm.propTypes = {
  initialValues: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

AdditionalItemForm.defaultProps = {}

export default AdditionalItemForm
