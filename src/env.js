// Before the app is loaded, a file env-config.js is requested and run
// env-config.js adds an object _env_ with a propery KNOT_ENV
// When developing locally, env-config.js is not served, so window._env_ is undefined
// Otherwise, window._env_.KNOT_ENV will be the knot environment (i.e. 'dev', 'test', 'stage', or 'prod')
function getConfig () {
  // return window.KNOT_CONFIG
  return process.env
}

const envConfig = getConfig()

export default envConfig