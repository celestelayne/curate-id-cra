export const colorConverter = (red, green, blue, alpha) => {
  const newRed = Number.parseFloat(red / 255).toFixed(3)
  const newGreen = Number.parseFloat(green / 255).toFixed(3)
  const newBlue = Number.parseFloat(blue / 255).toFixed(3)
  return { red: newRed, green: newGreen, blue: newBlue, alpha: alpha || 1.0 }
}

export const getProjectDataFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('project-data'))
  } catch (e) {
    return {}
  }
}

export default colorConverter
