<template>
  <div class="view-lobby-modal">
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title></md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="lobby-info">
          <div class="lobby-info">
            <form>
              <input type="text" placeholder="prop1" v-model="newTextLobby.prop1" />
              <input type="text" placeholder="prop2" v-model="newTextLobby.prop2" />
              <input type="text" placeholder="prop3" v-model="newTextLobby.prop3" />
              <md-button class="md-primary" @click="showDialog = false, createTextLobby">Save Lobby</md-button>
            </form>
          </div>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">Create Text Lobby</md-button>
  </div>
</template>

<script>
export default {
  name: "Create_Lobby_Modal",
  data() {
    return {
      showDialog: false,
      newTextLobby: {
        prop1: "",
        prop2: "",
        prop3: ""
        // change me
      }
    };
  },
  methods: {
    createTextLobby() {
      dispatch("setItem", {
        data: this.newTextLobby,
        address: "lobbies?????"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.md-dialog {
  max-width: 768px;
}
</style>