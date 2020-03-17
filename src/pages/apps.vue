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
    <q-list class="rounded-borders q-pt-md">
      <q-expansion-item class="bg-secondary">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar
              icon="bluetooth"
              color="primary"
              text-color="white"
            />
          </q-item-section>

          <q-item-section class="text-white text-subtitle2">
            Bluetooth technology
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">

              <q-badge align="middle">app v1.0.0</q-badge>
            </div>
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
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
        this.spaceData = data
        this.$q.loading.hide()
      }).catch((e) => {
        console.log(e)
        this.$q.loading.hide()
        this.errorAtReq()
      })
  }
}
</script>
