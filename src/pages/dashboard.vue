<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-secondary q-mb-md">
      <q-btn
        round
        color="secondary"
        unelevated
        text-color="white"
        icon="las la-sign-out-alt"
        @click="signOutUser"
      />
      <q-toolbar-title align="center">
        <q-avatar>
          <img :src="avatar">
        </q-avatar>
      </q-toolbar-title>
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
            :mask="'x-' + $authUser.user.githubID"
            autofocus
          />
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
                  color="positive"
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
                  color="dark"
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
                  color="dark"
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
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      avatar: '',
      namespaceNewName: ''
    }
  },
  methods: {
    createNameSpace (val, initval) {
      var mutation = 'mutation{ createSpace(name: "' + this.namespaceNewName + '", members:"") { id } }'
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
  mounted () {
    console.log(this.$spaces)
    console.log(this.$q.localStorage.getItem('auth'))
    this.avatar = this.$q.localStorage.getItem('auth').avatar
    console.log(this.$byteSize(13958643712, { units: 'iec' }))
  }
}
</script>
