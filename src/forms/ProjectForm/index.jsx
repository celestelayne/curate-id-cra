import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import {
  InputField,
  DatePickerField,
  CountryField,
} from '../../fields'

import { calcRentByProjectData } from '../../util'

import {
  Form,
  InputFieldWrapper,
  SectionTitle,
  ShortInputField,
  ShortDropDownField,
  StyledSubmitButton,
  FormTitle,
} from '../shared'

import {
  PRICING_TIER_LIST,
  STATES_LIST,
  TYPES_LIST,
} from './data'
import { validationSchema } from './validationSchema'

const GET_SFDCOPPS = gql`
  query {
    allOpportunities {
      id
      name
      ownerId
    }
    allAvailabilities{
      memberName
      maxHeadCount
      Space{
        opsEstimateSqf
        address
        floorNumber
        city
        state
      }
    }
  }
`

export const ProjectForm = ({ initialValues, onSubmit, title, submitButtonTitle }) => {
  const [sfdcOpps, setSfdcOpps] = useState([])
  const [availabilities, setAvailabilities] = useState([])

  const matchSalesforce = (e, opps) => {
    if (opps.length) {
      opps.filter(opp => {
        return opp.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
    }
  }

  const matchAvailabilities = (e, avails) => {
    if (avails.length) {
      avails.filter(avail => {
        return (avail.Space ? avail.Space.address.toLowerCase().includes(e.target.value.toLowerCase()) : false)
      })
    }
  }

  useEffect(() => {
    // enableFormTracking()
  }, [])
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {
        ({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => {
          const hasErrors = Object.keys(errors).length > 0
          if (hasErrors) {
            console.log('project form validation errors:', errors)
          }

          return (
            <Form onSubmit={handleSubmit}>
              <FormTitle>{title}</FormTitle>
              <SectionTitle>Client information</SectionTitle>
              <InputFieldWrapper>
                <InputField
                  type="text"
                  id="name"
                  name="name"
                  fieldName="Company Name"
                  placeholder="Enter company name"
                  onChange={(e) => {
                    handleChange(e)
                    matchSalesforce(e, sfdcOpps)
                  }}
                  onBlur={handleBlur}
                  touched={touched.name}
                  error={errors.name}
                  value={values.name}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <DatePickerField
                  id="moveInDate"
                  name="moveInDate"
                  placeholder="Move In Date"
                  fieldName="Move In Date"
                  onChange={setFieldValue}
                  onBlur={handleBlur}
                  touched={touched.moveInDate}
                  error={errors.moveInDate}
                  value={values.moveInDate}
                />
                <ShortDropDownField
                  id="tier"
                  name="tier"
                  placeholder="Select"
                  fieldName="Pricing Tier"
                  options={PRICING_TIER_LIST}
                  onChange={setFieldValue}
                  onBlur={handleBlur}
                  touched={touched.tier}
                  error={errors.tier}
                  value={values.tier}
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
                  onChange={(e) => {
                    handleChange(e)
                    matchAvailabilities(e, availabilities)
                  }}
                  onBlur={handleBlur}
                  touched={touched.street}
                  error={errors.street}
                  value={values.street}
                />
              </InputFieldWrapper>
              <InputFieldWrapper>
                <ShortInputField
                  type="text"
                  id="floorNumber"
                  name="floorNumber"
                  placeholder="Floor"
                  fieldName="Floor Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.floorNumber}
                  error={errors.floorNumber}
                  value={values.floorNumber}
                />
                <ShortInputField
                  type="text"
                  id="suiteNumber"
                  name="suiteNumber"
                  fieldName="Suite Number"
                  placeholder="Suite"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.suiteNumber}
                  error={errors.suiteNumber}
                  value={values.suiteNumber}
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
                  id="size"
                  name="size"
                  placeholder="Rentable SQFT"
                  fieldName="Rentable SQFT"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  touched={touched.size}
                  error={errors.size}
                  value={values.size}
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
                      setAvailabilities(data.allAvailabilities)
                      setSfdcOpps(data.allOpportunities)
                      return (
                        <div>
                          Synced with {sfdcOpps.length} Salesforce Opportunities
                           and {availabilities.length} availabilities.
                        </div>
                      )
                    }
                  }}
                </Query>
              </InputFieldWrapper>
              <StyledSubmitButton disabled={hasErrors} right type="submit">
                {submitButtonTitle || 'Save changes'}
              </StyledSubmitButton>
            </Form>
          )
        }
      }
    </Formik>
  )
}

ProjectForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitButtonTitle: PropTypes.string
}

ProjectForm.defaultProps = {}

export default ProjectForm
