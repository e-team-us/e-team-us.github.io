<template>
  <v-row>
    <v-card
    class="d-flex align-center  flex-wrap text-center mx-auto px-4 "
    variant="flat"
    max-width="800"
    width="100%"
    >
    <v-card-item justify="top" class="mb-1">
        <p class="text-h8">保育士番号：{{childminder_status.childminder_id}}</p>
      </v-card-item>        
      <v-card-item justify="center">
        <p class="text-h6">{{childminder_status.childminder_name}}</p>
      </v-card-item>      
    </v-card>
  </v-row>

  <v-row class="d-flex align-center justify-center flex-wrap text-center">
    <v-col>
      <v-chip
        color="success"
        text-color="white"
        size="x-large"
      >
      出席：
      {{ attending_children.length }}
      </v-chip>
    </v-col>
    <v-col>
      <v-chip
        color="info"
        text-color="white"
        size="x-large"
      >
      欠席：
      {{ absent_children.length }}
      </v-chip>
    </v-col>
    <v-col>
      <v-chip
        color="warning"
        text-color="white"
        size="x-large"
      >
      未記入：
      {{ empty_children.length }}
      </v-chip>
    </v-col>
  </v-row>

  <v-row justify="center" class="mb-10"> <!-- fluidを付けることで左右いっぱいにコンテナが広がります -->
    
    
    <!-- ここから -->
    <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-4 mb-2"
    elevation="4"
    rounded
    max-width="800"
    width="100%"
    
    >
      <div>
        <div class="text-h6 mb-1">
          <v-icon
            class="pb-1"
            color="success"
            icon="mdi-account-check-outline"
            size="30"
          ></v-icon>
          出席
        </div>
        <v-divider class="mb-1"></v-divider>
        <v-card 
        variant="flat">
          <v-row>
            <v-col>児童ID</v-col>
            <v-col>氏名</v-col>
            <v-col>確認</v-col>
            <v-col>時刻</v-col>
          </v-row>
        </v-card>
        <v-divider class="mb-1"></v-divider>
        <v-card 
        v-for="i in attending_children.length"
        width="100%"
        min-width="350"
        rounded="0"
        variant="flat"
        >
        <v-row justify="space-between">
          <v-col>{{ attending_children[i-1].child_id }}</v-col>
          <v-col>{{ attending_children[i-1].child_name }}</v-col>
          <v-col><v-icon 
            v-if="false" 
            class="mb-5" color="success" icon="mdi-check-bold">
            </v-icon></v-col>
          <v-col>{{ convert_datetime(attending_children[i-1].datetime) }}</v-col>
        </v-row>
        </v-card>
      </div>
    </v-sheet>
    <!-- ここまで -->

    <!-- ここから -->
    <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-4 mb-2"
    elevation="4"
    rounded
    max-width="800"
    width="100%"
    >
      <div>
        <div class="text-h6 mb-1">
          <v-icon
            class="pb-1"
            color="info"
            icon="mdi-home-account"
            size="30"
          ></v-icon>
          欠席
        </div>
        <v-divider class="mb-1"></v-divider>
        <v-card variant="flat">
          <v-row>
            <v-col>児童ID</v-col>
            <v-col>氏名</v-col>
            <v-col>確認</v-col>
            <v-col>時刻</v-col>
          </v-row>
        </v-card>
        <v-divider class="mb-1"></v-divider>
        <v-card 
        v-for="i in absent_children.length"
        width="100%"
        min-width="350"
        rounded="0"
        variant="flat"
        @click="onClickrow(i)">
        <v-row justify="space-between">
          <v-col>{{ absent_children[i-1].child_id }}</v-col>
          <v-col>{{ absent_children[i-1].child_name }}</v-col>
          <v-col><v-icon 
            v-if="absent_children[i-1].reply=='確認済み'" 
            class="pb-1" color="success" icon="mdi-check-bold" size="20">
            </v-icon></v-col>
          <v-col>{{ convert_datetime(absent_children[i-1].datetime) }}</v-col>
        </v-row>
      </v-card>

      <v-dialog
        v-model="dialog"
        width="auto"
        >
        <v-card
          class="flex-wrap pa-6"
          elevation="4"
          rounded
          max-width="800"
          min-width="350"
          height="100%"
          width="100%"
          >
            <v-row  class="mb-2">
            </v-row>
            <v-row class="text-body-2 mb-2">
              {{ current_children.datetime}}
            </v-row>
            <v-row>
              児童ID：{{ current_children.child_id}}
            </v-row>
            <v-row class="mb-2">
              名前：{{  current_children.child_name }}
            </v-row>
            
            <v-row class="mb-4">
              欠席理由：{{ current_children.reason }}
            </v-row>
            <v-btn @click="confirmation" color="#6A76AB">
              確認
            </v-btn>
        </v-card>       
      </v-dialog>
      </div>
    </v-sheet>
    <!-- ここまで -->

    <!-- ここから -->
    <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-4 mb-2"
    elevation="4"
    rounded
    max-width="800"
    width="100%"
    >
      <div>
        <div class="text-h6 mb-1">
          <v-icon
            class="pb-1"
            color="warning"
            icon="mdi-exclamation"
            size="30"
          ></v-icon>
          未記入
        </div>
        <v-divider class="mb-1"></v-divider>
        <v-card variant="flat"
        >
          <v-row>
            <v-col>児童ID</v-col>
            <v-col>氏名</v-col>
            <v-col>確認</v-col>
            <v-col>時刻</v-col>
          </v-row>
        </v-card>
        <v-divider class="mb-1"></v-divider>
        <v-card 
        v-for="i in empty_children.length"
        width="100%"
        min-width="350"
        rounded="0"
        variant="flat"
        >
        <v-row justify="space-between">
          <v-col>{{ empty_children[i-1].child_id }}</v-col>
          <v-col>{{ empty_children[i-1].child_name }}</v-col>
          <v-col>
            <v-icon 
            v-if="false" 
            class="mb-5" color="success" icon="mdi-check-bold">
            </v-icon>
            
          </v-col>
          <v-col>{{ convert_datetime(empty_children[i-1].datetime) }}</v-col>
        </v-row>
      </v-card>
      </div>
    </v-sheet>
    <!-- ここまで -->

  </v-row>
