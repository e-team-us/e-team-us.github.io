<template>

    <v-tabs
      v-model="tab"
      color="#6A76AB"
      align-tabs="end"
      class="mb-2"
    >
      <v-tab :value="'parents'">保護者モード</v-tab>
      <v-tab :value="'childminder'">保育士モード</v-tab>
    </v-tabs>
    <v-window 
      v-model="tab"
      class="pa-4">
      <v-window-item value="parents">
          <!-- <v-icon
          color="success"
          icon="mdi-human-male-child"
          size="112"
          ></v-icon> -->
          <v-text-field
            v-model="child_id_user"
            label="id"
            required
          ></v-text-field>
        <v-row justify="center">
          <v-btn variant="flat" color="#6A76AB" @click="parents_login">
            ログイン
          </v-btn>
        </v-row>

      
      </v-window-item>
      <v-window-item value="childminder"> 
        <v-row>
          <v-text-field
            v-model="childminder_id_user"
            label="id"
            required
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn variant="flat" color="#6A76AB" @click="childminder_login">
            ログイン
          </v-btn>
        </v-row>
      </v-window-item>
    </v-window>
  <v-row justify="center" class="mb-10"> <!-- fluidを付けることで左右いっぱいにコンテナが広がります -->



  </v-row>
</template>

<script>

  export default {

    data: () => ({
      tab: null,
      child_id_user: "",
      childminder_id_user: "",
    }),

    methods: {
      parents_login() {
        this.$router.push({path: '/status', query: {child_id: this.child_id_user}})
      },
      childminder_login() {
        this.$router.push({path: '/childminderview', query: {childminder_id: this.childminder_id_user}})
      }
    }
  }
</script>