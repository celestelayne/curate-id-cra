import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, ToggleBadge as ToggleBadgeUnstyled } from '@knotel/cinderblock'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import * as Txt from '../Txt'
// import 'react-tabs/style/react-tabs.scss'
import './react-tabs.css'
import { trackFiltersSwitch } from '../../tracking'

const initialFilters = {
  catalog: {
    venture: true,
    growth: true,
    enterprise: true,
  },
  category: {
    workstations: true,
    seating: true,
    tables: true,
    mobile: true,
    storage: true
  },
  location: {
    inWarehouse: false,
  },
  zone: {
    quiet: false,
    collobaration: false,
    lounge: false,
  },
  dimensions: {
    minWidth: 0,
    maxWidth: 100,
    minHeight: 0,
    maxHeight: 100,
    minDepth: 0,
    maxDepth: 100
  },
  manufacturer: {},
  productline: {},
  market: {
    US: false,
    EU: false,
    BR: false,
  }
}

const ToggleBadge = styled(ToggleBadgeUnstyled)`
  color: ${props => props.theme.colors.text};
`

class TabWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: initialFilters
    }
  }

  _handleChange = (e) => {
    const category = e.target.dataset.category
    const filter = { [e.target.name]: !e.target.selected }
    const newFilters = {
      [category]: {
        ...this.state.filters[category],
        ...filter
      }
    }
    trackFiltersSwitch()
    this.setState({
      filters: {
        ...this.state.filters,
        ...newFilters
      }
    }, () => {
      this.props.onFiltersChanged(this.state.filters)
    })
  }

  componentDidMount () {
    this.props.onFiltersChanged(this.state.filters)
  }

  render () {
    const { filters } = this.state
    return (
      <Box p={2}>
        <Tabs>
          <TabList>
            <Tab><Txt.InfoLabel>Pricing Tier</Txt.InfoLabel></Tab>
            <Tab><Txt.InfoLabel>Category</Txt.InfoLabel></Tab>
            {/* <Tab><Txt.InfoLabel>Location</Txt.InfoLabel></Tab>
            <Tab><Txt.InfoLabel>Zone</Txt.InfoLabel></Tab>
            <Tab><Txt.InfoLabel>Dimensions</Txt.InfoLabel></Tab>
            <Tab><Txt.InfoLabel>Manufacturer</Txt.InfoLabel></Tab>
            <Tab><Txt.InfoLabel>Product Line</Txt.InfoLabel></Tab>
            <Tab><Txt.InfoLabel>Market</Txt.InfoLabel></Tab> */}
          </TabList>
          <TabPanel>
            <ToggleBadge
              name="venture"
              data-category="catalog"
              label="$"
              bg="primary"
              selected={filters.catalog.venture}
              onClick={(e) => this._handleChange(e)}>$
            </ToggleBadge>
            <ToggleBadge
              name="growth"
              data-category="catalog"
              label="$$"
              bg="primary"
              selected={filters.catalog.growth}
              onClick={(e) => this._handleChange(e)}>$$
            </ToggleBadge>
            <ToggleBadge
              name="enterprise"
              data-category="catalog"
              label="$$$"
              bg="primary"
              selected={filters.catalog.enterprise}
              onClick={(e) => this._handleChange(e)}>$$$
            </ToggleBadge>
          </TabPanel>
          <TabPanel>
            <ToggleBadge
              name="workstations"
              data-category="category"
              label="Workstations"
              bg="primary"
              selected={filters.category.workstations}
              onClick={(e) => this._handleChange(e)}>Workstations
            </ToggleBadge>
            <ToggleBadge
              name="seating"
              data-category="category"
              label="Seating"
              bg="primary"
              selected={filters.category.seating}
              onClick={(e) => this._handleChange(e)}>Seating
            </ToggleBadge>
            <ToggleBadge
              name="tables"
              data-category="category"
              label="Tables"
              bg="primary"
              selected={filters.category.tables}
              onClick={(e) => this._handleChange(e)}>Tables
            </ToggleBadge>
            <ToggleBadge
              name="mobile"
              data-category="category"
              label="Mobile"
              bg="primary"
              selected={filters.category.mobile}
              onClick={(e) => this._handleChange(e)}>Mobile
            </ToggleBadge>
            <ToggleBadge
              name="storage"
              data-category="category"
              label="Storage"
              bg="primary"
              selected={filters.category.storage}
              onClick={(e) => this._handleChange(e)}>Storage
            </ToggleBadge>
          </TabPanel>
          {/* <TabPanel>
            <ToggleBadge
              name="inWarehouse"
              data-category="location"
              label="In Warehouse"
              selected={filters.location.inWarehouse}
              onClick={(e) => this._handleChange(e)}>In Warehouse
            </ToggleBadge>
            <ToggleBadge
              name="inWarehouse"
              data-category="location"
              label="Out of Warehouse"
              selected={!filters.location.inWarehouse}
              onClick={(e) => this._handleChange(e)}>Out of Warehouse
            </ToggleBadge>
          </TabPanel>
          <TabPanel style={{opacity: 0.5}}>
            <ToggleBadge>Quiet</ToggleBadge>
            <ToggleBadge>Collobaration</ToggleBadge>
            <ToggleBadge>Lounge</ToggleBadge>
          </TabPanel>
          <TabPanel style={{ opacity: 0.5 }}>
            <Input id="width" type="range" min="0" max="100"
              defaultValue={[8, 64]} />
            <Input id="height" type="range" min="0" max="100"
              defaultValue={[8, 64]} />
            <Input id="depth" type="range" min="0" max="100"
              defaultValue={[8, 64]} />
          </TabPanel>
          <TabPanel style={{ opacity: 0.5 }}>
            <ToggleBadge>Coming</ToggleBadge>
            <ToggleBadge>Soon</ToggleBadge>
          </TabPanel>
          <TabPanel style={{ opacity: 0.5 }}>
            <ToggleBadge>Coming</ToggleBadge>
            <ToggleBadge>Soon</ToggleBadge>
          </TabPanel>
          <TabPanel>
            <ToggleBadge
              name="US"
              data-category="market"
              label="US"
              selected={filters.market.US}
              onClick={(e) => this._handleChange(e)}>🇺🇸
            </ToggleBadge>
            <ToggleBadge
              name="EU"
              data-category="market"
              label="EU"
              selected={filters.market.EU}
              onClick={(e) => this._handleChange(e)}>🇬🇧
            </ToggleBadge>
            <ToggleBadge
              name="BR"
              data-category="market"
              label="BR"
              selected={filters.market.BR}
              onClick={(e) => this._handleChange(e)}>🇧🇷</ToggleBadge>
          </TabPanel> */}

        </Tabs>
      </Box>
    )
  }
}

TabWrapper.propTypes = {
  onFiltersChanged: PropTypes.func
}

TabWrapper.displayName = 'TabWrapper'

export default TabWrapper
