<template>
  <v-app id="inspire">
    <bar />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
      
    </v-main>
  </v-app>
</template>

<script setup>
  import bar from './components/Bar.vue';
</script>