import { withParams } from './common'
export default (equalTo, field) =>
  withParams(
    { type: 'sameAs', eq: equalTo, field: field },
    (value) => value === equalTo
  )
