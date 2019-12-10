import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  street: Yup.string()
    .required('Required'),
  floorNumber: Yup.string(),
  suiteNumber: Yup.string(),
  size: Yup.number(),
  moveInDate: Yup.date(),
  tier: Yup.string(),
  state: Yup.string().required('Required'),
  region: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
})
