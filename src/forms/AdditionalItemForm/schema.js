import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  vendor: Yup.string().required('Required'),
  color: Yup.string().required('Required'),
  dimensions: Yup.string().required('Required'),
  hyperlink: Yup.string()
    .url('Enter valid URL')
    .required('Required'),
  price: Yup.string()
    .matches(/([$]\d+\.\d{1,2})/)
    .required('Required'),
  quantity: Yup.number()
    .integer()
    .positive('Should be positive number')
    .required('Required')
})
