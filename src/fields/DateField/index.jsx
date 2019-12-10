import React from 'react'
import { PropTypes } from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import ChevronDownIcon from '../../assets/chevron_down.svg'

import { Error } from '../shared'

import {
  Container,
  StyledInput,
  Chevron,
  PickerContainer,
  FieldName,
} from './components'

import 'react-datepicker/dist/react-datepicker.css'

const DATE_FORMAT = 'MMMM D, YYYY'

export class DatePickerField extends React.Component {
  inputRef = React.createRef()
  state = { visible: false }

  handleOpen = () => {
    this.setState({ visible: true })
  }

  handleClose = () => {
    this.inputRef.current.blur()
    this.setState({ visible: false })
  }

  render () {
    const {
      name,
      value,
      onChange,
      placeholder,
      fieldName,
      error,
      className,
      ...inputProps
    } = this.props
    const { visible } = this.state
    const hasError = Boolean(error)

    return (
      <Container className={className}>
        <FieldName>{fieldName}</FieldName>
        <StyledInput
          readOnly
          ref={this.inputRef}
          autoComplete="off"
          type="text"
          placeholder={placeholder}
          onFocus={this.handleOpen}
          name={name}
          value={value ? moment(value).format(DATE_FORMAT) : ''}
          hasError={hasError}
          {...inputProps}
        />
        <Chevron hasError={hasError} opened={visible} src={ChevronDownIcon} />
        <Error visible={hasError}>{error}</Error>
        {visible ? (
          <PickerContainer>
            <DatePicker
              inline
              onClickOutside={this.handleClose}
              selected={(value && new Date(value)) || null}
              onChange={changedDate => {
                onChange(name, changedDate)
                this.handleClose()
              }}
            />
          </PickerContainer>
        ) : null}
      </Container>
    )
  }
}

DatePickerField.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
}
