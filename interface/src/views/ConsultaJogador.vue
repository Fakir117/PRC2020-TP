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
