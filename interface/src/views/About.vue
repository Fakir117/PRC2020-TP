<template>
    <About />
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'

export default {
  name: 'Informação',
  components: {
    About
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
