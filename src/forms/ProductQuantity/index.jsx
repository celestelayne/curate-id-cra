import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { formatCurrency } from '../../util'
import {
  Form,
  InputFieldWrapper,
  ShortInputField,
  StyledSubmitButton,
  CostField,
} from './components'

import { validationSchema } from './validationSchema'
export const ProductQuantity = ({ initialValues, disabled, onSubmit }) => {
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
      }) => (
        <Form onSubmit={handleSubmit}>
          <InputFieldWrapper>
            <ShortInputField
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              min="1"
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.quantity}
              error={errors.quantity}
              value={values.quantity}
            />
            <CostField
              readOnly
              type="text"
              id="total_price"
              name="total_price"
              placeholder="Total Price"
              value={formatCurrency(values.quantity * values.cost)}
            />
          </InputFieldWrapper>
          <StyledSubmitButton disabled={disabled} width={[1, 165]} type="submit">
            Add To Project
          </StyledSubmitButton>
        </Form>
      )}
    </Formik>
  )
}

ProductQuantity.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
}

ProductQuantity.defaultProps = {}

export default ProductQuantity
