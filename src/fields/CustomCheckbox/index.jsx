import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text, Flex } from '@knotel/cinderblock'

import theme from '../../theme'
import CheckboxIcon from '../../assets/checkbox.svg'
import CheckboxCheckedIcon from '../../assets/checkbox-checked.svg'

const Container = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  user-select: none;
  padding: ${theme.space[2]}px 0;
`

const Checkbox = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  pointer-events: none;
`

const FieldName = styled(Text)`
  font-size: ${theme.fontSizes[1]}px;
  color: ${theme.colors.text};
`

export const CustomCheckbox = ({ name, value, onChange, fieldName, className }) => {
  return (
    <Container
      className={className}
      onClick={() => {
        onChange(name, !value)
      }}
    >
      <FieldName>{fieldName}</FieldName>
      <Checkbox src={value ? CheckboxCheckedIcon : CheckboxIcon} />
    </Container>
  )
}

CustomCheckbox.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}
