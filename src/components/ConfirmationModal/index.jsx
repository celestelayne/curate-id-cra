import React from 'react'
import PropTypes from 'prop-types'
import { Absolute, CloseButton } from '@knotel/cinderblock'

import theme from '../../theme'

import { Content, Modal, SubTitle, Title, StyledButton } from './components'

export class ConfirmationModal extends React.Component {
  render () {
    const { open, onClose, onConfirm, title, subTitle, secondary, actionLabel } = this.props
    return (
      <Modal open={open} onClose={onClose}>
        <Content>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
          <Absolute top={24} right={24}>
            <CloseButton color={theme.colors.placeholderText} onClick={onClose} />
          </Absolute>
          <Absolute bottom={24} right={24}>
            <StyledButton outlined onClick={onClose}>Cancel</StyledButton>
            <StyledButton onClick={onConfirm} secondary={secondary}>{actionLabel}</StyledButton>
          </Absolute>
        </Content>
      </Modal>
    )
  }
}

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  secondary: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  actionLabel: PropTypes.string,
}

ConfirmationModal.defaultProps = {
  title: 'Archive project',
  subTitle: 'Are you sure you want to archive this project?',
  actionLabel: 'Archive project',
}

export default ConfirmationModal
