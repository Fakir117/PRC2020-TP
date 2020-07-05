<template>
    <v-card class="ma-2">
        <v-card-title class="indigo darken-4 white--text" dark>
          <Menu/>
            Liga NOS "Temporada 2019/20": Lista de Estádios
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
                <template v-slot:item.clube="{ item }">
                  <a @click="mostraClube(item.c)">{{item.clube}}</a>
                </template>
                <template v-slot:item.coord="{ item }">
                  <a @click="myFunction('https://maps.google.com/?q='+item.coord)">{{item.coord}}</a>
                </template>
                <template v-slot:item.imagem="{ item }">
                    <v-avatar size="40px">
                        <img
                            :src=item.imagem
                            alt="simbolo"
                        >
                    </v-avatar>
                </template>
                <template v-slot:item.ops="{ item }">
                    <v-icon
                     @click="mostraEstadio(item)"
                    >
                        {{ verEstadio }}
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;

import Menu from '@/components/Menu.vue'

import { mdiAccount } from '@mdi/js';

export default {
  name: 'ListaEstadios',

  components: {
    Menu
  },

  data: () => ({
    hEstadios: [
      {text: "", value: 'imagem', class: 'subtitle-1', filterable: false},
      {text: "Nome", sortable: true, value: 'estadio', class: 'subtitle-1'},
      {text: "Clube", sortable: true, value: 'clube', class: 'subtitle-1'},
      {text: "Coordenadas", sortable: true, value: 'coord', class: 'subtitle-1', filterable: false},
      {text: "Operações", value: 'ops', class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [5, 10, 20, -1],
      "items-per-page-all-text": "Todos"
    }, 

    estadios: [],
    filtrar: "",
    verEstadio: mdiAccount
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
      //alert('Cliquei no estadio: ' + JSON.stringify(item));
      this.$router.push("/estadios/" + item.idEstadio);
    },
    
    about: function(){
      alert('Liga NOS 19/20');
      this.$router.push("/about");
    },

    myFunction: function(link) {
      window.open(link)
    },

    mostraClube: function(item){
      this.$router.push("/clubes/" + item);
    }

  }
  
}
</script>