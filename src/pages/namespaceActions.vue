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
          @click="console.log('Hello')"
          color="positive"
          icon="las la-terminal"
        />
        <q-fab-action
          @click="console.log('Hello')"
          color="white"
          text-color="amber-9"
          icon="widgets"
        />
        <q-fab-action
          @click="console.log('Hello')"
          color="secondary"
          class="rotate-90"
          icon="menu_open"
        />
      </q-fab>
    </q-page-sticky>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'namespaceActions',
  mounted () {
    console.log('hello')
  }
}
</script>
