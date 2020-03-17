<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-secondary">
      <q-btn
        push
        round
        color="secondary"
        text-color="white"
        icon="las la-angle-left"
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
        icon="las la-ellipsis-v"
      >
      </q-btn>
    </q-toolbar>
    <!-- content -->
    <q-list
      class="rounded-borders q-pt-md"
      v-for="app in spaceData.apps"
      :key="app.id"
    >
      <q-expansion-item
        class="bg-secondary"
        group="allApps"
        expand-icon-class="text-white"
        style="border-radius: 30px"
        expand-icon="las la-angle-down"
        switch-toggle-side
        expand-icon-toggle
      >
        <template v-slot:header>

          <q-item-section class="text-white text-subtitle2">
            <div class="row text-warning text-caption">
              Application
            </div>
            <div class="row">
              {{app.chart}}
            </div>
          </q-item-section>

          <q-item-section side>
            <div
              class="row items-center"
              v-if="app.status == 'running'"
            >

              <q-badge class="text-positive">Running</q-badge>
            </div>
            <div
              class="row items-center"
              v-if="app.status != 'running'"
            >

              <q-badge class="text-red">{{app.status}}</q-badge>
            </div>
          </q-item-section>
          <q-item-section side>
            <q-btn
              push
              round
              color="
                primary"
              text-color="white"
              icon="las la-ellipsis-v"
            >
            </q-btn>
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
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
