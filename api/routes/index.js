var express = require('express');
var router = express.Router();
var Liga = require('../controllers/liga')

router.get('/about', function(req, res, next) {
  Liga.getInformacao()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na informação sobre a Liga: ${e}`))
});

router.get('/clubes', function(req, res, next) {
  Liga.getListaClubes()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de Clubes: ${e}`))
});

router.get('/clubes/:id/jogadores', function(req, res) {
  Liga.getJogadoresDoClube(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos jogadores do clube ${req.params.id}: ${e}`))
});

router.get('/clubes/:id', function(req, res) {
  Liga.getClube(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do clube ${req.params.id}: ${e}`))
});

/* -----------------------------------------------------JOGADORES-------------------------------------------------------- */
router.get('/jogadores', function(req, res, next) {
  Liga.getListaJogadores()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de jogadores: ${e}`))
});

router.get('/jogadores/:id', function(req, res) {
  Liga.getJogador(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do jogador ${req.params.id}: ${e}`))
});

/* -----------------------------------------------------JOGADORES-------------------------------------------------------- */
router.get('/estadios', function(req, res, next) {
  Liga.getListaEstadios()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de estadios: ${e}`))
});

module.exports = router;
