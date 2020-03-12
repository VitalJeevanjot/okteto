<template>
  <q-page padding>
    <!-- content -->
    <div class="text-warning row justify-center text-h6">
      <p class="heading-bold">Namespaces</p>
    </div>
    <div
      v-for="space in spaces"
      :key="space.id"
      align="center"
      class="q-pa-sm"
    >
      <q-btn
        push
        color="secondary"
        :label="space.id"
        style="width: 300px; height: 50px"
      >
        <q-badge
          color="positive"
          floating
        >{{space.apps.length}}</q-badge>
      </q-btn>
    </div>

  </q-page>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      spaces: []
    }
  },
  methods: {

  },
  mounted () {
    this.spaces = this.$q.localStorage.getItem('spaces')
    console.log(this.spaces)
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
