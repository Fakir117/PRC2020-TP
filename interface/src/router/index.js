import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Página Principal',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/clubes',
    name: 'Página Principal',
    component: () => import('../views/Principal.vue')
  },
  {
    path: '/jogadores',
    name: 'Jogadores',
    component: () => import('../views/Jogadores.vue')
  },
  {
    path: '/clubes/:id',
    name: 'Consulta Clube',
    component: () => import('../views/ConsultaClube.vue')
  },
  {
    path: '/jogadores/:id',
    name: 'Consulta Jogador',
    component: () => import('../views/ConsultaJogador.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

