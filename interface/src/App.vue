<template>
  <v-app>
    <v-content>
      <router-view/>
      <div width="100" class="ma-4 indigo darken-4 white--text" dark>
        LIGA NOS temporada 2019/20
        {{ new Date().getFullYear() }}
      </div>
    </v-content>
  </v-app>
</template>

