<template>
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
    >
      <v-btn @click="toLogin">
        <v-icon
        icon="mdi-logout"
        ></v-icon>
      </v-btn>

      <v-toolbar-title>
        おるん
      </v-toolbar-title>
    </v-app-bar>
  </template>

<script>
  export default {
    name: "bar",

    methods: {
      toLogin() {
        this.$router.push({path: '/'})
      }
    }
  }
</script>