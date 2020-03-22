// import something here

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$loginClient = null
  Vue.prototype.$spaces = Vue.observable({ spaces: [] })
  Vue.prototype.$spaceData = Vue.observable({ space: null })
  Vue.prototype.$spaceMembers = Vue.observable({ members: [] })
  Vue.prototype.$authUser = Vue.observable({ user: null })
  Vue.prototype.$ownerOfNamespace = Vue.observable({ owner: null })
}
