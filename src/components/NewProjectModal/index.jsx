import React from 'react'

import PropTypes from 'prop-types'

import { Absolute, Button, CloseButton } from '@knotel/cinderblock'

import SimpleProjectForm from '../../forms/SimpleProjectForm'
import theme from '../../theme'

import {
  getStateByValue,
  getTierByFoundationValue,
  getTypeByFoundationValue,
  getRegionByFoundationValue
} from '../dataMappers'
import { Content, Modal } from './components'
import { trackAddProject } from '../../tracking'

const PROJECT_DATA_LOCAL_STORAGE_KEY = 'project-data'
// Todo: Move Project Data into Launch Svc

export const ProjectModal = ({ visible, title, onClose, values, submitButtonTitle, onSubmit }) => {
  let transformedValues = {}
  if (values) {
    transformedValues = {
      name: values.name || '',
      type: getTypeByFoundationValue(values.type),
      pricing_tier: getTierByFoundationValue(values.tier),
      move_in_date: values.moveInDate,
      region: getRegionByFoundationValue(values.region),
      street: values.address,
      city: values.city,
      state: getStateByValue(values.state),
      floor_number: values.floorNumber,
      suite_number: values.suiteNumber,
      rent_sqft: values.size
    }
  }
  return (
    <Modal open={visible} onClose={onClose}>
      <Content>
        <SimpleProjectForm
          submitButtonTitle={submitButtonTitle}
          title={title}
          initialValues={transformedValues}
          onSubmit={onSubmit}
        />
        <Absolute top={24} right={24}>
          <CloseButton color={theme.colors.placeholderText} onClick={onClose} />
        </Absolute>
      </Content>
    </Modal>
  )
}

export class NewProjectModalWithOpener extends React.Component {
  constructor (props) {
    super(props)
    const defaultValues = localStorage.getItem(PROJECT_DATA_LOCAL_STORAGE_KEY) || []
    this.state = {
      values: defaultValues ? JSON.parse(defaultValues) : {},
      visible: false
    }
  }

  openModal = () => {
    this.setState({ visible: true })
  }

  closeModal = () => {
    this.setState({ visible: false })
  }

  handleSubmit = values => {
    const { onSubmit } = this.props
    this.closeModal()
    console.log('values:', values)
    trackAddProject()
    // trackEditProject()
    onSubmit(values)
  }

  render () {
    const { visible, values } = this.state
    const { title } = this.props
    const actionTitle = title || 'Add new project'
    return (
      <React.Fragment>
        <Button py={1} color="primary" onClick={this.openModal}>
          {actionTitle}
        </Button>
        <ProjectModal
          visible={visible}
          submitButtonTitle={'Save project'}
          onClose={this.closeModal}
          title={actionTitle}
          id={'ceba65a6-e7bb-4aa8-8ffc-74db5dfafe87'}
          values={values}
          onSubmit={this.handleSubmit}
        />
      </React.Fragment>
    )
  }
}

ProjectModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  submitButtonTitle: PropTypes.string
}

NewProjectModalWithOpener.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func
}

NewProjectModalWithOpener.defaultProps = {}
ProjectModal.defaultProps = {
  title: 'Edit project'
}

export default NewProjectModalWithOpener
