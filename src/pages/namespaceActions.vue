<template>
  <q-page padding>
    <q-toolbar>
      <q-btn
        flat
        round
        size="sm"
        @click="$router.back()"
        color="secondary"
        text-color="white"
        icon="las la-arrow-left"
      />
      <q-toolbar-title class="heading-bold text-warning">
        {{$route.params.id}}
      </q-toolbar-title>
    </q-toolbar>
    <q-page-sticky
      style="z-index: 1;"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-fab
        icon="las la-braille"
        direction="up"
        color="white"
        text-color="primary"
      >
        <q-fab-action
          color="positive"
          icon="las la-terminal"
        />
        <q-fab-action
          color="white"
          text-color="amber-9"
          icon="widgets"
        />
        <q-fab-action
          @click="namespaceInfoDialog = true"
          color="secondary"
          class="rotate-90"
          icon="menu_open"
        />
      </q-fab>
    </q-page-sticky>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="namespaceInfoDialog"
      position="bottom"
    >
      <q-card
        style="min-width: 320px"
        class="bg-primary text-white"
      >

        <q-card-section class="row items-center no-wrap">

          <q-btn
            align="between"
            class="btn-fixed-width"
            flat
            label="Share"
            no-caps
            icon="account_circle"
          />
          <q-btn
            align="between"
            class="btn-fixed-width"
            flat
            label="Delete"
            no-caps
            icon="cancel"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'namespaceActions',
  data () {
    return {
      namespaceInfoDialog: false
    }
  },
  mounted () {
    console.log('hello')
  }
}
</script>
