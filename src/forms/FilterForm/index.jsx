import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import styled from 'styled-components'
import { Text, Heading } from '@knotel/cinderblock'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import set from 'lodash.set'

import { CustomCheckbox } from '../../fields'
import * as cartActions from '../../actions/actions'
import theme from '../../theme'

import { Form, InputFieldWrapper } from '../shared'

import filterConfig from './config'

const Title = styled(Heading.h3)`
  font-weight: 600;
  font-size: ${theme.fontSizes[4]}px;
  margin-bottom: ${theme.space[4]}px;
`

const SectionTitle = styled(Text)`
  text-transform: uppercase;
  font-weight: 600;
  font-size: ${theme.fontSizes[1]}px;
  margin-bottom: ${theme.space[3]}px;
  color: ${theme.colors.labelText};
`

const FilterForm = ({ filters, cartActions }) => {
  return (
    <Formik enableReinitialize initialValues={filters}>
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <Title>Filter by</Title>
            {filterConfig.map(section => {
              return (
                <React.Fragment key={section.label}>
                  <SectionTitle>{section.label}</SectionTitle>
                  {section.filters.map(filter => {
                    const name = `${section.key}.${filter.key}`
                    return (
                      <InputFieldWrapper key={`${filter.id}-${section.label}`}>
                        <CustomCheckbox
                          {...filter}
                          name={name}
                          onChange={(name, value) => {
                            setFieldValue(name, value)
                            cartActions.addFilter(set(values, name, value))
                          }}
                          value={values[section.key] && values[section.key][filter.key]}
                        />
                      </InputFieldWrapper>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </Form>
        )
      }}
    </Formik>
  )
}

FilterForm.propTypes = {
  filters: PropTypes.object,
  cartActions: PropTypes.object,
}

FilterForm.defaultProps = {}

function mapStateToProps (state) {
  return {
    filters: state.filters,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)
