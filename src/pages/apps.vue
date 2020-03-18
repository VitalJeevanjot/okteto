<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-secondary">
      <q-btn
        v-ripple
        round
        color="secondary"
        text-color="white"
        icon="las la-arrow-left"
        @click="$router.back()"
      />
      <q-toolbar-title align="center">
        <p class="heading-bold text-warning">{{$route.params.id}}</p>
      </q-toolbar-title>
      <q-btn
        round
        color="primary"
        flat
        text-color="white"
        icon="las la-braille"
      >
      </q-btn>
    </q-toolbar>
    <!-- content -->
    <div v-if="spaceData != null">

      <q-list
        class="rounded-borders q-pt-md"
        align="center"
        v-for="app in spaceData.apps"
        :key="app.id"
      >
        <q-expansion-item
          class="bg-secondary shadow-2"
          group="allApps"
          align="left"
          expand-icon-class="text-white"
          style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw"
          expand-icon="las la-angle-down"
          switch-toggle-side
          expand-icon-toggle
        >
          <template v-slot:header>
            <q-item-section side>
              <q-avatar
                size="xs"
                class="q-gutter-x-sm"
              >
                <img src="statics/OktetoIconsComponents/Application.svg">
              </q-avatar>
            </q-item-section>
            <q-item-section class="text-white text-subtitle2">
              <div
                class="text-warning text-caption"
                style="font-size: 8px"
              >
                Application
              </div>
              <div class="q-gutter-y-sm">
                {{app.chart}}
              </div>
            </q-item-section>

            <q-item-section side>
              <div
                class="row items-center"
                v-if="app.status == 'running'"
              >

                <q-badge
                  class="text-positive"
                  style="font-size: 8px"
                >Running</q-badge>
              </div>
              <div
                class="row items-center"
                v-if="app.status == 'progressing'"
              >

                <q-badge
                  class="text-yellow"
                  style="font-size: 8px"
                >{{app.status}}</q-badge>
              </div>
              <div
                class="row items-center"
                v-if="app.status != 'running' && app.status != 'progressing'"
              >

                <q-badge
                  class="text-red"
                  style="font-size: 8px"
                >{{app.status}}</q-badge>
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                round
                color="primary"
                text-color="white"
                icon="las la-ellipsis-v"
              >
              </q-btn>
            </q-item-section>
          </template>

          <q-markup-table
            wrap-cells
            class="bg-secondary text-white"
            flat
            dark
          >
            <tbody>
              <tr>
                <td class="text-left text-subtitle2 text-warning">Chart</td>
                <td class="text-right">{{app.name}} / <span class="text-subtitle2">{{app.version}}</span></td>
              </tr>
              <tr>
                <td
                  class="text-left text-subtitle2 text-warning"
                  v-if="app.repo"
                >Repository</td>
                <td class="text-right">
                  <a
                    style="text-decoration: none !important; color: #00d1ca !important;"
                    :href="app.repo"
                  >{{app.repo}}</a></td>
              </tr>
            </tbody>
          </q-markup-table>
          <q-separator />
          <div class="row justify-center">
            <q-btn
              :ripple="{ center: true }"
              push
              round
              icon="las la-play"
              color="primary"
              class="q-mb-sm text-h6"
              no-caps
            >
            </q-btn>
          </div>
        </q-expansion-item>
      </q-list>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'apps',
  data () {
    return {
      spaceData: null
    }
  },
  methods: {
    errorAtReq () {
      this.$q.notify({
        message:
          'Error #1: Your token expires please try login again. If this error comes again after login, then report it at okteto support.',
        icon: 'fa fa-exclamation-triangle',
        timeout: 10000,
        position: 'top'
      })
    }
  },
  mounted () {
    window.showLoading()
    window.loginClient.request(window.spaceQuery(this.$route.params.id))
      .then(data => {
        console.log(data)
        this.spaceData = data.space
        this.$q.loading.hide()
      }).catch((e) => {
        console.log(e)
        this.$q.loading.hide()
        this.errorAtReq()
      })
  }
}
</script>
