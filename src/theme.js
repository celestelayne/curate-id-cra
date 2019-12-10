const createMediaQuery = n => `@media screen and (min-width:${n})`

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get () {
        return this[i]
      }
    })
  )

const breakpoints = [32, 40, 48, 64].map(n => n + 'em')

const mediaQueries = breakpoints.map(createMediaQuery)

const aliases = ['sm', 'md', 'lg', 'xl']

addAliases(breakpoints, aliases)
addAliases(mediaQueries, aliases)

const space = [0, 4, 8, 16, 32, 64, 128]

const font = `'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif`

const fontSizes = [12, 14, 16, 20, 24, 32, 40, 56, 72]

const medium = 400
const semiBold = 600
const bold = 700
// alias
const regular = medium

// styled-system's `fontWeight` function can hook into the `fontWeights` object
const fontWeights = {
  medium,
  semiBold,
  bold,
  // alias
  regular
}

const lineHeights = {
  standard: 1.5,
  display: 1.25
}

const letterSpacings = {
  normal: 'normal',
  caps: '0.025em'
}

// color palette
const black = '#000'
const white = '#fff'
const text = '#001833'
const lightBlue = '#C7EAFB'
const blue = '#1c7eb0'
const darkBlue = '#001B50'
const lightGray = '#f4f6f8'
const borderGray = '#c0cad5'
const gray = '#4f6f8f'
const darkGray = '#364049'
const lightGreen = '#ecf7ec'
const green = '#0a0'
const darkGreen = '#060'
const lightRed = '#fbebeb'
const red = '#C00'
const darkRed = '#800'
const orange = '#f68013'
const darkOrange = '#f06f20'
const lightPurple = '#CA55DF'
const purple = '#961CAD'
const darkPurple = '#283982'
const yellow = '#fedc2a'
const lightYellow = '#fff3c0'
const semiGray = '#455A64'
const monza = '#B00020'
const burgundy = '#8F001A'
const lynch = '#607D8B'

const coral = '#EE4266'
const mint = '#1ABC9C'
const sunrise = '#EDB506'

const labelText = '#66788B'
const placeholderText = '#919EAB'
const disabled = '#DAE0E9'

const error = red
const success = mint
const danger = sunrise

const primary = blue
const secondary = purple
const tertiary = monza

const colors = {
  black,
  white,
  text,
  blue,
  lightBlue,
  darkBlue,
  gray,
  lightGray,
  borderGray,
  darkGray,
  green,
  lightGreen,
  darkGreen,
  red,
  lightRed,
  darkRed,
  orange,
  darkOrange,
  purple,
  lightPurple,
  darkPurple,
  yellow,
  lightYellow,
  coral,
  mint,
  sunrise,
  labelText,
  placeholderText,
  disabled,
  semiGray,
  // contextual
  success,
  error,
  danger,
  burgundy,
  lynch,
  tertiary,
  secondary,
  primary
}

// styled-system's `borderRadius` function can hook into the `radii` object/array
const radii = [0, 2, 6]
const radius = '2px'

const maxContainerWidth = '1280px'

// boxShadows
const boxShadows = [
  `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`
]

// animation duration
const duration = {
  fast: `150ms`,
  normal: `300ms`,
  slow: `450ms`,
  slowest: `600ms`
}

// animation easing curves
const easeInOut = 'cubic-bezier(0.5, 0, 0.25, 1)'
const easeOut = 'cubic-bezier(0, 0, 0.25, 1)'
const easeIn = 'cubic-bezier(0.5, 0, 1, 1)'

const timingFunctions = {
  easeInOut,
  easeOut,
  easeIn
}

// animation delay
const transitionDelays = {
  small: `60ms`,
  medium: `160ms`,
  large: `260ms`,
  xLarge: `360ms`
}

const theme = {
  breakpoints,
  mediaQueries,
  space,
  font,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  colors,
  radii,
  radius,
  boxShadows,
  maxContainerWidth,
  duration,
  timingFunctions,
  transitionDelays
}

export default theme
