<template>
  <v-card class="ma-2">
    <v-card-title class="indigo darken-4 white--text" dark>
      Liga Nos "Temporada 2019/20": Jogadores da liga
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filtrar"
        label="Filtrar"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hjogadores"
        :items="jogadores"
        :footer-props="footer_props"
        :search="filtrar"
      >
        <template v-slot:no-data>
          <v-alert :value="true" color="warning" icon="warning">
            Ainda não foi possível apresentar uma lista dos jogadores...
          </v-alert>
        </template>
        <template v-slot:item.ops="{ item }">
          <v-icon
            @click="mostraJogador(item)"
          >
            {{ verJogador }}
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" href="/clubes">Clubes</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;
//const lhost = 'http://localhost:6001/jogadores/'


import { mdiAccount } from '@mdi/js';

export default {
  name: 'ListaJogadores',

  data: () => ({
    hjogadores: [
      {text: "Nome", sortable: true, value: 'nome', class: 'subtitle-1'},
      {text: "Posição", sortable: true, value: 'pos', class: 'subtitle-1'},
      {text: "Camisola", sortable: true, value: 'camisola', class: 'subtitle-1'},
      {text: "Idade", sortable: true, value: 'idade', class: 'subtitle-1'},
      {text: "Operações", value: 'ops', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, -1],
      "items-per-page-all-text": "Todos"
    }, 

    jogadores: [],
    filtrar: "",
    verJogador: mdiAccount
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/jogadores");
      this.jogadores = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraJogador: function(item){
      alert('Cliquei no jogador: ' + JSON.stringify(item));
      this.$router.push("/jogadores/" + item.idJogador);
    }
  }
}

</script>