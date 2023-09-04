<template>

    <v-row justify="center">
      <v-col cols="auto">  
        <v-btn variant="flat" color="blue-accent-4" @click="parents_login">
            保護者ログイン
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn variant="flat" color="red-accent-4" @click="childminder_login">
            保育士ログイン
        </v-btn>
      </v-col>
    </v-row>

</template>

<script>

  export default {

    data: () => ({
      child_id_user: "3",
      childminder_id_user: "3",
      child_name_user: "田中太郎",
      childminder_name_user: "保育士太郎"
    }),

    methods: {
      parents_login() {
        this.child_id_user = "3"
        this.$router.push({path: '/status', query: {child_id: this.child_id_user, child_name: this.child_name_user}})
      },
      childminder_login() {
        this.child_id_user = "3"
        this.$router.push({path: '/childminderview', query: {childminder_id: this.childminder_id_user, childminder_name: this.childminder_name_user}})
      }
    }
  }
</script>