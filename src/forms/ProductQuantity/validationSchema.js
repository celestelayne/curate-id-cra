import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  quantity: Yup.number()
    .integer('Should be integer value')
    .positive('Should be positive value')
    .required('Required'),
})
