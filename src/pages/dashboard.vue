<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-secondary q-mb-md">
      <q-btn
        push
        round
        color="secondary"
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
        push
        color="secondary"
        text-color="white"
        icon="las la-plus"
      >
        <q-popup-edit
          buttons
          v-model="namespaceNewName"
          title="Name"
          @save="createNameSpace"
        >
          <q-input
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
        padding
        class="rounded-borders bg-white"
        style="max-width: 550px; min-width: 310px"
      >

        <q-item
          clickable
          v-ripple
          v-for="space in spaces"
          :key="space.id"
        >
          <q-item-section
            avatar
            top
          >
            <q-avatar
              color="secondary"
              text-color="white"
            >
              <img :src="space.members[0].avatar">
            </q-avatar>

          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{space.id}}</q-item-label>
            <q-item-label class="text-grey-8">Used Quota:</q-item-label>
            <q-linear-progress
              size="20px"
              :value="space.quotas.used.limitsStorage/space.quotas.hard.limitsStorage"
              class="bg-grey-3 q-mt-sm"
              color="positive"
              rounded
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  text-color="black"
                  :label="'Disk: ' + $byteSize(parseInt(space.quotas.used.limitsStorage), { units: 'iec' })"
                />
              </div>
            </q-linear-progress>
            <q-linear-progress
              size="20px"
              :value="space.quotas.used.limitsMemory/space.quotas.hard.limitsMemory"
              class="bg-grey-3 q-mt-sm"
              color="positive"
              rounded
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  text-color="black"
                  :label="'Memory: ' + $byteSize(parseInt(space.quotas.used.limitsMemory), { units: 'iec' })"
                />
              </div>
            </q-linear-progress>
            <q-linear-progress
              size="20px"
              :value="space.quotas.used.limitsCPU/space.quotas.hard.limitsCPU"
              class="bg-grey-3 q-mt-sm"
              color="positive"
              rounded
            >
              <div class="absolute-full flex flex-center">
                <q-badge
                  color="white"
                  text-color="black"
                  :label="'CPU: ' + space.quotas.used.limitsCPU / 1000"
                />
              </div>
            </q-linear-progress>
          </q-item-section>

          <q-item-section side>
            <q-badge color="positive">{{space.apps.length}}</q-badge>
            <q-badge
              color="blue"
              class="q-mt-sm"
            >{{space.deployments.length}}</q-badge>
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
