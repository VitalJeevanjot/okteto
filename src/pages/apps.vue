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
    console.log(window.spaceQuery(this.$route.params.id))
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
    console.log(this.$route.params.id)
  }
}
</script>
