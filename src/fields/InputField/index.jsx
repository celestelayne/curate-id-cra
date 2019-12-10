import React from 'react'
import PropTypes from 'prop-types'

import { ErrorIcon, Error } from '../shared'
import { Container, FieldName, StyledInput } from './components'

export const InputField = ({
  error,
  touched,
  placeholder,
  fieldName,
  className,
  readOnly,
  width,
  additionalSize,
  ...inputProps
}) => {
  const hasError = Boolean(error)

  return (
    <Container width={width} readOnly={readOnly} className={className}>
      <FieldName>{fieldName}</FieldName>
      <StyledInput
        placeholder={placeholder}
        readOnly={readOnly}
        hasError={hasError}
        additionalSize={additionalSize}
        {...inputProps}
      />
      {hasError ? <ErrorIcon /> : null}
      <Error visible={hasError}>{error}</Error>
    </Container>
  )
}

InputField.propTypes = {
  width: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string,
  additionalSize: PropTypes.any,
  touched: PropTypes.bool,
  readOnly: PropTypes.bool
}
