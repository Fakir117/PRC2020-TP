<template>
  <v-card>
    <v-card-title class="indigo darken-4 white--text" dark>
      Liga Nos "Temporada 2019/20": Informações sobre a liga
      <v-spacer></v-spacer>
    </v-card-title> 
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" @click="$router.go(-1)">Voltar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;


export default {
  name: 'ConsultaLiga',

  props: [],

  data: () => ({
    liga: {},
    //ligaCarregado: false
    
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/about/");
      this.liga = response.data;
      //this.ligaCarregado = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {}
  
}
</script>