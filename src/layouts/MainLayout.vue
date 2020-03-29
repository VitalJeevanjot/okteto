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
colors.setBrand('negative', '#16191F')
colors.setBrand('info', '#373e4d')
colors.setBrand('dark', '#e3c550')
export default {
  name: 'MainLayout',
  data () {
    return {}
  },
  mounted () {
    window.plugins.OneSignal.setLogLevel({ logLevel: 6, visualLevel: 0 })

    var notificationOpenedCallback = function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData))
    }
    window.plugins.OneSignal
      .startInit('883b6dce-2337-4ecb-8652-f1f97d715c6d')
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit()
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
