import React from 'react'
import { PropTypes } from 'prop-types'
import { components } from 'react-select'

import ChevronDownIcon from '../../assets/chevron_down.svg'

import { Error } from '../shared'

import {
  Select,
  Chevron,
  Flag,
  Label,
  ItemContainer,
  Container,
  FieldName,
  PlaceholderText,
  FlagPlaceholder,
} from './components'
import { COUNTRIES } from './countries'

const Placeholder = (props) => {
  return (
    <components.Placeholder {...props}>
      <ItemContainer>
        <FlagPlaceholder />
        <PlaceholderText>{props.children}</PlaceholderText>
      </ItemContainer>
    </components.Placeholder>
  )
}

Placeholder.propTypes = {
  children: PropTypes.string
}

const SingleOption = (props) => (
  <components.Option {...props}>
    <ItemContainer>
      <Flag src={props.data.flagPath} />
      <Label>{props.label}</Label>
    </ItemContainer>
  </components.Option>)

SingleOption.propTypes = {
  data: PropTypes.shape({
    flagPath: PropTypes.string,
  }),
  label: PropTypes.string
}

const SingleValue = (props) => (
  <components.SingleValue {...props}>
    <ItemContainer>
      <Flag src={props.data.flagPath} />
      <Label>{props.data.label}</Label>
    </ItemContainer>
  </components.SingleValue>)

SingleValue.propTypes = {
  data: PropTypes.string
}

class CountryField extends React.PureComponent {
  handleSelect = (selectedOption) => {
    const { onChange, name } = this.props
    onChange(name, selectedOption)
  }

  render () {
    const { placeholder, fieldName, value, className, error } = this.props
    const hasError = Boolean(error)
    console.log('error', error)
    return (
      <Container className={className}>
        <FieldName>{fieldName}</FieldName>
        <Select
          ref={this.selectRef}
          hasError={hasError}
          classNamePrefix="select"
          components={{
            Placeholder,
            Option: SingleOption,
            SingleValue: SingleValue,
            DropdownIndicator: () => {
              return <Chevron className="chevron" src={ChevronDownIcon} />
            },
          }}
          value={value}
          options={COUNTRIES}
          placeholder={placeholder}
          onChange={this.handleSelect}
        />
        <Error visible={hasError}>{error && error.value}</Error>
      </Container>
    )
  }
}

CountryField.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  value: PropTypes.shape({
    flagPath: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  name: PropTypes.string,
}

CountryField.displayName = 'Country Field'

export { SingleOption, CountryField }
