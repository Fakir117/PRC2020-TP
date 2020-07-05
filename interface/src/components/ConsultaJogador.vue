<template>
  <div>
    <v-alert type="warning" v-if="!jogadorCarregado">
      A carregar informação...
    </v-alert>
    
    <v-card v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Jogador: "{{ jogador.info.nome }}"</span>
        </v-card-title>
        <v-card-text>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Clube Atual</div>
                  </v-col>
                  <v-col>
                    <div class="info-content"><a @click="mostraClube(jogador.info.clu)">{{ jogador.info.clube }}</a></div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Idade</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.idade }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Posição</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.pos }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Camisola</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.camisola }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Altura</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.altura }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Pé preferencial</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.pe }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Golos marcados na época atual</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.golos }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Assistências na época atual</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.assist }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Clube na época passada</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.clubAnt }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Validade do contrato</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.contrato }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <div class="info-label">Valor no mercado</div>
                  </v-col>
                  <v-col>
                    <div class="info-content">{{ jogador.info.valor }}</div>
                  </v-col>
                </v-row>

          <Nacionalidade :lista="jogador.nacionalidade" />
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

import Nacionalidade from '@/components/Nacionalidade.vue'

export default {
  name: 'ConsultaJogador',

  components: {
    Nacionalidade
  },

  props: ["idJogador"],

  data: () => ({
    jogador: {},
    jogadorCarregado: false,

  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/jogadores/" + this.idJogador);
      this.jogador = response.data;
      this.jogadorCarregado = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraClube: function(item){
      this.$router.push("/clubes/" + item);
    }
  }
  
}
</script>