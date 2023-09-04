<template>
  <v-row class="mb-2">
    <v-card
    class="d-flex align-center  flex-wrap text-center mx-auto px-4"
    variant="flat"
    max-width="800"
    width="100%"
    >
      <v-card-item justify="top" class="mb-1">
        <p class="text-h8">児童番号：{{child_status.child_id}}</p>
      </v-card-item>        
      <v-card-item justify="center">
        <p class="text-h6">{{child_status.child_name}}</p>
      </v-card-item>
    </v-card>
  </v-row>
  <v-row justify="center" class="mb-10"> <!-- fluidを付けることで左右いっぱいにコンテナが広がります -->
    <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    elevation="4"
    rounded
    max-width="800"
    width="100%"
    >
      <div>
        <v-icon
        v-if="child_status.attendance == '1'"
        class="mb-5"
        color="success"
        icon="mdi-account-check-outline"
        size="112"
        ></v-icon>
        <v-icon
        v-else-if="child_status.attendance == '0'"
        class="mb-5"
        color="info"
        icon="mdi-home-account"
        size="112"
        ></v-icon>
        <v-icon
        v-else
        class="mb-5"
        color="warning"
        icon="mdi-exclamation"
        size="112"
        ></v-icon>

        <h2 class="text-h4 font-weight-black mb-2">
          {{ attend_J() }}
        </h2>

        <div class="text-body-2 font-weight-medium mb-2">
          {{child_status.datetime}}
        </div>

        <p class="text-body-2 mb-4">
          {{child_status.reason}}
        </p>

        <v-card color="#fbdac8" class="mb-4">
          {{child_status.reply}}
        </v-card>

        <v-btn variant="flat" color="#6A76AB" @click="toForm" class="mb-2">
          {{ "出欠入力" }}
        </v-btn>
      </div>
    </v-sheet>
  </v-row>
</template>

<script>
  import axios from 'axios'
  export default {
    name:"status",

    data: () => ({
      attend_j: ""
    },
    {child_status: {
      child_id: "0",
      child_name: "",
      attendance: "",
      reason: "",
      reply: "",
      datetime: ""
      }
    }),

    created() {
      reload();
      this.child_status.child_id = this.$route.query.child_id
      
      axios.post(
        'https://eteamus.pythonanywhere.com/myapp/status/',
        {
          "child_id" : this.child_status.child_id
        }
        )
      .then(res => {
        this.child_status.child_name = res.data.child_name;
        this.child_status.attendance = res.data.attendance;
        this.child_status.datetime = res.data.datetime;
        this.child_status.reason = res.data.reason;
        this.child_status.reply = res.data.reply;
        console.log(res);
      })

      

    },

    methods: {
      toForm() {
        this.$router.push({path: '/forms', query: {child_id: this.child_status.child_id, child_name: this.child_status.child_name}})
      },
      attend_J() {
        if(this.child_status.attendance == "1") {
          this.attend_j = "出席"
        } else if (!this.child_status.attendance == "0") {
          this.attend_j = "欠席"
        } else {
          this.attend_j = "未記入"
        }
        return this.attend_j
      }
    }
  }
</script>