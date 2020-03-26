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
          @click="upcomingFeatures('deploy')"
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
          v-if="$spaceMembers.members"
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
                v-if="checkOwner() && $authUser.user.githubID != this.$spaceData.space.id"
              >
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!-- <q-tab
            v-if="checkOwner()"
            name="secret"
            icon="las la-key"
            label="Secrets"
          /> -->
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
            <!-- <div class="text-h6"><span class="heading-bold text-warning">Manage:</span> Quota</div> -->
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
            <div class="row">
              <q-btn
                round
                color="positive"
                class="q-ma-sm"
                unelevated
                icon="add"
              >
                <q-popup-edit
                  buttons
                  v-model="memberToUpdate"
                  content-class="bg-negative text-white"
                  color="white"
                  title="New User Email"
                  label-set="Add"
                  @save="updateMember($spaceData.space.id, memberToUpdate, false)"
                >
                  <q-input
                    v-model="memberToUpdate"
                    dense
                    type="email"
                    dark
                    color="white"
                    maxlength="200"
                    autofocus
                  />
                </q-popup-edit>
              </q-btn>
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
                  @click="updateMemberConfirmation($spaceData.space.id,  member.githubID, true, member.avatar, member.githubID)"
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="member.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ member.githubID }}</q-item-label>
                    <q-item-label
                      caption
                      lines="1"
                    >{{ member.email }}</q-item-label>
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
          <q-tab-panel
            name="delete"
            v-if="$authUser.user.githubID != this.$spaceData.space.id"
          >
            <q-item-label class="text-h6 heading-bold text-warning">{{this.$spaceData.space.id}}</q-item-label>
            <q-btn
              round
              color="red"
              class="q-ma-sm"
              unelevated
              icon="delete"
            >
              <q-popup-edit
                buttons
                v-model="namespaceToDelete"
                content-class="bg-negative text-white"
                color="white"
                title="Enter namespace name you want to delete"
                label-set="Delete"
                @save="deleteNameSpace(namespaceToDelete, true)"
              >
                <q-input
                  v-model="namespaceToDelete"
                  dense
                  type="email"
                  dark
                  color="white"
                  maxlength="253"
                  autofocus
                />
              </q-popup-edit>
            </q-btn>
          </q-tab-panel>

          <q-tab-panel name="secret">
            <div class="text-h6">Secret</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="leave">
            <q-item-label class="text-h6 heading-bold text-warning">{{this.$spaceData.space.id}}</q-item-label>
            <q-btn
              round
              color="yellow-10"
              class="q-ma-sm"
              unelevated
              icon="las la-door-open"
            >
              <q-popup-edit
                buttons
                v-model="namespaceToDelete"
                content-class="bg-negative text-white"
                color="white"
                title="Enter namespace name you want to leave"
                label-set="Leave"
                @save="deleteNameSpace(namespaceToDelete, false)"
              >
                <q-input
                  v-model="namespaceToDelete"
                  dense
                  type="email"
                  dark
                  color="white"
                  maxlength="253"
                  autofocus
                />
              </q-popup-edit>
            </q-btn>
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
            <img :src="memberToUpdateAvatar">
          </q-avatar>
          <span class="text-subtitle"><span class="text-bold"> Delete </span> <span class="text-positive">{{memberToUpdate}}</span> from this namespace ?</span>
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
            @click="updateMember($spaceData.space.id, memberToUpdate, true)"
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
      memberToUpdate: null,
      updateNameSpaceConfirm: false,
      memberToUpdateAvatar: null,
      memberList: [],
      namespaceToDelete: ''
    }
  },
  methods: {
    deleteNameSpace (nameSpaceToDelete, ofOwner) {
      // if user is not owner of space then assign leave mutation else delete
      console.log(this.$spaceData.space.id)
      console.log(nameSpaceToDelete)
      var deleteSpace = null
      if (ofOwner === true) {
        deleteSpace = 'mutation{deleteSpace(id:"' + nameSpaceToDelete + '") {id}}'
      }
      if (ofOwner === false) {
        deleteSpace = 'mutation{leaveSpace(id:"' + nameSpaceToDelete + '") {id}}'
      }
      if (nameSpaceToDelete === this.$spaceData.space.id) {
        console.log(deleteSpace)
        window.loginClient.request(deleteSpace).then(data => {
          console.log(data)
          this.$q.loading.hide()
          window.processRequest()
          this.$q.notify({
            message:
              nameSpaceToDelete + ' space Deleted',
            icon: 'done',
            color: 'positive',
            timeout: 3000,
            position: 'top'
          })
          this.$eventReg('actions', 'Delete Namespace', this.$spaceData.space.id, window.sessionId)
          this.nameSpaceToDelete = ''
          this.$router.back()
        }).catch((e) => {
          console.log(e)
          this.$q.notify({
            message:
              'Unable to delete namespace',
            icon: 'fa fa-exclamation-triangle',
            color: 'red',
            timeout: 5000,
            position: 'top'
          })
        })
      } else {
        this.$q.notify({
          message:
            'Namespace name is not correct!',
          icon: 'fa fa-exclamation-triangle',
          color: 'red',
          timeout: 5000,
          position: 'top'
        })
      }
    },
    updateMemberConfirmation (namespaceId, memberToUpdate, deleteMember, memberToUpdateAvatar) { // only for deletion
      console.log(memberToUpdate)
      if (memberToUpdate !== this.$authUser.user.githubID) {
        this.updateNameSpaceConfirm = true
        this.memberToUpdate = memberToUpdate
        this.memberToUpdateAvatar = memberToUpdateAvatar
      }
    },
    getMemberList (deleteUser, memberToUpdate) { // get finalized member list
      var finalList = null
      this.memberList = this.$spaceMembers.members.map(a => a.githubID)
      if (deleteUser === true) {
        var indexOfMember = this.memberList.indexOf(memberToUpdate)
        if (indexOfMember !== -1) { this.memberList.splice(indexOfMember, 1); console.log(this.memberList) }
      }
      if (deleteUser === false) {
        this.memberList.push(memberToUpdate)
      }
      finalList = '["' + this.memberList.join('","') + '"]'
      return finalList
    },
    updateMember (namespaceId, memberToUpdate, deleteMember) {
      var updateSpace = 'mutation{updateSpace(id:"' + namespaceId + '", members: ' + this.getMemberList(deleteMember, memberToUpdate) + ') {members {avatar, email, githubID, id, name, owner}}}'
      console.log(updateSpace)
      window.loginClient.request(updateSpace).then(data => {
        console.log(data)
        this.$q.loading.hide()
        this.namespaceNewName = '' // same model used for namespace new names
        this.$spaceMembers.members = data.updateSpace.members
        this.$eventReg('actions', 'Member Deleted: ' + deleteMember, memberToUpdate, window.sessionId)
      }).catch((e) => {
        console.log(e)
        this.$q.notify({
          message:
            'Unable to update member',
          icon: 'fa fa-exclamation-triangle',
          color: 'red',
          timeout: 5000,
          position: 'top'
        })
      })
    },
    checkOwner () { // check whether the owner is user or not for each object inside array
      if (this.$spaceMembers.members) {
        return this.$spaceMembers.members.find(member => member.email === this.$authUser.user.email).owner
      }
    }
  },
  mounted () {
    console.log('hello namespaceActions')
    console.log(this.$spaceData.space)
    console.log(this.$spaceMembers.members)
    console.log(this.$authUser.user)
    // this.$ga.logPage(this.$route.path, this.$route.params.id, this.$q.localStorage.getItem('auth').githubID)
  }
}
</script>
