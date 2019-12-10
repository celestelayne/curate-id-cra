import React from 'react'
import PropTypes from 'prop-types'

import { Modal, modalStyles, Content } from './components'

const BaseModal = ({
  className,
  children,
  open,
  onClose,
  shouldCloseOnOverlayClick,
}) => {
  return (
    <Modal
      className={className}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      isOpen={open}
      onRequestClose={onClose}
      style={modalStyles}
    >
      {children}
    </Modal>
  )
}

BaseModal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
}

BaseModal.defaultProps = {
  shouldCloseOnOverlayClick: true,
}

export default BaseModal
export const ModalContent = Content
