import { getTierByFoundationValue, getTypeByFoundationValue } from '../components/dataMappers'

export const getFormatter = type => {
  let options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }
  let locale = 'en-US'
  switch (type) {
    case 'F.US':
      locale = 'en-US'
      break
    case 'F.EU':
      locale = 'en-UK'
      options = {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
      }
      break
    case 'F.BR': // TODO: Define these
      locale = 'pt-BR'
      options = {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      }
      break
    default:
      locale = 'en-US'
  }

  // Further Docs: https://www.currency-iso.org/dam/downloads/lists/list_one.xml
  const formatter = new Intl.NumberFormat(locale, options)
  return formatter
}

export const formatCurrency = (amount, type) => {
  // Further Docs: https://www.currency-iso.org/dam/downloads/lists/list_one.xml
  const formatter = getFormatter(type)
  return formatter.format(amount / 100) // Cents to Dollars
}

export const formatProgress = value => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return 0
  }

  if (value <= 0) {
    return 0
  }

  if (value >= 100) {
    return 100
  }

  return value
}

export const calcRentByProjectData = (data, options = { toCurrency: true }) => {
  const rentSqft = data['rent_sqft']
  const pricingTier = data['pricing_tier']

  if (Number.isInteger(rentSqft) && Number.isInteger(pricingTier && pricingTier.value)) {
    const budget = rentSqft * pricingTier.value
    if (options.toCurrency) {
      return formatCurrency(budget * 0.9)
    }

    return budget * 0.9
  }

  if (options.toCurrency) {
    return formatCurrency(0)
  }

  return 0
}

export const calcRentByFoundationData = (data, options = { toCurrency: true }) => {
  const rentSqft = data.size
  const pricingTier = getTierByFoundationValue(data.tier)
  const projectType = getTypeByFoundationValue(data.type).value

  if (Number.isInteger(rentSqft) && Number.isInteger(pricingTier && pricingTier.value)) {
    const sqCoeff = projectType === 'REFIT' ? 6 : pricingTier.value
    const budget = rentSqft * sqCoeff * 0.9

    if (options.toCurrency) {
      return formatCurrency(budget)
    }

    return budget
  }

  if (options.toCurrency) {
    return formatCurrency(0)
  }

  return 0
}

export const productVariantFilter = (products, productName) => {
  if (typeof productName === 'string') {
    if (productName.includes('-')) {
      const subProductName = productName.match(/^(([A-Za-z]+\s))+((.+))?-/)
      if (subProductName && subProductName.length) {
        const kitCatalog = subProductName[0] // .substring(0, subProductName.length - 1)
        return products
          .filter(product => product.name.includes(kitCatalog) && product.name !== productName)
          .map(item => ({ ...item, kitCatalog }))
      } else {
        return false
      }
    }

    const subProductName = productName.match(/^(([A-Za-z]+\s))+((.+))?/)[0]
    return products
      .filter(product => product.name.includes(subProductName))
      .map(item => ({ ...item, kitCatalog: subProductName.replace('-', '') }))
  }
}

export const hexToRgb = hex => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)},
      ${parseInt(result[2], 16)},
      ${parseInt(result[3], 16)}`
    : null
}

export const extractConfigByHash = hash => {
  if (hash === '#archived') {
    return { listName: 'archived', title: 'Archived Projects' }
  } else if (hash === '#my') {
    return { listName: 'personal', title: 'My Projects' }
  }
  return { listName: 'all', title: 'All Projects' }
}

export const checkFiltersEmptyStatement = filters => {
  const catalogs = filters.catalog
  const categories = filters.category

  const categoriesKeys = Object.keys(categories)
  const catalogKeys = Object.keys(catalogs)

  for (let i = 0; i < categoriesKeys.length; i++) {
    if (categories[categoriesKeys[i]]) {
      return false
    }
  }

  for (let i = 0; i < catalogKeys.length; i++) {
    if (catalogs[catalogKeys[i]]) {
      return false
    }
  }

  return true
}

export const prepareFilters = filters => {
  const catalogs = filters.catalog
  const categories = filters.category

  const catalogKeys = Object.keys(catalogs)
  const categoriesKeys = Object.keys(categories)

  let havePricingTier = false
  let haveCategories = false

  for (let i = 0; i < catalogKeys.length; i++) {
    if (catalogs[catalogKeys[i]]) {
      havePricingTier = true
      break
    }
  }

  for (let i = 0; i < categoriesKeys.length; i++) {
    if (categories[categoriesKeys[i]]) {
      haveCategories = true
      break
    }
  }

  if (havePricingTier && !haveCategories) {
    return {
      catalogs,
      categories: {
        workstations: true,
        seating: true,
        tables: true,
        mobile: true,
        storage: true
      }
    }
  } else if (!havePricingTier && haveCategories) {
    return {
      catalogs: {
        venture: true,
        growth: true,
        enterprise: true
      },
      categories
    }
  }

  return filters
}

export const calculateBaselineBudget = (projectType = '', rentSqft, tierCoeff) =>
  projectType === 'REFIT' ? 6 * rentSqft : tierCoeff * rentSqft

export const calculateAllowance = baselineBudget => baselineBudget * 0.1

export const calculateBudgetUpgrades = itemsToUpgrade =>
  itemsToUpgrade.reduce((acc, item) => (acc += item.productTotalCost), 0) * 1.2
