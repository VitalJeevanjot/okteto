// import something here
var yaml = require('js-yaml')
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$yaml = yaml
}
