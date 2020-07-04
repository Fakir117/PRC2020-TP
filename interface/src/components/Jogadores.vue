<template>
    <v-row v-if="lista.length > 0">
        <v-col cols="2">
            <div class="info-label">Jogadores</div>
        </v-col>
        <v-col>
            <div class="info-content">
                <ul>
                    <li>
                        <span v-for="j in lista" :key="j.idJogador"
                            @click="mostraJogador(j)"
                        >
                                <v-btn text small>{{ j.nome }};</v-btn>
                        </span>
                    </li>
                </ul>
            </div>
        </v-col>
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
  /*
  <span v-for="j in lista" :key="j.idJogador"
                            @click="mostraJogador(j.idJogador)"
                        >
                            {{ j.nome }};
                        </span>
  */
}
</script>
