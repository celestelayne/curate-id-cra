const depSnowplow = (props) => {
  console.log('Deprecated Tracking:', ...props)
}
const sp = {
  trackStructEvent: depSnowplow
}

const Category = {
  Homepage: 'homepage',
  Cart: 'cart',
  Product: 'product',
  Project: 'project',
  User: 'user'
}

const Action = {
  DomainInfo: 'USER_DOMAIN_INFORMATION',
  ViewProductListing: 'PRODUCT_LISTING_VIEWED',
  ViewProductDetail: 'PRODUCT_DETAIL_VIEWED',
  ViewProjectListing: 'PROJECT_LISTING_VIEWED',
  ViewProjectDetail: 'PROJECT_DETAIL_VIEWED',
  ViewCart: 'PRODUCT_CART_VIEWED',
  ClickProductCard: 'PRODUCT_CARD_CLICKED',
  ClickLogo: 'HOMEPAGE_LOGO_CLICKED',
  AddProductToCart: 'PRODUCT_ADD_TO_CART_CLICKED',
  RemoveProductFromCart: 'PRODUCT_REMOVE_FROM_CART_CLICKED',
  QuantityChanged: 'USER_QUANTITY_CHANGED',
  HideFilters: 'USER_HIDE_FILTERS',
  ShowFilters: 'USER_SHOW_FILTERS',
  FiltersSwitch: 'USER_FILTER_SWITCH',
  AddProject: 'USER_ADD_PROJECT',
  EditProject: 'USER_EDIT_PROJECT',
  ArchiveProject: 'USER_ARCHIVE_PROJECT',
  DeleteProject: 'USER_DELETE_PROJECT',
  ExportToGoogleSheets: 'EXPORT_TO_GOOGLE_SHEETS'
}

const generatePriceContext = data => ({
  schema: sp.customSchemas.price,
  data
})

export const trackUserDomainInfo = (id) => sp.trackStructEvent(Category.User, Action.DomainInfo, 'id', id)

export const trackProductListingView = () => sp.trackStructEvent(Category.Product, Action.ViewProductListing)

export const trackProductDetailView = productId =>
  sp.trackStructEvent(Category.Product, Action.ViewProductDetail, 'Product id', productId)

export const trackProjectListingView = () => sp.trackStructEvent(Category.Project, Action.ViewProjectListing)

export const trackProjectDetailView = projectId =>
  sp.trackStructEvent(Category.Project, Action.ViewProjectDetail, 'Project id', projectId)

export const trackProductCartView = () => sp.trackStructEvent(Category.Cart, Action.ViewCart)

export const trackProductCardClick = productId =>
  sp.trackStructEvent(Category.Product, Action.ClickProductCard, 'Product id', productId)

export const trackHomepageLogoClick = () => sp.trackStructEvent(Category.Homepage, Action.ClickLogo)

export const trackAddProductToCart = (productId, quantity, price) => {
  sp.trackStructEvent(Category.Product, Action.AddProductToCart, 'Product id', productId, quantity, [
    generatePriceContext({ price })
  ])
}

export const trackRemoveProductFromCart = (productId, quantity, price) => {
  sp.trackStructEvent(Category.Product, Action.RemoveProductFromCart, 'Product id', productId, quantity, [
    generatePriceContext({ price })
  ])
}

export const trackQuantityChanged = (productId, quantity) => {
  sp.trackStructEvent(Category.User, Action.QuantityChanged, 'Product id', productId, quantity)
}

export const trackFiltersHide = () => sp.trackStructEvent(Category.User, Action.HideFilters)
export const trackFiltersShow = () => sp.trackStructEvent(Category.User, Action.ShowFilters)
export const trackFiltersSwitch = () => sp.trackStructEvent(Category.User, Action.FiltersSwitch)
export const trackExportToGoogleSheets = () => sp.trackStructEvent(Category.User, Action.ExportToGoogleSheets)

export const trackAddProject = () => sp.trackStructEvent(Category.User, Action.AddProject)
export const trackEditProject = () => sp.trackStructEvent(Category.User, Action.EditProject)
export const trackArchiveProject = () => sp.trackStructEvent(Category.User, Action.ArchiveProject)
export const trackDeleteProject = () => sp.trackStructEvent(Category.User, Action.DeleteProject)
