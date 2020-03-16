// import something here
import byteSize from 'byte-size'
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$byteSize = byteSize
}
