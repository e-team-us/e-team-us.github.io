<template>
  <v-row justify="center" class="mb-10">
    <v-sheet
          class="align-center flex-wrap text-center"
          elevation="4"
          rounded
          max-width="800"
          width="100%"
    >
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">
            出欠入力
          </div>
          <v-radio-group v-model="child_status_input.attendance">
            <v-radio label="出席" value="1"></v-radio>
            <v-radio label="欠席" value="0"></v-radio>
          </v-radio-group>

          <div v-if="child_status_input.attendance=='0'" class="reason_text_field">
            <v-text-field
            v-model="child_status_input.reason"
            label="欠席理由"
            auto-grow
          ></v-text-field>
          </div>
        </div>
      </v-card-item>

      <v-card-actions class="justify-center">
        <v-btn @click="submit" variant="flat" color="#6A76AB">
          送信
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "forms",

    data: () => (
      {child_status_input: {
        child_id: "",
        attendance: "",
        reason: "",
        }
      }),

    created() {
      this.child_status_input.child_id = this.$route.query.child_id
      this.child_status_input.child_name = this.$route.query.child_name
    },

    methods: {
      submit() {
        console.log(
          {
            "child_id" : this.child_status_input.child_id,
            "attendance" : this.child_status_input.attendance,
            "reason" : this.child_status_input.reason
          }
        )
        axios.post(
          'http://127.0.0.1:8000/myapp/regist/',
          {
            "child_id" : this.child_status_input.child_id,
            "attendance" : this.child_status_input.attendance,
            "reason" : this.child_status_input.reason
          }
          )
        .then(res => {
          this.child_status_input.response = res;
          console.log(res);
        })
        this.$router.push({path: '/status', query: {child_id: this.child_status_input.child_id, child_name: this.child_status_input.child_name}});
      },
    }
  }
</script>