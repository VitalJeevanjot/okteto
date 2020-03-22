<template>
  <!-- content -->
  <div v-if="$spaceData.space != null">
    <!-- For apps -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="app in $spaceData.space.apps"
      :key="app.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw;"
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

        </template>
        <div class="row float-right q-mr-sm">
          <q-btn
            unelevated
            round
            class="rotate-270"
            color="primary"
            text-color="white"
            icon="menu_open"
          >
          </q-btn>
        </div>
        <div style="min-height: 70px;">
          <!-- app deployments -->
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%"
            v-for="appDeployments in app.deployments"
            :key="appDeployments.id"
          >
            <div
              class="row col-12 q-pa-sm q-pt-md vertical-middle"
              style="font-size: 100%"
              v-for="appDeploymentsEndpoint in appDeployments.endpoints"
              :key="appDeploymentsEndpoint"
            >
              <a
                class="ellipsis q-mt-sm"
                style="text-decoration: none !important; color: #ffffff !important;"
                :href="appDeploymentsEndpoint"
              >{{appDeploymentsEndpoint}}</a>
            </div>
          </div>
          <!-- app Statefulsets -->
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="appStatefulsets in app.statefulsets"
            :key="appStatefulsets.id"
          >
            <div
              class="row col-12 q-pa-sm q-pt-md vertical-middle"
              style="font-size: 100%"
              v-for="appStatefulsetsEndpoint in appStatefulsets.endpoints"
              :key="appStatefulsetsEndpoint"
            >
              <a
                class="ellipsis q-mt-sm"
                style="text-decoration: none !important; color: #ffffff !important;"
                :href="appDeploymentsEndpoint"
              >{{appDeploymentsEndpoint}}</a>
            </div>
          </div>
          <!-- app devs -->
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="appDevs in app.devs"
            :key="appDevs.id"
          >
            <div
              class="row col-12 q-pa-sm q-pt-md vertical-middle"
              style="font-size: 100%"
              v-for="appDevsEndpoint in appDevs.endpoints"
              :key="appDevsEndpoint"
            >
              <a
                class="ellipsis q-mt-sm"
                style="text-decoration: none !important; color: #ffffff !important;"
                :href="appDevsEndpoint"
              >{{appDevsEndpoint}}</a>
            </div>
          </div>
          <!-- app functions -->
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="appFunctions in app.functions"
            :key="appFunctions.id"
          >
            <div
              class="row col-12 q-pa-sm q-pt-md vertical-middle"
              style="font-size: 100%"
              v-for="appFunctionsEndpoint in appFunctions.endpoints"
              :key="appFunctionsEndpoint"
            >
              <a
                class="ellipsis q-mt-sm"
                style="text-decoration: none !important; color: #ffffff !important;"
                :href="appFunctionsEndpoint"
              >{{appFunctionsEndpoint}}</a>
            </div>
          </div>
          <!-- app containers -->
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="appContainers in app.containers"
            :key="appContainers.id"
          >
            <div
              class="row col-12 q-pa-sm q-pt-md vertical-middle"
              style="font-size: 100%"
              v-for="appContainersEndpoint in appContainers.endpoints"
              :key="appContainersEndpoint"
            >
              <a
                class="ellipsis q-mt-sm"
                style="text-decoration: none !important; color: #ffffff !important;"
                :href="appContainersEndpoint"
              >{{appContainersEndpoint}}</a>
            </div>
          </div>
        </div>

      </q-expansion-item>
    </q-list>

    <!-- For Devs -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="devenv in $spaceData.space.devs"
      :key="devenv.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw;"
      >
        <template v-slot:header>
          <q-item-section side>
            <q-avatar
              size="xs"
              class="q-gutter-x-sm"
            >
              <img src="statics/OktetoIconsComponents/Dev Environment.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-white text-subtitle2">
            <div
              class="text-warning text-caption"
              style="font-size: 8px"
            >
              Dev Environment
            </div>
            <div class="q-gutter-y-sm">
              {{devenv.name}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="devenv.status == 'running'"
            >

              <q-badge
                class="text-positive"
                style="font-size: 8px"
              >Running</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="devenv.status == 'progressing'"
            >

              <q-badge
                class="text-yellow"
                style="font-size: 8px"
              >Progressing</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="devenv.status != 'running' && devenv.status != 'progressing'"
            >

              <q-badge
                class="text-red"
                style="font-size: 8px"
              >{{devenv.status}}</q-badge>
            </div>
          </q-item-section>

        </template>
        <div class="row float-right q-mr-sm">
          <q-btn
            unelevated
            round
            class="rotate-270"
            color="primary"
            text-color="white"
            icon="menu_open"
          >
          </q-btn>
        </div>
        <div style="min-height: 70px;">
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="devenvnd in devenv.endpoints"
            :key="devenvnd"
          >
            <a
              class="ellipsis q-mt-sm q-pa-sm q-pt-md"
              style="text-decoration: none !important; color: #ffffff !important;"
              :href="devenvnd"
            >{{devenvnd}}</a>
          </div>
        </div>

      </q-expansion-item>
    </q-list>

    <!-- For Deployments -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="deployment in $spaceData.space.deployments"
      :key="deployment.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw"
      >
        <template v-slot:header>
          <q-item-section side>
            <q-avatar
              size="xs"
              class="q-gutter-x-sm"
            >
              <img src="statics/OktetoIconsComponents/Deployment.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-white text-subtitle2">
            <div
              class="text-warning text-caption"
              style="font-size: 8px"
            >
              Deployment
            </div>
            <div class="q-gutter-y-sm">
              {{deployment.name}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="deployment.status == 'running'"
            >

              <q-badge
                class="text-positive"
                style="font-size: 8px"
              >Running</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="deployment.status == 'progressing'"
            >

              <q-badge
                class="text-yellow"
                style="font-size: 8px"
              >Progressing</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="deployment.status != 'running' && deployment.status != 'progressing'"
            >

              <q-badge
                class="text-red"
                style="font-size: 8px"
              >{{deployment.status}}</q-badge>
            </div>
          </q-item-section>
        </template>
        <div class="row float-right q-mr-sm">
          <q-btn
            unelevated
            round
            class="rotate-270"
            color="primary"
            text-color="white"
            icon="menu_open"
          >
          </q-btn>
        </div>
        <div style="min-height: 70px;">
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="deployment in deployment.endpoints"
            :key="deployment"
          >
            <a
              class="ellipsis q-mt-sm q-pa-sm q-pt-md"
              style="text-decoration: none !important; color: #ffffff !important;"
              :href="deployment"
            >{{deployment}}</a>
          </div>

        </div>

      </q-expansion-item>
    </q-list>

    <!-- For Container -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="container in $spaceData.space.containers"
      :key="container.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw"
      >
        <template v-slot:header>
          <q-item-section side>
            <q-avatar
              size="xs"
              class="q-gutter-x-sm"
            >
              <img src="statics/OktetoIconsComponents/Container.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-white text-subtitle2">
            <div
              class="text-warning text-caption"
              style="font-size: 8px"
            >
              Container
            </div>
            <div class="q-gutter-y-sm">
              {{container.name}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="container.status == 'running'"
            >

              <q-badge
                class="text-positive"
                style="font-size: 8px"
              >Running</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="container.status == 'progressing'"
            >

              <q-badge
                class="text-yellow"
                style="font-size: 8px"
              >Progressing</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="container.status != 'running' && container.status != 'progressing'"
            >

              <q-badge
                class="text-red"
                style="font-size: 8px"
              >{{container.status}}</q-badge>
            </div>
          </q-item-section>

        </template>
        <div class="row float-right q-mr-sm">
          <q-btn
            unelevated
            round
            class="rotate-270"
            color="primary"
            text-color="white"
            icon="menu_open"
          >
          </q-btn>
        </div>
        <div style="min-height: 70px;">
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="containerend in container.endpoints"
            :key="containerend"
          >
            <a
              class="ellipsis q-mt-sm q-pa-sm q-pt-md"
              style="text-decoration: none !important; color: #ffffff !important;"
              :href="containerend"
            >{{containerend}}</a>

          </div>
        </div>

      </q-expansion-item>
    </q-list>
    <!-- For Functions -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="functionCell in $spaceData.space.functions"
      :key="functionCell.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw"
      >
        <template v-slot:header>
          <q-item-section side>
            <q-avatar
              size="xs"
              class="q-gutter-x-sm"
            >
              <img src="statics/OktetoIconsComponents/Function.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-white text-subtitle2">
            <div
              class="text-warning text-caption"
              style="font-size: 8px"
            >
              Function
            </div>
            <div class="q-gutter-y-sm">
              {{functionCell.name}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="functionCell.status == 'running'"
            >

              <q-badge
                class="text-positive"
                style="font-size: 8px"
              >Running</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="functionCell.status == 'progressing'"
            >

              <q-badge
                class="text-yellow"
                style="font-size: 8px"
              >Progressing</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="functionCell.status != 'running' && functionCell.status != 'progressing'"
            >

              <q-badge
                class="text-red"
                style="font-size: 8px"
              >{{functionCell.status}}</q-badge>
            </div>
          </q-item-section>

        </template>
        <div class="row float-right q-mr-sm">
          <q-btn
            unelevated
            round
            class="rotate-270"
            color="primary"
            text-color="white"
            icon="menu_open"
          >
          </q-btn>
        </div>
        <div style="min-height: 70px;">
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="functionCellend in functionCell.endpoints"
            :key="functionCellend"
          >
            <a
              class="ellipsis q-mt-sm q-pa-sm q-pt-md"
              style="text-decoration: none !important; color: #ffffff !important;"
              :href="functionCellend"
            >{{functionCellend}}</a>
          </div>
        </div>

      </q-expansion-item>
    </q-list>

    <!-- For StatefulSets -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="statefulset in $spaceData.space.statefulsets"
      :key="statefulset.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw"
      >
        <template v-slot:header>
          <q-item-section side>
            <q-avatar
              size="xs"
              class="q-gutter-x-sm"
            >
              <img src="statics/OktetoIconsComponents/StatefulSet.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-white text-subtitle2">
            <div
              class="text-warning text-caption"
              style="font-size: 8px"
            >
              StatefulSet
            </div>
            <div class="q-gutter-y-sm">
              {{statefulset.name}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="statefulset.status == 'running'"
            >

              <q-badge
                class="text-positive"
                style="font-size: 8px"
              >Running</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="statefulset.status == 'progressing'"
            >

              <q-badge
                class="text-yellow"
                style="font-size: 8px"
              >Progressing</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="statefulset.status != 'running' && statefulset.status != 'progressing'"
            >

              <q-badge
                class="text-red"
                style="font-size: 8px"
              >{{statefulset.status}}</q-badge>
            </div>
          </q-item-section>

        </template>
        <div class="row float-right q-mr-sm">
          <q-btn
            unelevated
            round
            class="rotate-270"
            color="primary"
            text-color="white"
            icon="menu_open"
          >
          </q-btn>
        </div>
        <div style="min-height: 70px;">
          <div
            class="row q-pa-sm q-pt-md vertical-middle"
            style="font-size: 100%;"
            v-for="statefulsetend in statefulset.endpoints"
            :key="statefulsetend"
          >
            <a
              class="ellipsis q-mt-sm q-pa-sm q-pt-md"
              style="text-decoration: none !important; color: #ffffff !important;"
              :href="statefulsetend"
            >{{statefulsetend}}</a>
          </div>
        </div>
      </q-expansion-item>
    </q-list>
    <!-- For Volumes -->
    <q-list
      class="rounded-borders q-pt-md"
      align="center"
      v-for="volume in $spaceData.space.volumes"
      :key="volume.id"
    >
      <q-expansion-item
        class="bg-secondary shadow-2"
        group="allApps"
        align="left"
        dense-toggle
        expand-icon-class="text-white"
        style="border-radius: 3px; max-width: 700px; min-width: 310px; width: 90vw"
      >
        <template v-slot:header>
          <q-item-section side>
            <q-avatar
              size="xs"
              class="q-gutter-x-sm"
            >
              <img src="statics/OktetoIconsComponents/Volume.svg">
            </q-avatar>
          </q-item-section>
          <q-item-section class="text-white text-subtitle2">
            <div
              class="text-warning text-caption"
              style="font-size: 8px"
            >
              Volume
            </div>
            <div class="q-gutter-y-sm">
              {{volume.name}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="volume.status == 'in-use'"
            >

              <q-badge
                class="text-yellow"
                style="font-size: 8px"
              >In-use</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="volume.status == 'unused'"
            >

              <q-badge
                class="text-grey"
                style="font-size: 8px"
              >{{volume.status}}</q-badge>
            </div>
          </q-item-section>

        </template>

      </q-expansion-item>
    </q-list>

  </div>
</template>

<script>
export default {
  name: 'listingapps',
  data () {
    return {
    }
  },
  methods: {
    errorAtReq () {
      this.$q.notify({
        message:
          'Error #1.1: ' + this.$route.params.id + ' data not available anymore.',
        icon: 'fa fa-exclamation-triangle',
        color: 'red',
        timeout: 5000,
        position: 'top'
      })
    }
  },
  mounted () {
    console.log('here #1')
    window.showLoading()
    console.log('here #2')
    window.loginClient.request(window.spaceQuery(this.$route.params.id))
      .then(data => {
        console.log(data)
        this.$spaceData.space = data.space
        this.$spaceMembers.members = data.space.members
        console.warn(this.$spaceMembers.members.find(member => member.email === this.$authUser.user.email).owner)
        this.$q.loading.hide()
      }).catch((e) => {
        console.log(e)
        this.$q.loading.hide()
        this.errorAtReq()
        this.$router.back()
      })
  }
}
</script>
