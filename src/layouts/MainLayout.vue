<template>
  <q-layout
    view="lHh Lpr lFf"
    class="bg-primary"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { colors } from 'quasar'
colors.setBrand('primary', '#232935')
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
