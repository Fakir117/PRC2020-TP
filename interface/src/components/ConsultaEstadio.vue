<template>
  <div>
      <v-alert type="warning" v-if="!clubeCarregado">
        A carregar informação...
      </v-alert>
      <v-card v-else>
            <v-card-title class="indigo darken-4 white--text" dark>
                <span class="headline">"{{ estadio.info.nome }}"</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Nome do Estádio</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ estadio.info.nome }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Clube</div>
                  </v-col>
                  <v-col>
                    <div class="info-content"><a @click="mostraClube(estadio.info.clu)">{{ estadio.info.clube }}</a></div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Coordenadas do Estádio</div>
                  </v-col>
                  <v-col>
                    <div class="info-content"><a @click="myFunction('https://maps.google.com/?q='+estadio.info.coord)">{{ estadio.info.coord }}</a></div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-img
                    :src="estadio.info.imagem"
                    max-height="500px"
                    max-width="500px"
                  ></v-img>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="$router.go(-1)">Voltar</v-btn>
            </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;


export default {
  name: 'ConsultaEstadio',

  props: ["idEstadio"],

  data: () => ({
    estadio: {},
    clubeCarregado: false
    
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/estadios/" + this.idEstadio);
      this.estadio = response.data;
      this.clubeCarregado = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    myFunction: function(link) {
      window.open(link)
    },
    mostraClube: function(item){
      this.$router.push("/clubes/" + item);
    }
  }
  
}
</script>
