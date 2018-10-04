const alpha = 'alpha'
const alphaNum = 'alphaNum'
const between = 'between'
const decimal = 'decimal'
const email = 'email'
const integer = 'integer'
const ipAddress = 'ipAddress'
const macAddress = 'macAddress'
const maxLength = 'maxLength'
const maxValue = 'maxValue'
const minLength = 'minLength'
const minValue = 'minValue'
const numeric = 'numeric'
const required = 'required'
const requiredIf = 'requiredIf'
const requiredUnless = 'requiredUnless'
const sameAs = 'sameAs'
const url = 'url'

export const checkValidity = (value, rules) => {
  // console.log('checkValidity', value, rules )
  const keys = Object.keys(rules)
  let rule = ''
  let isValid = true
  let msgError = ''
  let params = null
  for (let i = 0; i < keys.length; i++) {
    rule = keys[i]
    isValid = rules[rule].isValid(value)
    params = rules[rule].params
    // console.log('VALIDITY')
    // console.log('---', value, isValid, params)
    if (!isValid) break
  }

  if (!isValid) {
    msgError = errorGenerator[rule] ? errorGenerator[rule](params) : ''
  }

  return {isValid: isValid, msgError: msgError};
}

const PreMsg = 'Este campo '

const errorGenerator = {
  [required]: () => PreMsg + 'es obligatorio.',
  [email]: () => PreMsg + 'debe contener un email válido.',
  [url]: () => PreMsg + 'debe contener un URL válido.',
  [integer]: () => PreMsg + 'debe contener un valor entero.',
  [numeric]: () => PreMsg + 'debe contener un numero válido.',
  [between]: (payload) => PreMsg + 'debe estar en el rango de ' + payload.min + ' a ' + payload.max,
  [decimal]: () => PreMsg + 'debe contener un numero decimal.',
  [maxValue]: (payload) => PreMsg + 'debe contener un valor hasta ' + payload.max,
  [minValue]: (payload) => PreMsg + 'debe contener un numero no menor a '  + payload.min,
  [maxLength]: (payload) => PreMsg + 'solo puede contener hasta ' + payload.max + ' caracteres.',
  [minLength]: (payload) => PreMsg + 'debe contener como mínimo ' + payload.min + ' caracteres.',
  [sameAs]: (payload) => PreMsg + 'debe idéntico al campo [' + payload.field + ']',
  [ipAddress]: () => PreMsg + 'debe contener una dirección IP válido.',
  [macAddress]: () => PreMsg + 'debe contener una dirección MAC válido.',
  [alpha]: () => PreMsg + 'debe contener solo letras del alfabeto.',
  [alphaNum]: () => PreMsg + 'debe contener solo letras y/o números.',
}
