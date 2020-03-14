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
      />
    </q-toolbar>

    <!-- namespaces -->

    <div class="text-warning row justify-center text-h6">
      <p class="heading-bold">Namespaces ({{spaces.length}})</p>
    </div>
    <div
      v-for="space in spaces"
      :key="space.id"
      class="q-pa-sm row justify-center"
    >
      <q-btn
        push
        class="q-mr-sm"
        color="secondary"
        round
        text-color="white"
        icon="las la-trash"
        style="width: 50px; height: 50px"
      />
      <q-btn
        push
        color="white"
        text-color="secondary"
        :label="space.id"
        style="width: 260px;"
      >
        <q-badge
          color="positive"
          floating
        >{{space.apps.length}}</q-badge>
        <q-badge
          color="blue"
          floating
          class="q-mr-lg"
        >{{space.deployments.length}}</q-badge>
      </q-btn>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      spaces: [],
      avatar: ''
    }
  },
  methods: {

  },
  mounted () {
    this.spaces = this.$q.localStorage.getItem('spaces')
    console.log(this.spaces)
    console.log(this.$q.localStorage.getItem('auth'))
    this.avatar = this.$q.localStorage.getItem('auth').avatar
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
