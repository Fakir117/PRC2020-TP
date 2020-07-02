<template>
    <ConsultaClube :idClube="$route.params.id" />
</template>

<script>
// @ is an alias to /src
import ConsultaClube from '@/components/ConsultaClube.vue'

export default {
  name: 'Consulta de um clube',
  components: {
    ConsultaClube
  }
}
</script>
