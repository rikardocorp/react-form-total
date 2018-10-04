/* istanbul ignore next */

const withParams = require('./withParamsBrowser').withParams


// VUE JS VERSION
// const withParams =
//   process.env.BUILD === 'web'
//     ? require('./withParamsBrowser').withParams
//     : require('./params').withParams
//
export default withParams
