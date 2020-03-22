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
      <q-card class="bg-primary text-white">
        <q-tabs
          v-model="namespaceTab"
          dense
          no-caps
          inline-label
          class="bg-secondary text-white shadow-2"
        >
          <q-btn-dropdown
            auto-close
            stretch
            flat
            label="Manage"
            no-caps
          >
            <q-list>
              <q-item
                clickable
                @click="namespaceTab = 'quota'"
              >
                <q-item-section>Quota</q-item-section>
              </q-item>

              <q-item
                clickable
                @click="namespaceTab = 'share'"
              >
                <q-item-section>Share</q-item-section>
              </q-item>

              <q-item
                clickable
                @click="namespaceTab = 'delete'"
              >
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-tab
            name="secret"
            icon="las la-key"
            label="Secrets"
          />
          <q-tab
            name="leave"
            icon="las la-door-open"
            label="Leave"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels
          class="text-white  bg-primary"
          v-model="namespaceTab"
          animated
        >
          <q-tab-panel name="quota">
            <div class="text-h6">manage/Quota</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="share">
            <div class="text-h6">manage/Share</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="delete">
            <div class="text-h6">manage/Delete</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="secret">
            <div class="text-h6">Secret</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="leave">
            <div class="text-h6">Leave</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'namespaceActions',
  data () {
    return {
      namespaceInfoDialog: false,
      namespaceTab: 'quota',
      namespaceTabChild: 'details'
    }
  },
  mounted () {
    console.log('hello')
  }
}
</script>
