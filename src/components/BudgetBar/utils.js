import chroma from 'chroma-js'

export const calculateColor = progressValue => {
  const scale = chroma
    .scale(['#2BA84A', '#2BA84A', '#E55812', '#B00020', 'B00020'])
    .mode('lab')
    .domain([0, 0.60, 0.75, 0.95, 1])
  return scale(progressValue)
}
