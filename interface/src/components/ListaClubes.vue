<template>
    <v-card class="ma-2">
        <v-card-title class="indigo darken-4 white--text" dark>
            Liga Nos "Temporada 2019/20": Clubes da liga
            <v-spacer></v-spacer>
            <v-chip
              class="mr-2"
              @click="about()"
            >
              <v-icon left>mdi-information</v-icon>
              About
            </v-chip>
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
             :headers="hclubes"
             :items="clubes"
             :footer-props="footer_props"
             :search="filtrar"
            >
                <template v-slot:no-data>
                    <v-alert :value="true" color="warning" icon="warning">
                        Ainda não foi possível apresentar uma lista dos clubes...
                    </v-alert>
                </template>
                <template v-slot:item.ops="{ item }">
                    <v-icon
                     @click="mostraClube(item)"
                    >
                        {{ verClube }}
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="blue darken-1" href="/jogadores">Jogadores</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

import { mdiAccount } from '@mdi/js';

//import About from '@/components/About.vue'

export default {
  name: 'ListaClubes',

  data: () => ({
    hclubes: [
      {text: "Classificação", sortable: true, value: 'pos', class: 'subtitle-1'},
      {text: "Nome", sortable: true, value: 'nome', class: 'subtitle-1'},
      {text: "Ano de fundação", sortable: true, value: 'fundacao', class: 'subtitle-1', filterable: false},
      {text: "Valor de mercado", sortable: true, value: 'valor', class: 'subtitle-1', filterable: false},
      {text: "Operações", value: 'ops', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 

    clubes: [],
    filtrar: "",
    verClube: mdiAccount
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/clubes");
      this.clubes = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraClube: function(item){
      //alert('Cliquei no clube: ' + JSON.stringify(item));
      this.$router.push("/clubes/" + item.idClube);
    },
    
    about: function(){
      //alert(About)
      alert('Liga NOS 19/20');
      this.$router.push("/about");
    },
      
  }
  
}
</script>