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
        ?liga a c:Liga;
                    c:ano_de_fundacao ?fundacao;  
                    c:temporada_atual ?temporada;
                    c:atual_Campeao ?camp.
    	?camp c:nome ?clube.
        optional{ ?liga c:campeao_recordista ?record.
    			  ?record c:nome ?recordClub.}
        optional{ ?liga c:recorde_melhor_ataque ?ataque.}
        optional{ ?liga c:recorde_melhor_defesa ?def.}
        optional{ ?liga c:recorde_titulos ?tit.}
        optional{ ?liga c:total_equipas ?equipas.}
        optional{ ?liga c:total_jogadores ?jog.}
        optional{ ?liga c:total_jogadores_estrangeiros ?jogEstrg.}
        optional{ ?liga c:jogador_mais_valioso ?jogVal.
    			  ?jogVal c:nome ?jogador.}
        optional{ ?liga c:valor_mercado ?valor.} 
        bind(strafter(str(?liga), 'LigaNos#') as ?idLiga) . 
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        //return myNormalize(response.data)
        var atomica = myNormalize(response.data)
        
        var liga = {
            info : atomica[0]
        }
        return liga
        
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
        bind(strafter(str(?clube), 'LigaNos#') as ?idClube) .           
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

Liga.getJogadoresDoClube = async function(idClube){
    var query = `select ?jogador ?nome ?pos ?camisola ?idade ?idJogador where{
        c:${idClube} c:temJogador ?jogador.
        ?jogador c:nome ?nome.
        ?jogador c:posicao ?pos.
        ?jogador c:camisola ?camisola.
        ?jogador c:idade ?idade.
        bind(strafter(str(?jogador), 'LigaNos#') as ?idJogador) .
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

Liga.getPalmaresDoClube = async function(idClube){
    var query = `select ?p ?taca ?pal where{
        c:${idClube} c:temPalmares ?p.
        ?p c:nome ?taca.
        bind(strafter(str(?p), 'LigaNos#') as ?pal) .
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

Liga.getListaJogadores = async function(){
    var query = `select ?jogador ?nome ?pos ?camisola ?idade ?idJogador where{
        ?jogador c:nome ?nome.
        ?jogador c:posicao ?pos.
        ?jogador c:camisola ?camisola.
        ?jogador c:idade ?idade.
        bind(strafter(str(?jogador), 'LigaNos#') as ?idJogador) .
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

async function getJogadorAtomica(idJogador){
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
                  c:valor_mercado ?valor
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

Liga.getNacionalidadeJogador = async function(idJogador){
    var query = `select ?nacao ?nacionalidade where{
        c:${idJogador} c:temNacionalidade ?nacao.
        ?nacao c:nome ?nacionalidade.
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
  
Liga.getClube = async function(idClube){
    try{
        var atomica = await getClubeAtomica(idClube)
        var jogadores = await Liga.getJogadoresDoClube(idClube)
        var palmares = await Liga.getPalmaresDoClube(idClube)

        var clube = {
            info : atomica[0],          //campo: variavel
            jogadores : jogadores,
            palmares : palmares
        }
        return clube
    }
    catch(e){
        throw(e)
    }
}

Liga.getJogador = async function(idJogador){
    try{
        var atomica = await getJogadorAtomica(idJogador)
        var nacionalidade = await Liga.getNacionalidadeJogador(idJogador)

        var jogador = {
            info : atomica[0],         
            nacionalidade : nacionalidade
        }
        return jogador
    }
    catch(e){
        throw(e)
    }
}

