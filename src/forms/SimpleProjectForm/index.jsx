import * as React from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'

import styled from 'styled-components'
import { Box, Flex, Label, Text } from '@knotel/cinderblock'

import { Query, Mutation } from 'react-apollo'

import { CREATE_PROJECT_MUTATION, UPDATE_PROJECT_MUTATION, CREATE_ASSIGNMENT_MUTATION } from '../../mutations'
import { ALL_PROJECTS_QUERY, GET_SFDCOPPS } from '../../queries'
import { currentUser } from '../../services/auth'

import { InputField, DatePickerField, CountryField } from '../../fields'

import { getFoundationValueByTier } from '../../components/dataMappers'
import { calcRentByProjectData } from '../../util'

import {
  Form,
  InputFieldWrapper,
  SectionTitle,
  ShortInputField,
  ShortDropDownField,
  StyledSubmitButton,
  FormTitle
} from '../shared'

import { PRICING_TIER_LIST, STATES_LIST, TYPES_LIST } from '../ProjectForm/data'
import { validationSchema } from '../ProjectForm/validationSchema'

const Autocompleter = styled(Box)`
  position: absolute;
  border: 1px solid #ccd;
  padding: 4px;
  background: rgba(255, 255, 255, 0.9);
  top: ${props => (props.opp ? 184 : 487)}px;
  z-index: 100;
  width: 414px;
`

const StyledText = styled(Text)`
  border-bottom: 1px solid #ccd;
  padding: 4px;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`

class SimpleProjectForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpps: false,
      isAvails: false,
      sfdcOpps: [],
      availabilities: [],
      dataLoaded: false,
      filteredOpps: [],
      filteredAvails: []
    }
  }

  setData = data => {
    this.setState(
      {
        sfdcOpps: data.allOpportunities,
        availabilities: data.allAvailabilities
      },
      () => {
        this.setState({
          dataLoaded: true
        })
      }
    )
  }

  defineTier = option => {
    switch (option) {
      case 'Venture':
        return PRICING_TIER_LIST[0]
      case 'Growth':
        return PRICING_TIER_LIST[1]
      case 'Enterprise':
        return PRICING_TIER_LIST[2]
      default:
        return PRICING_TIER_LIST[0]
    }
  }

  matchSalesforce = (e, opps) => {
    if (opps.length) {
      const filteredOpps = opps.filter(opp => opp.name.toLowerCase().includes(e.target.value.toLowerCase()))
      if (filteredOpps.length <= 10) {
        this.setState({ isOpps: true, filteredOpps })
        console.log('opps:', filteredOpps)
      } else {
        this.setState({ isOpps: false })
      }
    }
  }

  matchAvailabilities = (e, avails) => {
    console.log(avails.length, e.target.value.toLowerCase())
    if (avails.length) {
      const filteredAvails = avails.filter(avail => {
        return avail.Space ? avail.Space.address.toLowerCase().includes(e.target.value.toLowerCase()) : false
      })
      if (filteredAvails.length <= 5) {
        this.setState({ isAvails: true, filteredAvails })
        console.log('avails:', filteredAvails)
      } else {
        this.setState({ isAvails: false })
      }
    }
  }

  render () {
    const { initialValues, onSubmit, title, submitButtonTitle, projectId = null } = this.props
    return (
      <Mutation mutation={CREATE_ASSIGNMENT_MUTATION}>
        {createAssignment => (
          <Mutation
            mutation={title === 'Add new project' ? CREATE_PROJECT_MUTATION : UPDATE_PROJECT_MUTATION}
            refetchQueries={[{ query: ALL_PROJECTS_QUERY }]}
            onCompleted={({ createProject: project }) => {
              console.log('xxx', project)
              createAssignment({ variables: { params: { projectId: project.id, profileId: currentUser().id } } })
            }}
          >
            {(mutateProject, { loading }) => {
              return (
                <Formik
                  initialValues={initialValues}
                  onSubmit={payload => {
                    const transformedPayload = {
                      name: payload.name,
                      type: payload.type.value,
                      tier: getFoundationValueByTier(payload.pricing_tier),
                      moveInDate: payload.move_in_date,
                      projectmatesId: 'N/A',
                      sfdcOpportunityId: this.state.oppId,
                      availabilityId: this.state.availId,
                      region: payload.region.label,
                      address: payload.street,
                      city: payload.city,
                      state: payload.state.value,
                      floorNumber: payload.floor_number,
                      suiteNumber: payload.suite_number,
                      size: payload.rent_sqft,
                      sizeUnit: 'SQFT'
                    }
                    mutateProject({ variables: { id: projectId, params: transformedPayload } })
                    onSubmit(transformedPayload)
                  }}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                  }) => {
                    const hasErrors = Object.keys(errors).length > 0
                    if (hasErrors) {
                      console.log('project form validation errors:', errors)
                    }

                    return (
                      <Form onSubmit={handleSubmit} autocomplete="off">
                        <FormTitle>{title}</FormTitle>
                        <SectionTitle>Client Information</SectionTitle>
                        <InputFieldWrapper>
                          <InputField
                            type="text"
                            id="name"
                            name="name"
                            fieldName="Company Name"
                            placeholder="Enter company name"
                            onChange={e => {
                              handleChange(e)
                              this.matchSalesforce(e, this.state.sfdcOpps)
                            }}
                            onBlur={handleBlur}
                            touched={touched.name}
                            error={errors.name}
                            value={values.name}
                          />
                          {this.state.isOpps ? (
                            <Autocompleter opp>
                              {this.state.filteredOpps.map(opp => (
                                <StyledText
                                  onClick={() => {
                                    values.name = opp.name
                                    values.move_in_date = opp.agreementStartDate ? new Date(opp.agreementStartDate) : ''
                                    values.pricing_tier = this.defineTier(opp.furnitureTier)
                                    values.rent_sqft = opp.teamSize * 100
                                    return this.setState({ isOpps: false, oppId: opp.id })
                                  }}
                                >
                                  {opp.name}
                                </StyledText>
                              ))}
                            </Autocompleter>
                          ) : null}
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <DatePickerField
                            id="move_in_date"
                            name="move_in_date"
                            placeholder="Move In Date"
                            fieldName="Move In Date"
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            touched={touched.move_in_date}
                            error={errors.move_in_date}
                            value={values.move_in_date}
                          />
                          <ShortDropDownField
                            id="pricing_tier"
                            name="pricing_tier"
                            placeholder="Select"
                            fieldName="Pricing Tier"
                            options={PRICING_TIER_LIST}
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            touched={touched.pricing_tier}
                            error={errors.pricing_tier}
                            value={values.pricing_tier}
                          />
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <CountryField
                            id="region"
                            name="region"
                            placeholder="Select Region"
                            fieldName="Region"
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            touched={touched.region}
                            error={errors.region}
                            value={values.region}
                          />
                          <ShortDropDownField
                            id="type"
                            name="type"
                            placeholder="Select"
                            fieldName="Project Type"
                            options={TYPES_LIST}
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            touched={touched.type}
                            error={errors.type}
                            value={values.type}
                          />
                        </InputFieldWrapper>

                        <SectionTitle>Knotel Property</SectionTitle>
                        <InputFieldWrapper>
                          <InputField
                            type="text"
                            id="street"
                            name="street"
                            fieldName="Address"
                            placeholder="Street address"
                            onChange={e => {
                              handleChange(e)
                              this.matchAvailabilities(e, this.state.availabilities)
                            }}
                            onBlur={handleBlur}
                            touched={touched.street}
                            error={errors.street}
                            value={values.street}
                          />
                          {this.state.isAvails ? (
                            <Autocompleter>
                              {this.state.filteredAvails.map(avail => (
                                <StyledText
                                  onClick={() => {
                                    values.street = avail.Space.address
                                    values.floor_number = avail.Space.floorNumber
                                    values.suite_number = avail.Space.suiteName
                                    values.city = avail.Space.city
                                    values.state = {
                                      value: avail.Space.state.toLowerCase(),
                                      label: avail.Space.state
                                    }
                                    values.rent_sqft = avail.Space.rentableSqf
                                    console.log('state:', avail.Space.state, 1)
                                    return this.setState({
                                      availId: avail.Space.address,
                                      isAvails: false
                                    })
                                  }}
                                >
                                  {avail.Space.address} {avail.Space.floorNumber} {avail.Space.suiteName}
                                </StyledText>
                              ))}
                            </Autocompleter>
                          ) : null}
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <ShortInputField
                            type="text"
                            id="floor_number"
                            name="floor_number"
                            placeholder="Floor"
                            fieldName="Floor Number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.floor_number}
                            error={errors.floor_number}
                            value={values.floor_number}
                          />
                          <ShortInputField
                            type="text"
                            id="suite_number"
                            name="suite_number"
                            fieldName="Suite Number"
                            placeholder="Suite"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.suite_number}
                            error={errors.suite_number}
                            value={values.suite_number}
                          />
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <InputField
                            type="text"
                            id="city"
                            name="city"
                            placeholder="City"
                            fieldName="City"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.city}
                            error={errors.city}
                            value={values.city}
                          />
                          <ShortDropDownField
                            id="state"
                            name="state"
                            placeholder="State"
                            fieldName="State"
                            options={STATES_LIST}
                            onChange={setFieldValue}
                            onBlur={handleBlur}
                            touched={touched.state}
                            error={errors.state}
                            value={values.state}
                            width={1 / 3}
                          />
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <ShortInputField
                            type="number"
                            id="rent_sqft"
                            name="rent_sqft"
                            placeholder="Rentable SQFT"
                            fieldName="Rentable SQFT"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.rent_sqft}
                            error={errors.rent_sqft}
                            value={values.rent_sqft}
                          />
                          <InputField
                            readOnly
                            type="text"
                            id="budget"
                            name="budget"
                            fieldName="Budget"
                            value={calcRentByProjectData(values)}
                          />
                        </InputFieldWrapper>
                        <InputFieldWrapper>
                          <Query query={GET_SFDCOPPS}>
                            {({ loading, error, data }) => {
                              if (loading) return <div>Fetching...</div>
                              if (error) return <div>Error</div>
                              if (data) {
                                if (this.state.dataLoaded) {
                                  return (
                                    <Flex width={1}>
                                      <Box width={[1, 1 / 2]}>
                                        <Label>
                                          {this.state.oppId
                                            ? `✅ Selected SFDC ${this.state.oppId}`
                                            : 'No Opp Id Selected'}
                                        </Label>
                                        <Label>
                                          {this.state.availId
                                            ? `✅ Selected ${this.state.availId}`
                                            : 'No Availability Selected'}
                                        </Label>
                                      </Box>
                                    </Flex>
                                  )
                                } else {
                                  this.setData(data)
                                  return <div>Loading...</div>
                                }
                              }
                            }}
                          </Query>
                        </InputFieldWrapper>
                        <StyledSubmitButton disabled={hasErrors || loading} right type="submit">
                          {submitButtonTitle || 'Save changes'}
                        </StyledSubmitButton>
                      </Form>
                    )
                  }}
                </Formik>
              )
            }}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

SimpleProjectForm.propTypes = {
  projectId: PropTypes.string,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitButtonTitle: PropTypes.string
}

SimpleProjectForm.defaultProps = {}

export default SimpleProjectForm
