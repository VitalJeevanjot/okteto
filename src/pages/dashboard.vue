<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-page padding>
      <q-toolbar class="bg-primary text-secondary q-mb-md">
        <q-btn
          round
          color="secondary"
          unelevated
          text-color="white"
          icon="las la-sign-out-alt"
          @click="signOutUserConfirmation"
        />
        <q-toolbar-title align="center">
          <q-avatar class="q-ml-sm">
            <img :src="avatar">
          </q-avatar>
        </q-toolbar-title>
        <q-btn
          round
          unelevated
          color="secondary"
          size="sm"
          text-color="white"
          :loading="startRefresh"
          icon="sync"
          @click="refresh"
          class="q-mr-sm"
        />
        <q-btn
          round
          unelevated
          color="secondary"
          text-color="white"
          icon="las la-plus"
        >
          <q-popup-edit
            buttons
            v-model="namespaceNewName"
            content-class="bg-negative text-white"
            color="white"
            title="New namespace"
            label-set="Create"
            @save="createNameSpace"
          >
            <q-input
              type="text"
              dark
              color="white"
              maxlength="253"
              v-model="namespaceNewName"
              dense
              reverse-fill-mask
              mask="x"
              autofocus
            >
              <template v-slot:append>
                -{{$authUser.user.githubID}}
              </template>
            </q-input>
          </q-popup-edit>
        </q-btn>
      </q-toolbar>

      <!-- namespaces -->

      <div class="text-warning row justify-center text-h6">
        <p class="heading-bold">Namespace ({{this.$spaces.spaces.length}})</p>
      </div>
      <div class="q-pa-sm row justify-center">
        <q-list
          dense
          padding
          v-for="space in $spaces.spaces"
          :key="space.id"
          transition-show="rotate"
          class="rounded-borders bg-secondary q-ma-sm"
          style="max-width: 600px; width: 95%;"
        >

          <q-item
            clickable
            v-ripple
            @click="openNamespace(space.id)"
          >

            <q-item-section>
              <q-item-label
                lines="1"
                align="center"
                class="text-h6 text-white"
              >{{space.id}}</q-item-label>
              <q-item v-if="space.quotas">
                <q-item-section
                  class="ellipsis"
                  lines="1"
                >
                  <div
                    class="text-white text-caption"
                    style="font-size: 2vw"
                  >
                    {{'Disk: ' + $byteSize(parseInt(space.quotas.used.limitsStorage), { units: 'iec' })}}
                  </div>
                  <q-linear-progress
                    :value="space.quotas.used.limitsStorage/space.quotas.hard.limitsStorage"
                    class="bg-info"
                    :color="getProgressColor(space.quotas.used.limitsStorage/space.quotas.hard.limitsStorage)"
                    rounded
                  >
                  </q-linear-progress>
                </q-item-section>
                <q-item-section
                  lines="1"
                  class="ellipsis"
                >
                  <div
                    class="text-white text-caption"
                    style="font-size: 2vw"
                  >
                    {{'Mem: ' + $byteSize(parseInt(space.quotas.used.limitsMemory), { units: 'iec' })}}
                  </div>
                  <q-linear-progress
                    :value="space.quotas.used.limitsMemory/space.quotas.hard.limitsMemory"
                    class="bg-info"
                    :color="getProgressColor(space.quotas.used.limitsMemory/space.quotas.hard.limitsMemory)"
                    rounded
                  >
                  </q-linear-progress>
                </q-item-section>
                <q-item-section>
                  <div
                    class="text-white text-caption"
                    style="font-size: 2vw"
                  >
                    {{'CPU: ' + space.quotas.used.limitsCPU / 1000}}
                  </div>
                  <q-linear-progress
                    :value="space.quotas.used.limitsCPU/space.quotas.hard.limitsCPU"
                    class="bg-info"
                    :color="getProgressColor(space.quotas.used.limitsCPU/space.quotas.hard.limitsCPU)"
                    rounded
                  >
                  </q-linear-progress>
                </q-item-section>
              </q-item>
            </q-item-section>
          </q-item>
        </q-list>

      </div>

    </q-page>
  </q-pull-to-refresh>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      avatar: '',
      namespaceNewName: '',
      startRefresh: false
    }
  },
  methods: {
    refresh (done) {
      window.processRequest()
      this.startRefresh = true
      setTimeout(() => {
        this.$q.notify({ icon: 'sync', color: 'positive', message: 'Refresh done', position: 'top', timeout: 1500 })
        this.startRefresh = false
        done()
      }, 2500)
    },
    signOutUserConfirmation () {
      this.$q.dialog({
        title: 'Sign Out',
        message: 'You are about to sign out from your account!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.signOutUser()
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    createNameSpace (val, initval) {
      var mutation = 'mutation{ createSpace(name: "' + this.namespaceNewName + '-' + this.$authUser.user.githubID + '", members:"") { id } }'
      window.loginClient.request(mutation).then(data => {
        console.log(data)
        this.$q.loading.hide()
        this.namespaceNewName = ''
        window.processRequest()
        this.$q.notify({
          message: 'New namespace added.',
          icon: 'done',
          timeout: 3000,
          color: 'positive',
          position: 'top'
        })
      }).catch((e) => {
        this.$q.notify({
          message: 'Failed to create namespace.',
          icon: 'fa fa-exclamation-triangle',
          timeout: 5000,
          color: 'red',
          position: 'top'
        })
        console.log(e.message)
      })
    },
    openNamespace (id) {
      console.log('on dashboard: ' + id)
      this.$router.push('namespace/' + id)
    },
    signOutUser () {
      console.log('signout user')
      this.$q.localStorage.remove('auth')
      this.$router.back()
    }
  },
  created () {
    clearInterval(window.timer)
  },
  mounted () {
    console.log(this.$spaces)
    console.log(this.$q.localStorage.getItem('auth'))
    this.avatar = this.$q.localStorage.getItem('auth').avatar
    console.log(this.$byteSize(13958643712, { units: 'iec' }))
  }
}
</script>
