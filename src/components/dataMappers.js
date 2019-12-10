import { STATES_LIST, PRICING_TIER_LIST, TYPES_LIST } from '../forms/ProjectForm/data'
import { COUNTRIES } from '../fields/CountryField/countries'

export const getStateByValue = stateValue =>
  STATES_LIST.find(stateObject => stateObject.value === stateValue) || { label: '' }

export const getTierByFoundationValue = foundationValue => {
  switch (foundationValue) {
    case 'VENTURE':
      return PRICING_TIER_LIST[0]
    case 'GROWTH':
      return PRICING_TIER_LIST[1]
    case 'ENTERPRISE':
      return PRICING_TIER_LIST[2]
    default:
      console.log('default')
  }
}

export const getFoundationValueByTier = tier => {
  switch (tier.value) {
    case PRICING_TIER_LIST[0].value:
      return 'VENTURE'
    case PRICING_TIER_LIST[1].value:
      return 'GROWTH'
    case PRICING_TIER_LIST[2].value:
      return 'ENTERPRISE'
    default:
      console.log('default')
  }
}

export const getTypeByFoundationValue = foundationValue =>
  TYPES_LIST.find(type => type.value === foundationValue) || { label: '', value: '' }

export const getRegionByFoundationValue = foundationValue =>
  COUNTRIES.find(country => country.label === foundationValue)
