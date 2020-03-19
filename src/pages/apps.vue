<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-secondary">
      <q-btn
        flat
        to="/dashboard"
        color="secondary"
        text-color="white"
        icon="las la-arrow-left"
      />
      <q-toolbar-title class="heading-bold text-warning">
        {{$route.params.id}}
      </q-toolbar-title>
    </q-toolbar>
    <q-page-sticky
      position="bottom-right"
      :offset="[ 18, 18 ]"
    >
      <q-btn
        unelevated
        round
        color="secondary"
        text-color="white"
        icon="las la-braille"
      >
      </q-btn>
    </q-page-sticky>
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
                >Progressing</q-badge>
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
                unelevated
                round
                color="primary"
                text-color="white"
                icon="las la-ellipsis-v"
              >
              </q-btn>
            </q-item-section>
          </template>
          <!-- app deployments -->
          <div
            class="row justify-center"
            style="font-size: 12px"
            v-for="appDeployments in app.deployments"
            :key="appDeployments.id"
          >
            <div
              class="row justify-center"
              style="font-size: 12px"
              v-for="appDeploymentsEndpoint in appDeployments.endpoints"
              :key="appDeploymentsEndpoint"
            >
              <a
                class=""
                style="text-decoration: none !important; color: #00d1ca !important;"
                :href="appDeploymentsEndpoint"
              >{{appDeploymentsEndpoint}}</a>
            </div>
          </div>
          <!-- app Statefulsets -->
          <div
            class="row justify-center"
            style="font-size: 12px"
            v-for="appStatefulsets in app.statefulsets"
            :key="appStatefulsets.id"
          >
            <div
              class="row justify-center"
              style="font-size: 12px"
              v-for="appStatefulsetsEndpoint in appStatefulsets.endpoints"
              :key="appStatefulsetsEndpoint"
            >
              <a
                class=""
                style="text-decoration: none !important; color: #00d1ca !important;"
                :href="appDeploymentsEndpoint"
              >{{appDeploymentsEndpoint}}</a>
            </div>
          </div>
          <!-- app devs -->
          <div
            class="row justify-center"
            style="font-size: 12px"
            v-for="appDevs in app.devs"
            :key="appDevs.id"
          >
            <div
              class="row justify-center"
              style="font-size: 12px"
              v-for="appDevsEndpoint in appDevs.endpoints"
              :key="appDevsEndpoint"
            >
              <a
                class=""
                style="text-decoration: none !important; color: #00d1ca !important;"
                :href="appDevsEndpoint"
              >{{appDevsEndpoint}}</a>
            </div>
          </div>
          <!-- functions -->
          <div
            class="row justify-center"
            style="font-size: 12px"
            v-for="appFunctions in app.functions"
            :key="appFunctions.id"
          >
            <div
              class="row justify-center"
              style="font-size: 12px"
              v-for="appFunctionsEndpoint in appFunctions.endpoints"
              :key="appFunctionsEndpoint"
            >
              <a
                class=""
                style="text-decoration: none !important; color: #00d1ca !important;"
                :href="appFunctionsEndpoint"
              >{{appFunctionsEndpoint}}</a>
            </div>
          </div>
          <!-- containers -->
          <div
            class="row justify-center"
            style="font-size: 12px"
            v-for="appContainers in app.containers"
            :key="appContainers.id"
          >
            <div
              class="row justify-center"
              style="font-size: 12px"
              v-for="appContainersEndpoint in appContainers.endpoints"
              :key="appContainersEndpoint"
            >
              <a
                class=""
                style="text-decoration: none !important; color: #00d1ca !important;"
                :href="appContainersEndpoint"
              >{{appContainersEndpoint}}</a>
            </div>
          </div>
          <!-- find more button -->
          <div class="row justify-center">
            <q-btn
              :ripple="{ center: true }"
              round
              icon="las la-play"
              color="primary"
              class="q-mb-sm text-h6 q-mt-lg"
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
