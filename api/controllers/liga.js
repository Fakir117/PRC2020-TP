var Liga = module.exports
const axios = require('axios')

function myNormalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo  
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#>
`

var getLink = "http://localhost:7200/repositories/ligaNos" + "?query=" 

Liga.getInformacao = async function(idLiga){
    var query = `select * where{
        c:${idLiga} a c:Liga.
        c:${idLiga} c:ano_de_fundacao ?fundacao.   
        c:${idLiga} c:temporada_atual ?temporada.
        c:${idLiga} c:atual_campeao ?camp.
        optional{ c:${idLiga} c:campeao_recordista ?record.}
        optional{ c:${idLiga} c:recorde_melhor_ataque ?ataque.}
        optional{ c:${idLiga} c:recorde_melhor_defesa ?def.}
        optional{ c:${idLiga} c:recorde_titulos ?tit.}
        optional{ c:${idLiga} c:total_equipas ?equipas.}
        optional{ c:${idLiga} c:total_jogadores ?jog.}
        optional{ c:${idLiga} c:total_jogadores_estrangeiros ?jogEstrg.}
        optional{ c:${idLiga} c:jogador_mais_valioso ?jogVal.}
        optional{ c:${idLiga} c:valor_mercado ?valor.}       
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Liga.getListaClubes = async function(){
    var query = `select * where{
        ?clube c:nome ?nome.
        ?clube c:classificacao ?pos.
        ?clube c:valor_mercado ?valor.
        ?clube c:ano_de_fundacao ?fundacao.           
    }
    order by ?nome ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Liga.getClube = async function(idClube){
    var query = `select * where{
            c:${idClube} rdf:type c:Clube.
            c:${idClube} c:nome ?nome.
            c:${idClube} c:ano_de_fundacao ?fundacao.
            c:${idClube} c:anos_na_liga ?anos.
            c:${idClube} c:classificacao ?class.
            c:${idClube} c:balanco_transferencias ?balanco.
            c:${idClube} c:estadio ?estadio.
            c:${idClube} c:valor_mercado ?valor.    
        }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Liga.getJogadoresDoClube = async function(idClube){
    var query = `select ?jogador ?nome ?pos ?camisola ?idade where{
        c:${idClube} c:temJogador ?jogador.
        ?jogador c:nome ?nome.
        ?jogador c:posicao ?pos.
        ?jogador c:camisola ?camisola.
        ?jogador c:idade ?idade.
    } ` 
    //bind(strafter(str(?g), 'LigaNos#') as ?jogador) .
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Liga.getListaJogadores = async function(){
    var query = `select ?jogador ?nome ?pos ?camisola ?idade where{
        ?jogador c:nome ?nome.
        ?jogador c:posicao ?pos.
        ?jogador c:camisola ?camisola.
        ?jogador c:idade ?idade.
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Liga.getJogador = async function(idJogador){
    var query = `select * where{
        c:${idJogador} a c:Jogador;
                  c:nome ?nome;
                  c:idade ?idade;
                  c:posicao ?pos;
                  c:camisola ?camisola;
                  c:altura ?altura;
                  c:pe ?pe;
                  c:golos_marcados ?golos;
                  c:assistencias ?assist;
                  c:clube_anterior ?clubAnt;
                  c:validade_contrato ?contrato;
                  c:valor_mercado ?valor;
                  c:temNacionalidade ?nacional
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

async function getClubeAtomica(idClube){
    var query = `select * where{
        c:${idClube} rdf:type c:Clube.
        c:${idClube} c:nome ?nome.
        c:${idClube} c:ano_de_fundacao ?fundacao.
        c:${idClube} c:anos_na_liga ?anos.
        c:${idClube} c:classificacao ?class.
        c:${idClube} c:balanco_transferencias ?balanco.
        c:${idClube} c:estadio ?estadio.
        c:${idClube} c:valor_mercado ?valor.    
    } ` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}
  
Liga.getClubes = async function(idClube){
    try{
        var atomica = await getClubeAtomica(idClube)
        var jogadores = await Liga.getJogadoresDoClube(idClube)

        var clube = {
            info : atomica[0],          //campo: variavel
            jogadores : jogadores,
        }
        return clube
    }
    catch(e){
        throw(e)
    }
}

