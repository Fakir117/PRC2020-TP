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

Liga.getInformacao = async function(){
    var query = `select * where{
        ?liga a c:Liga;
            c:nome ?nomeLiga;
            c:ano_de_fundacao ?fundacao;  
            c:temporada_atual ?temporada;
            c:atual_campeao ?camp.
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
        optional{ ?liga c:pagina_oficial ?pagina.} 
        bind(strafter(str(?liga), 'LigaNos#') as ?idLiga) . 
        bind(strafter(str(?camp), 'LigaNos#') as ?champ) . 
        bind(strafter(str(?record), 'LigaNos#') as ?recordChamp) . 
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
        ?clube c:simbolo ?simb.
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

Liga.getListaEstadios = async function(){
    var query = `select * where{
        ?e c:nome ?estadio.
        ?e c:coordenadas ?coord.
        ?e c:eEstadioDe ?clu.
        ?e c:imagem ?imagem.
        ?clu c:nome ?clube.
        bind(strafter(str(?e), 'LigaNos#') as ?idEstadio) .           
        bind(strafter(str(?clu), 'LigaNos#') as ?c) .           
    }
    order by ?estadio ` 
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
                  c:valor_mercado ?valor;
                  c:eJogadorDe ?c.
        ?c c:nome ?clube.
        bind(strafter(str(?c), 'LigaNos#') as ?clu) .  
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
    var query = `select distinct ?nacao ?nacionalidade where{
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

Liga.getEstadio = async function(idEstadio){
    var query = `select * where{
        c:${idEstadio} c:nome ?nome;
                c:coordenadas ?coord;
                c:eEstadioDe ?c;
                c:imagem ?imagem.
        ?c c:nome ?clube.
        bind(strafter(str(?c), 'LigaNos#') as ?clu) .  
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        //return myNormalize(response.data)
        var atomica = myNormalize(response.data)
        
        var estadio = {
            info : atomica[0]
        }
        return estadio
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
        c:${idClube} c:temEstadio ?est.
        ?est c:nome ?estadio.
        ?est c:imagem ?imgEstadio.
        ?est c:coordenadas ?coordEstadio.
        c:${idClube} c:valor_mercado ?valor.
        c:${idClube} c:pagina_oficial ?pagina.
        optional{c:${idClube} c:simbolo ?simb.}
        bind(strafter(str(?est), 'LigaNos#') as ?e) .  
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

