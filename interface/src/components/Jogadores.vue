<template>
    <v-row v-if="lista.length > 0">
        <v-col cols="2">
            <div class="info-label">Jogadores</div>
        </v-col>
        <div class="info-content">
        <v-row>
            <v-col> Nome </v-col>
            <v-col> Número </v-col>
            <v-col> Posição </v-col>
            <v-col> Idade </v-col>
        </v-row>
        <v-row v-for="j in lista" :key="j.idJogador">
            <v-col @click="mostraJogador(j)"><v-btn text small>{{ j.nome }};</v-btn></v-col>
            <v-col> {{ j.camisola }}</v-col>
            <v-col> {{ j.pos }} </v-col>
            <v-col> {{ j.idade }} </v-col>
        </v-row>
    </div>
    </v-row>
</template>

<script>

export default {
  name: 'Jogadores',
  props: ["lista"],

  methods: {
    mostraJogador: function(item){
      this.$router.push("/jogadores/" + item.idJogador);
    }
  }
}
</script>