</template>

<script>
  import axios from 'axios'
  export default {
    name:"childminder_status",

    data: () => ({
      child_id_select: "5",
      // 児童や保育士のデータ（それぞれ一人分のみ記載、複数人の場合はリスト(配列)で記載する
      child_status: {
        child_id: "0",
        child_name: "田中太郎（初期値）",
        attendance: "欠席（初期値）",
        reason: "体調不良のため（初期値）",
        reply: "未確認（初期値）",
        datetime: "2023/08/31（初期値）"
      },
      attending_children: [],
      absent_children: [],
      empty_children: [],
      childminder_status: {
        childminder_id: "0（初期値）",
        childminder_name: "保育士太郎（初期値）"
      },
      dialog: false,
      current_children: {
        child_id: "0",
        child_name: "田中太郎（初期値）",
        attendance: "欠席（初期値）",
        reason: "体調不良のため（初期値）",
        reply: "未確認",
        datetime: "2023/08/31（初期値）"
      },
    }),

    mounted() {
      this.childminder_status.childminder_id = this.$route.query.childminder_id
      this.childminder_status.childminder_name = this.$route.query.childminder_name
      axios.get(
        'http://127.0.0.1:8000/myapp/children/')
      .then(res => {
        this.attending_children = res.data.attending_children;
        this.absent_children = res.data.absent_children;
        this.empty_children = res.data.empty_children;
        console.log(res.data);
      })
    },

    methods: {
      confirmation() {
        this.dialog = false
        console.log(
          {
            "child_id" : this.current_children.child_id,
            "reply" : "確認済み"
          }
        )
        axios.post(
          'http://127.0.0.1:8000/myapp/updatereply/',
          {
            "child_id" : this.current_children.child_id,
            "reply" : "確認済み"
          }
          )
        .then(res => {
          console.log(res);
        })
        this.$router.push({path: '/childminderview', query: {childminder_id: this.childminder_status.childminder_id, childminder_name: this.childminder_status.childminder_name}});
      },

      attend_J(a) {
        if(a == "1") {
          this.attend_j = "出席"
        } else if (a == "0") {
          this.attend_j = "欠席"
        } else {
          this.attend_j = "未記入"
        }
        return this.attend_j
      },

      reply_J(b) {
        console.log(b)
        if(b == "確認済み") {
          this.reply_j = true
        } else{
          this.reply_j = false
        }
        return this.reply_j
      },

      convert_datetime(dt) {
        return dt.substr(12)
      },

      onClickrow(num) {
        
        this.current_children = this.absent_children[num-1]
        console.log(this.current_children)
        this.dialog = true
      },
    }
  }
</script>