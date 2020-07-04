<template>
    <div>
        <v-alert type="warning" v-if="!clubeCarregado">
            A carregar informação...
        </v-alert>
        <v-card v-else>
            <v-card-title class="indigo darken-4 white--text" dark>
                <span class="headline">"{{ clube.info.nome }}"</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Ano de Fundação</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.fundacao }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Classificação</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.class }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Anos na liga</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.anos }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Estádio</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.estadio }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Valor de Mercado</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.valor }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Balanço de Transferências</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.balanco }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Página Oficial</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ clube.info.pagina }}</div>
                  </v-col>
                </v-row>

                <Palmares :lista="clube.palmares" />
                <Jogadores :lista="clube.jogadores" />
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


import Palmares from '@/components/Palmares.vue'
import Jogadores from '@/components/Jogadores.vue'

export default {
  name: 'ConsultaClube',

  components: {
    Palmares, Jogadores
  },

  props: ["idClube"],

  data: () => ({
    clube: {},
    clubeCarregado: false
    
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/clubes/" + this.idClube);
      this.clube = response.data;
      //this.clube.jogadores.sort((a,b) => a.anome > b.anome? 1: -1);
      this.clubeCarregado = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {}
  
}
</script>
