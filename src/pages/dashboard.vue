<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-secondary q-mb-md">
      <q-btn
        round
        color="secondary"
        unelevated
        text-color="white"
        icon="las la-sign-out-alt"
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
          title="Name"
          @save="createNameSpace"
        >
          <q-input
            dark
            color="white"
            v-model="namespaceNewName"
            dense
            autofocus
            counter
          />
        </q-popup-edit>
      </q-btn>
    </q-toolbar>

    <!-- namespaces -->

    <div class="text-warning row justify-center text-h6">
      <p class="heading-bold">Namespaces ({{spaces.length}})</p>
    </div>
    <div class="q-pa-sm row justify-center">
      <q-list
        dense
        padding
        v-for="space in spaces"
        :key="space.id"
        class="rounded-borders bg-secondary q-ma-sm"
        style="max-width: 600px; width: 90vw"
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
            <q-item>
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
      spaces: [],
      avatar: '',
      namespaceNewName: ''
    }
  },
  methods: {
    createNameSpace () {
    },
    openNamespace (id) {
      console.log(id)
      this.$router.push('namespace/' + id)
    }

  },
  mounted () {
    this.spaces = this.$q.localStorage.getItem('spaces')
    console.log(this.spaces)
    console.log(this.$q.localStorage.getItem('auth'))
    this.avatar = this.$q.localStorage.getItem('auth').avatar
    console.log(this.$byteSize(13958643712, { units: 'iec' }))
  }
}
</script>
