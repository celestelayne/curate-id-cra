import React from 'react'
import styled from 'styled-components'
import { Text } from '@knotel/cinderblock'

import FieldErrorIcon from '../assets/field_error.svg'
import theme from '../theme'

export const ErrorIconContainer = styled.img`
  width: 20px;
  height: 20px;
  object-fix: contain;
  position: absolute;
  right: ${theme.space[2]}px;
  top: calc(50% - ${theme.space[2]}px);
`

export const Error = styled(Text)`
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
  color: ${theme.colors.error};
  line-height: 15px;
  font-size: ${theme.fontSizes[0]}px;
  margin-left: ${theme.space[2] + 1}px; /* 1px because we have a border line */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
${props => props.visible ? `
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s, visibility 0.3s;
` : ''}
`

export const ErrorIcon = () => (
  <ErrorIconContainer src={FieldErrorIcon} />
)
