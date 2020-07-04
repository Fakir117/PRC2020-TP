<template>
    <v-card class="ma-2">
        <v-card-title class="indigo darken-4 white--text" dark>
            Liga Nos "Temporada 2019/20": Lista de Estádios
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
             :headers="hEstadios"
             :items="estadios"
             :footer-props="footer_props"
             :search="filtrar"
            >
                <template v-slot:no-data>
                    <v-alert :value="true" color="warning" icon="warning">
                        Ainda não foi possível apresentar uma lista dos estadios...
                    </v-alert>
                </template>
                <template v-slot:item.imagem="{ item }">
                    <v-avatar size="40px">
                        <img
                            :src=item.imagem
                            alt="simbolo"
                        >
                    </v-avatar>
                </template>
            </v-data-table>
        </v-card-text>
        <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="blue darken-1" href="/clubes">Clubes</v-btn>
         <v-btn color="blue darken-1" href="/jogadores">Jogadores</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

//import { mdiAccount } from '@mdi/js';

export default {
  name: 'ListaEstadios',

  data: () => ({
    hEstadios: [
      {text: "", value: 'imagem', class: 'subtitle-1', filterable: false},
      {text: "Nome", sortable: true, value: 'estadio', class: 'subtitle-1'},
      {text: "Clube", sortable: true, value: 'clube', class: 'subtitle-1'},
      {text: "Coordenadas", sortable: true, value: 'coord', class: 'subtitle-1', filterable: false},
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 

    estadios: [],
    filtrar: "",
    //verEstadio: mdiAccount
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/estadios");
      this.estadios = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraEstadio: function(item){
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