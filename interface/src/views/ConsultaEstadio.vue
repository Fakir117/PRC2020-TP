<template>
    <ConsultaEstadio :idEstadio="$route.params.id" />
</template>

<script>
// @ is an alias to /src
import ConsultaEstadio from '@/components/ConsultaEstadio.vue'

export default {
  name: 'Consulta de um estadio',
  components: {
    ConsultaEstadio
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
