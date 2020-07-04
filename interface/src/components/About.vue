<template>
  <v-card>
    <v-card-title class="indigo darken-4 white--text" dark>
      <span class="headline">Liga Nos "Temporada 2019/20": Informações sobre a liga  "{{ liga.info.idLiga }}"</span>
      <v-spacer></v-spacer>
    </v-card-title> 
    <v-card-text>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Ano de Fundação</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.fundacao }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Temporada atual</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.temporada }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Campeão atual</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.clube }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Campeão Recordista de títulos</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.recordClub }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Recorde Títulos</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.tit }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Total Equipas</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.equipas }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Total Jogadores</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.jog }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Jogadores Estrangeiros</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.jogEstrg }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Jogadores mais valioso na temporada atual</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.jogador }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Valor de Mercado na Liga</div>
        </v-col>
        <v-col>
          <div class="info-content">{{ liga.info.valor }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="info-label">Página Oficial</div>
        </v-col>
        <v-col>
          <div class="info-content"><a :href=liga.info.pagina >{{ liga.info.pagina }}</a></div>
        </v-col>
      </v-row>
    </v-card-text>
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