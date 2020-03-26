import ga from './analytics.js'

export default ({ router, Vue }) => {
  window.sessionId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, window.sessionId)
    console.warn(to.path)
    console.log(window.sessionId)
    console.log(ga)
  })
  function callEvent (category, action, label) {
    ga.logEvent(category, action, label, window.sessionId)
    // console.log('New Event...')
  }
  Vue.prototype.$eventReg = callEvent
}
