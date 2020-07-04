<template>
    <v-row v-if="lista.length > 0">
        <v-col cols="2">
            <div class="info-label">Nacionalidades</div>
        </v-col>
        <v-col>
            <div class="info-content">
                <ul>
                    <li>
                        <span v-for="n in lista" :key="n.nacionalidade">
                            {{ n.nacionalidade }};
                        </span>
                    </li>
                </ul>
            </div>
        </v-col>
    </v-row>
</template>

<script>

export default {
  name: 'Nacionalidade',
  props: ["lista"],
}
</script>
