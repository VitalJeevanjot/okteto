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
        <!-- <q-fab-action
          color="positive"
          icon="las la-terminal"
        /> -->
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
      v-if="$spaceData.space"
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
                v-if="checkOwner()"
              >
                <q-item-section>Share</q-item-section>
              </q-item>

              <q-item
                clickable
                @click="namespaceTab = 'delete'"
                v-if="checkOwner()"
              >
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-tab
            v-if="checkOwner()"
            name="secret"
            icon="las la-key"
            label="Secrets"
          />
          <q-tab
            v-if="!checkOwner()"
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
          v-if="$spaceData.space != null"
        >
          <q-tab-panel name="quota">
            <div class="text-h6"><span class="heading-bold text-warning">Manage:</span> Quota</div>
            <q-item>

              <q-item-section>
                <q-item-label class="text-h6 heading-bold text-warning">{{this.$spaceData.space.id}}</q-item-label>
                <div>
                  <q-badge
                    color="info"
                    text-color="white"
                    class="q-mt-sm text-subtitle2"
                    :label="'Disk: ' + $byteSize(parseInt(this.$spaceData.space.quotas.used.limitsStorage), { units: 'iec' }).value + '/' + $byteSize(parseInt(this.$spaceData.space.quotas.hard.limitsStorage), { units: 'iec' })"
                  />
                </div>
                <q-linear-progress
                  :value="this.$spaceData.space.quotas.used.limitsStorage/this.$spaceData.space.quotas.hard.limitsStorage"
                  class="bg-info q-mt-xs"
                  color="positive"
                  rounded
                >
                </q-linear-progress>
                <div>
                  <q-badge
                    color="info"
                    text-color="white"
                    class="q-mt-sm text-subtitle2"
                    :label="'Memory: ' + $byteSize(parseInt(this.$spaceData.space.quotas.used.limitsMemory), { units: 'iec' }).value +'/'+ $byteSize(parseInt(this.$spaceData.space.quotas.hard.limitsMemory), { units: 'iec' })"
                  />
                </div>
                <q-linear-progress
                  :value="this.$spaceData.space.quotas.used.limitsMemory/this.$spaceData.space.quotas.hard.limitsMemory"
                  class="bg-info q-mt-xs"
                  color="dark"
                  rounded
                >
                </q-linear-progress>
                <div>
                  <q-badge
                    color="info"
                    text-color="white"
                    class="q-mt-sm text-subtitle2"
                    :label="'CPU: ' + this.$spaceData.space.quotas.used.limitsCPU / 1000 + '/' + this.$spaceData.space.quotas.hard.limitsCPU / 1000"
                  />
                </div>
                <q-linear-progress
                  :value="this.$spaceData.space.quotas.used.limitsCPU/this.$spaceData.space.quotas.hard.limitsCPU"
                  class="bg-info q-mt-xs"
                  color="dark"
                  rounded
                >
                </q-linear-progress>
              </q-item-section>
            </q-item>
          </q-tab-panel>
          <q-tab-panel name="share">
            <div class="text-h6"><span class="heading-bold text-warning">Manage:</span> Share</div>
            <div class="row">
              <q-btn
                round
                color="positive"
                class="q-ma-sm"
                unelevated
                icon="add"
              />
            </div>
            <div class="row">
              <q-list
                class="bg-secondary"
                separator
                dark
              >
                <q-item
                  class="q-pa-sm"
                  v-for="
                member
                in
                $spaceMembers.members"
                  :key="member.id"
                  clickable
                  v-ripple
                  @click="updateMemberConfirmation($spaceData.space.id,  member.email, true, member.avatar)"
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="member.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ member.email }}</q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    v-if="$authUser.user.email != member.email"
                  >
                    <q-icon
                      size="xs"
                      name="close"
                      color="white"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-tab-panel>
          <q-tab-panel name="delete">
            <div class="text-h6"><span class="heading-bold text-warning">Manage:</span> Delete</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elito.
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
    <q-dialog
      v-model="updateNameSpaceConfirm"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar>
            <img :src="memberToDeleteAvatar">
          </q-avatar>
          <span class="text-subtitle"><span class="text-bold"> Delete </span> <span class="text-positive">{{memberToDelete}}</span> from this namespace ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            no-caps
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Delete"
            color="primary"
            no-caps
            @click="updateMember($spaceData.space.id, memberToDelete, true)"
            v-close-popup
          />
        </q-card-actions>
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
      namespaceTabChild: 'details',
      memberToDelete: null,
      updateNameSpaceConfirm: false,
      memberToDeleteAvatar: null
    }
  },
  methods: {
    updateMemberConfirmation (namespaceId, memberToDelete, deleteMember, memberToDeleteAvatar) {
      if (memberToDelete !== this.$authUser.user.email) {
        this.updateNameSpaceConfirm = true
        this.memberToDelete = memberToDelete
        this.memberToDeleteAvatar = memberToDeleteAvatar
      }
    },
    updateMember (namespaceId, memberToDelete, deleteMember) {
      if (deleteMember === true) {
        var indexOfMember = this.$spaceMembers.members.indexOf(memberToDelete)
        if (indexOfMember !== -1) { this.$spaceMembers.members.splice(indexOfMember, 1) }
      }
      var updateSpace = 'mutation{updateSpace(id: "' + namespaceId + '", members: [' + this.getFinalMembers() + '])}'
      window.loginClient.request(updateSpace).then(data => {
        console.log(data)
        this.$q.loading.hide()
        this.namespaceNewName = ''
        this.$spaceMembers.members = data.members
      }).catch((e) => { console.log(e) })
    },
    checkOwner () {
      if (this.$spaceMembers.members) {
        console.log(this.$authUser.user)
        return this.$spaceMembers.members.find(member => member.email === this.$authUser.user.email).owner
      }
    },
    getFinalMembers () {
      var result = this.$spaceMembers.members.map(a => a.email)
      return '"' + result + '"'
    }
  },
  mounted () {
    console.log('hello namespaceActions')
    console.log(this.$spaceData.space)
    console.log(this.$spaceMembers.members)
    // var updateSpace = 'mutation{updateSpace(id: "genievot", members: ["genievot"]){id}}'
    // window.loginClient.request(updateSpace).then(data => {
    //   console.log(data)
    //   this.$q.loading.hide()
    //   this.namespaceNewName = ''
    //   this.$spaceMembers.members = data.members
    // }).catch((e) => { console.log(e) })
  }
}
</script>
