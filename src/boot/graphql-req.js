// import something here
import { request } from 'graphql-request'
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$greq = request
  Vue.prototype.$loginClient = null
}
