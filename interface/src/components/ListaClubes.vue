<template>
    <v-card class="ma-2">
        <v-card-title class="indigo darken-4 white--text" dark>
            Liga Nos: Temporada "2019/20": Lista dos Clubes na liga
            <v-spacer></v-spacer>
            <v-text-field
              v-model="filtrar"
              label="Filtrar"
              single-line
              hide-details
              dark
            ></v-text-field>
        </v-card-title>
    </v-card>

</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

import { mdiClubOpen } from '@mdi/js';

export default {
  name: 'ListaClubes',

  data: () => ({
    hfilmes: [
      {text: "Título", sortable: true, value: 'titulo', class: 'subtitle-1'},
      {text: "Data", sortable: true, value: 'data', class: 'subtitle-1'},
      {text: "Língua", sortable: true, value: 'lingua', class: 'subtitle-1'},
      {text: "Duração", sortable: true, value: 'duracao', class: 'subtitle-1'},
      {text: "Popularidade", sortable: true, value: 'pop', class: 'subtitle-1', filterable: false},
      {text: "Operações", value: 'ops', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 

    filmes: [],
    filtrar: "",
    verFilme: mdiClubOpen
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/clubes");
      this.filmes = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraFilme: function(item){
      alert('Cliquei no filme: ' + JSON.stringify(item));
      this.$router.push("/filmes/" + item.idFilme);
    }
  }
  
}
</script>