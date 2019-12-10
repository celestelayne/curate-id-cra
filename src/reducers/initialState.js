export default {
  cart: {
    products: [],
    additionalProducts: [],
    totalCost: 0,
    totalBudget: 0,
    project: null,
  },
  filters: {
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
      US: true,
      EU: false,
      BR: false,
    }
  },
  projects: {
    selectedProject: null,
    archived: [],
    personal: [],
    all: [],
  }
}
