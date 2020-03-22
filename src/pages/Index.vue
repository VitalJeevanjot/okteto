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
      >
        Kubernetes for Developers
      </p>
    </div>
    <div class="row justify-center">
      <p
        class="text-white text-body1"
        style="text-align:center; max-width: 400px;"
      >
        Login with Github, download your credentials, and get full access to
        your Kubernetes namespace.
      </p>
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
          Privacy Policy</a>.
      </p>
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
      this.authBrowser = window.cordova.InAppBrowser.open(
        'https://github.com/login/oauth/authorize?client_id=47867be52b46a2d9d302',
        '_blank',
        'location=no,clearcache=yes,clearsessioncache=yes'
      )
      this.authBrowser.addEventListener('loadstop', this.urlLoading)
    },
    urlLoading (event) {
      var parsedURL = this.$parseUrl(event.url, true)
      if (
        parsedURL.host === 'cloud.okteto.com' ||
        parsedURL.hostname === 'cloud.okteto.com'
      ) {
        const variables = {
          codeRetrieved: parsedURL.query.code
        }
        var query = `
          mutation {
            auth (code: "${variables.codeRetrieved}") {
              id, githubID, namespace, avatar, name, email, token
            }
          }`
        this.$greq('https://cloud.okteto.com/graphql', query)
          .then(data => {
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
          })
          .catch(e => {
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
        user {avatar, buildkit, email, githubID, id, name, namespace, new, onboarded, registry}
      },
      `
      var query2 = `query {
        spaces {id}
      }`
      this.loginClient
        .request(query)
        .then(data => {
          console.log(data)
          this.loginClient
            .request(query2)
            .then(data1 => {
              // getting all spaces ids
              console.log(data1)
              var allSpacesData = []
              for (let i = 0; i < data1.spaces.length; i++) {
                this.loginClient
                  .request(this.query3(data1.spaces[i].id))
                  .then(data => {
                    console.log(data)
                    allSpacesData.push(data.space)
                    if (i === data1.spaces.length - 1) {
                      console.log(allSpacesData)
                      this.$q.loading.hide()
                      this.$spaces.spaces = allSpacesData
                      this.$q.localStorage.set('spaces', allSpacesData)
                      if (this.$route.path !== '/dashboard') {
                        this.$router.push('dashboard')
                      }
                      // and login user to dashboard
                    }
                    // successfully can login now.
                  })
                  .catch(e => {
                    console.log(e)
                    this.$q.loading.hide()
                    this.errorAtReq()
                  })
              }
              // successfully can login now.
            })
            .catch(e => {
              console.log(e)
              this.$q.loading.hide()
              this.errorAtReq()
            })
          // successfully can login now.
        })
        .catch(e => {
          this.$q.loading.hide()
          this.errorAtReq()
        })
    },
    errorAtReq () {
      this.$q.notify({
        message:
          'Error #1: Your token expires please try login again. If this error comes again after login, then report it at okteto support.',
        icon: 'fa fa-exclamation-triangle',
        timeout: 10000,
        position: 'top'
      })
      this.$q.localStorage.remove('auth')
    },
    setupLoginClient () {
      this.loginClient = new GraphQLClient('https://cloud.okteto.com/graphql', {
        headers: {
          Authorization: 'Bearer ' + this.$q.localStorage.getItem('auth').token
        }
      })
      window.loginClient = this.loginClient
    },
    query3 (spaceID) {
      var query = `query {
          space (id: "${spaceID}") {
            apps {
              chart, 
              config, 
              containers {
                command,
                cpu,
                devmode,
                disk,
                endpoints,
                environment,
                error,
                id,
                image,
                memory,
                name,
                port,
                replicas,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
              }, 
              deployments {
                cpu,
                devmode,
                disk,
                endpoints,
                error,
                id,
                memory,
                name,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
              }, 
              devs {
                cpu,
                disk,
                endpoints,
                error,
                id,
                memory,
                name,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
              }, 
              functions {
                cpu,
                devmode,
                disk,
                endpoints,
                error,
                id,
                memory,
                name,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
              }, 
              id, 
              name, 
              output, 
              repo, 
              statefulsets {
                cpu,
                disk,
                endpoints,
                error,
                id,
                memory,
                name,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
              }, 
              status, 
              version, 
              volumes {
                  id,
                  name,
                  size,
                  status
              }
            }, 
            containers {
                command,
                cpu,
                devmode,
                disk,
                endpoints,
                environment,
                error,
                id,
                image,
                memory,
                name,
                port,
                replicas,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
            }, 
            deployments {
                cpu,
                devmode,
                disk,
                endpoints,
                error,
                id,
                memory,
                name,
                status,
                volumes {
                  id,
                  name,
                  size,
                  status
                }
            }, 
            devs {
              cpu,
              disk,
              endpoints,
              error,
              id,
              memory,
              name,
              status,
              volumes {
                id,
                name,
                size,
                status
              }
            }, 
            functions {
              cpu,
              devmode,
              disk,
              endpoints,
              error,
              id,
              memory,
              name,
              status,
              volumes {
                id,
                name,
                size,
                status
              }
            }, 
            id, 
            invited {
              avatar,
              email,
              githubID,
              id,
              name,
              owner
            }, 
            members {
              avatar,
              email,
              githubID,
              id,
              name,
              owner
            },
            quotas {
              hard {
                limitsCPU,
                limitsMemory,
                limitsStorage,
                requestsCPU,
                requestsMemory,
                requestsStorage
              },
              used {
                limitsCPU,
                limitsMemory,
                limitsStorage,
                requestsCPU,
                requestsMemory,
                requestsStorage
              }
            }, 
            statefulsets {
              cpu,
              disk,
              endpoints,
              error,
              id,
              memory,
              name,
              status,
              volumes {
                id,
                name,
                size,
                status
              }
            }, 
            volumes {
              id,
              name,
              size,
              status
            }
          }
        } `
      return query
    }
  },
  mounted () {
    if (this.$q.localStorage.getItem('auth')) {
      this.setupLoginClient()
      this.showLoading()
      this.processRequest()
      // Setting global variable
      console.log('Mounted Index.vue')
    }
    window.spaceQuery = this.query3
    window.showLoading = this.showLoading
    window.processRequest = this.processRequest
    this.$authUser.user = this.$q.localStorage.getItem('auth')
  }
}
</script>
