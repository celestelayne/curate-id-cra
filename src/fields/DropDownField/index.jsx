import React from 'react'
import { PropTypes } from 'prop-types'

import ChevronDownIcon from '../../assets/chevron_down.svg'

import { Error } from '../shared'

import { Select, Chevron, FieldName, Container } from './components'

export class DropDownField extends React.PureComponent {
  handleSelect = (selectedOption) => {
    const { onChange, name } = this.props
    onChange(name, selectedOption)
  }

  render () {
    const { placeholder, fieldName, value, options, className, error } = this.props
    const hasError = Boolean(error)
    return (
      <Container className={className}>
        <FieldName>{fieldName}</FieldName>
        <Select
          hasError={hasError}
          classNamePrefix="select"
          components={{
            DropdownIndicator: () => {
              return <Chevron className="chevron" src={ChevronDownIcon} />
            },
          }}
          value={value}
          options={options}
          placeholder={placeholder}
          onChange={this.handleSelect}
        />
        <Error visible={hasError}>{error && error.value}</Error>
      </Container>
    )
  }
}

DropDownField.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
}
