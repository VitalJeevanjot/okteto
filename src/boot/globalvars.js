// import something here

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$loginClient = null
  Vue.prototype.$spaces = Vue.observable({ spaces: [] })
  Vue.prototype.$spaceData = Vue.observable({ space: null })
  Vue.prototype.$spaceMembers = Vue.observable({ members: [] })
  Vue.prototype.$authUser = Vue.observable({ user: null })
  Vue.prototype.$ownerOfNamespace = Vue.observable({ user: '', owner: null })
  Vue.prototype.$helmRepos = Vue.observable({ repos: null })
  Vue.mixin({
    methods: {
      upcomingFeatures (feature) {
        if (feature === 'deploy') {
          this.$q.notify({ message: 'Deploying apps is an upcoming feature', color: 'orange', icon: 'hourglass_full', position: 'top' })
        }
        if (feature === 'moreAboutApp') {
          this.$q.notify({ message: 'More about components and component logs are upcoming features', color: 'secondary', icon: 'hourglass_full', position: 'top' })
        }
      },
      getProgressColor (percent) {
        // console.log(percent)
        if (percent <= 0.75) {
          return 'positive'
        } else if (percent > 0.75 && percent <= 0.9) {
          return 'dark'
        } else {
          return 'red-8'
        }
      }
    }
  }) // to get upcoming feature function
}
