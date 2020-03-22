// import something here
import { request } from 'graphql-request'
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$greq = request
  Vue.prototype.$loginClient = null
  Vue.prototype.$spaces = Vue.observable({ spaces: [] })
  Vue.prototype.$spaceData = Vue.observable({ space: null })
}
