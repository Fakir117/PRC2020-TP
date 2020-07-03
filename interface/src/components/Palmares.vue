<template>
    <v-row v-if="lista.length > 0">
        <v-col cols="2">
            <div class="info-label">Palmares</div>
        </v-col>
        <v-col>
            <div class="info-content">
                <ul>
                    <li>
                        <span v-for="p in lista" :key="p.pal">
                            <a href="#">{{ p.taca }}</a>;
                        </span>
                    </li>
                </ul>
            </div>
        </v-col>
    </v-row>
</template>

<script>

export default {
  name: 'Palmares',
  props: ["lista"],
}
</script>