<template>
    <ConsultaJogador :idJogador="$route.params.id" />
</template>

<script>
// @ is an alias to /src
import ConsultaJogador from '@/components/ConsultaJogador.vue'

export default {
  name: 'Consulta de um jogador',
  components: {
    ConsultaJogador
  }
}
</script>

<style>
    .info-label {
      color: indigo;
      padding: 5px;
      font-weight: 400;
      width: 100%;
      background-color: #e0f2f1;
      font-weight: bold;
    }

    .info-content {
      padding: 5px;
      width: 100%;
      border: 1px solid #1a237e;
    }
</style>