import ga from './analytics.js'

export default ({ router, Vue }) => {
  var sessionUser = null
  window.sessionId = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
  function getSessionId () {
    if (!window.githubID) {
      sessionUser = window.sessionId
    } else {
      sessionUser = window.githubID
    }
    return sessionUser
  }
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, getSessionId())
    console.warn(to.path)
    console.log(getSessionId())
    console.log(ga)
  })
  function callEvent (category, action, label) {
    ga.logEvent(category, action, label, getSessionId())
    // console.log('New Event...')
  }
  Vue.prototype.$eventReg = callEvent
}
