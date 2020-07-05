<template>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-app-bar-nav-icon :style="{'color': 'white'}"></v-app-bar-nav-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title> <a href="/about"><v-btn text small>About</v-btn></a></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title> <a href="/clubes"><v-btn text small>Clubes</v-btn></a></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title> <a href="/jogadores"><v-btn text small>Jogadores</v-btn></a></v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title> <a href="/estadios"><v-btn text small>Estadios</v-btn></a></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
</template>
