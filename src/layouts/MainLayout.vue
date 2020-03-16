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
colors.setBrand('secondary', '#1E222B')
colors.setBrand('warning', '#808ca9')
colors.setBrand('positive', '#04A29E')
export default {
  name: 'MainLayout',
  data () {
    return {}
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
