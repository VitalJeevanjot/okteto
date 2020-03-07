<template>
  <q-page>
    <div class="justify-center row">
      <q-icon
        name="img:statics/okteto-logo-light-h-1.1.svg"
        size="200px"
      />
    </div>
    <div class="row justify-center q-pa-sm">
      <p
        class="text-white text-h4 heading-bold"
        style="text-align: center; max-width: 500px"
      >Kubernetes for Developers</p>
    </div>
    <div class="row justify-center">
      <p
        class="text-white text-body1"
        style="text-align:center; max-width: 400px;"
      >Login with Github, download your credentials, and get full access to your Kubernetes namespace.</p>
    </div>
    <div class="justify-center row q-pt-xs">
      <q-btn
        class="bg-white"
        push
        @click="authorizeUser"
        text-color="primary"
        label="Login with Github"
        icon="fab fa-github"
        style="height: 50px"
      />
    </div>
    <div class="justify-center row q-pa-md">
      <p
        class="text-white terms-regular"
        style="max-width: 300px; text-align:center"
      >
        By proceeding, you agree to the
        <a
          href="https://okteto.com/legal"
          style="text-decoration: none; color:#00D1CA"
        >
          Terms of Service
        </a>
        and acknowledge you have read the
        <a
          href="https://okteto.com/legal"
          style="text-decoration: none; color:#00D1CA"
        >
          Privacy Policy</a>.</p>
    </div>
  </q-page>
</template>

<script>
import { QSpinnerPie } from 'quasar'
import { GraphQLClient } from 'graphql-request'

export default {
  name: 'PageIndex',
  data () {
    return {
      authBrowser: null,
      loginClient: null
    }
  },
  methods: {
    authorizeUser () {
      this.authBrowser = window.cordova.InAppBrowser.open('https://github.com/login/oauth/authorize?client_id=47867be52b46a2d9d302', '_blank', 'location=no,clearcache=yes,clearsessioncache=yes')
      this.authBrowser.addEventListener('loadstop', this.urlLoading)
    },
    urlLoading (event) {
      var parsedURL = this.$parseUrl(event.url, true)
      if (parsedURL.host === 'cloud.okteto.com' || parsedURL.hostname === 'cloud.okteto.com') {
        const variables = {
          codeRetrieved: parsedURL.query.code
        }
        var query = `
          mutation {
            auth (code: "${variables.codeRetrieved}") {
              id, githubID, namespace, avatar, name, email, token
            }
          }`
        this.$greq('https://cloud.okteto.com/graphql', query).then(data => {
          console.log(data.auth.token)
          try {
            this.$q.localStorage.set('auth', data.auth)
          } catch (e) {
            this.$q.notify({
              message: 'Your credentails not saved because of error:' + e,
              icon: 'fa fa-exclamation-triangle'
            })
            // data wasn't successfully saved due to
            // a Web Storage API error
          }
          this.authBrowser.close()
          this.setupLoginClient()
          this.showLoading()
          this.processRequest()
        }).catch(e => {
          this.$q.notify({
            message: 'Error #2: Please Report at Okteto Support.',
            icon: 'fa fa-exclamation-triangle'
          })
        })
      }
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerPie,
        spinnerColor: 'white',
        spinnerSize: 30,
        backgroundColor: 'black'
      })
    },
    processRequest () {
      var query = `query {
            user {email}
      }`
      this.loginClient.request(query).then(data => {
        console.log(data)
        this.$q.loading.hide()
        // successfully can login now.
      }).catch((e) => {
        this.$q.notify({
          message: 'Error #1: Your token expires please try login again. If this error comes again after login, then report it at okteto support.',
          icon: 'fa fa-exclamation-triangle',
          timeout: 10000,
          position: 'top'
        })
        this.$q.localStorage.remove('auth')
        this.$q.loading.hide()
      })
    },
    setupLoginClient () {
      this.loginClient = new GraphQLClient('https://cloud.okteto.com/graphql', {
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('auth').token
        }
      })
    }
  },
  mounted () {
    if (this.$q.localStorage.getItem('auth')) {
      this.setupLoginClient()
      this.showLoading()
      this.processRequest()
      // Setting auth header
    }
  }
}
</script>

<style>
.terms-regular {
  font-family: heebo-regular;
}
.heading-bold {
  font-family: heebo-bold;
}
</style>
