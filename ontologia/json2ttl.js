const jsonfile = require("jsonfile")
const file = "database_liga_nos.json"
jsonfile.readFile(file)
    .then(obj => {
        var clubes = []
        var jogadores = []
        var estadio = []
        var palmares = []
        var nacionalidade = []
        console.log("\n### LIGA ###\n")
        for(var i=0; i<obj.length; i++){
            var liga = ""
            liga += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + obj[i].nome_da_liga.replace(/\W/g, '_') + '\n'
            liga += ":" + obj[i].nome_da_liga.replace(/\W/g, '_') + " rdf:type owl:NamedIndividual, \n\t\t\t:Liga;\n"
            liga += "\t\t\t:ano_de_fundacao \"" + obj[i].data_de_criação + "\";\n"
            liga += "\t\t\t:temporada_atual \"" + obj[i].temporada_atual + "\";\n"
            liga += "\t\t\t:atual_campeao :" + removerAcentos(obj[i].atual_campeão).replace(/\W/g,'_') + ";\n"
            liga += "\t\t\t:campeao_recordista :" + removerAcentos(obj[i].campeão_recordista).replace(/\W/g,'_') + ";\n"
            liga += "\t\t\t:recorde_titulos \"" + obj[i].recorde_títulos + "\";\n"
            liga += "\t\t\t:total_jogadores \"" + obj[i].número_de_jogadores + "\";\n"
            liga += "\t\t\t:total_jogadores_estrangeiros \"" + obj[i].número_de_jogadores_estrangeiros + "\";\n"
            liga += "\t\t\t:total_equipas \"" + obj[i].número_de_equipas + "\";\n"
            liga += "\t\t\t:jogador_mais_valioso :" + removerAcentos(obj[i].jogador_mais_valioso).replace(/\W/g,'_') + ";\n"
            liga += "\t\t\t:valor_mercado \"" + obj[i].valor_de_mercado + "\";\n"
            liga += "\t\t\t:pagina_oficial \"" + obj[i].link + "\";\n"
            
            obj[i].equipas.forEach(equipa => {
                if(clubes.indexOf(equipa.nome) == -1){
                    clubes.push(equipa)
                }
                liga += "\t:temClube :" + removerAcentos(equipa.nome).replace(/\W/g,'_') +";\n"
            })
            liga += "\t\t\t:ano_de_fundacao \"" + obj[i].data_de_criação + "\";\n"
            liga += "\t\t\t:nome \"" + obj[i].nome_da_liga + "\".\n"
            console.log(liga)
        }
        console.log("\n### CLUBES ###\n")
        for(var i=0; i<clubes.length; i++){
            var clube = ""
            clube += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + removerAcentos(clubes[i].nome).replace(/\W/g, '_') + '\n'
            clube += ":" + removerAcentos(clubes[i].nome).replace(/\W/g, '_') + " rdf:type owl:NamedIndividual,\n\t\t\t :Clube;\n";
            clube += "\t\t\t :ano_de_fundacao \"" + clubes[i].ano_de_fundacao + "\";\n\n"
            clube += "\t\t\t :classificacao \"" + clubes[i].posicao + "\";\n\n"
            clube += "\t\t\t :anos_na_liga \"" + clubes[i].anos_na_liga + "\";\n\n"
            clube += "\t\t\t :estadio \"" + clubes[i].estádio + "\";\n\n"
            clube += "\t\t\t :balanco_transferencias \"" + clubes[i].balanço_transferências + "\";\n\n"
            clube += "\t\t\t :valor_mercado \"" + clubes[i].valor_de_mercado + "\";\n\n"
            clube += "\t\t\t :pagina_oficial \"" + clubes[i].link + "\";\n\n"
            clube += "\t\t\t :simbolo \"" + clubes[i].simbolo + "\";\n\n"
            
            clubes[i].palmarés.forEach(taca => {
                if(palmares.indexOf(taca) == -1){
                    palmares.push(taca)
                }
                clube += "\t:temPalmares :" + removerAcentos(taca.designação).replace(/\W/g,'_') +";\n"
            })

            clubes[i].estádio.forEach(est => {
                if(estadio.indexOf(est) == -1){
                    estadio.push(est)
                }
                clube += "\t:temEstadio :" + removerAcentos(est.nome).replace(/\W/g,'_') +";\n"
            })
            
            clubes[i].plantel.forEach(jog => {
                if(jogadores.indexOf(jog) == -1){
                    jogadores.push(jog)
                }
                clube += "\t:temJogador :" + removerAcentos(jog.nome).replace(/\W/g,'_') + "_" + jog.número +";\n"
            })

            clube += "\t\t\t :nome \"" + clubes[i].nome.replace(/\"/g,'\'') + "\".\n\n"
            console.log(clube)    
        }
        console.log("\n### JOGADORES ###\n")
        for(var i=0; i<jogadores.length; i++){
            var jogador = ""
            jogador += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + removerAcentos(jogadores[i].nome).replace(/\W/g, '_') + "_" + jogadores[i].número + '\n'
            jogador += ":" + removerAcentos(jogadores[i].nome).replace(/\W/g, '_') + "_" + jogadores[i].número + " rdf:type owl:NamedIndividual,\n\t\t\t :Jogador;\n";
            jogador += "\t\t\t :posicao \"" + jogadores[i].posicao + "\";\n\n"
            jogador += "\t\t\t :idade \"" + jogadores[i].idade + "\";\n\n"
            jogador += "\t\t\t :camisola \"" + jogadores[i].número + "\";\n\n"
            jogador += "\t\t\t :altura \"" + jogadores[i].altura + "\";\n\n"
            jogador += "\t\t\t :pe \"" + jogadores[i].pé + "\";\n\n"
            jogador += "\t\t\t :clube_anterior \"" + jogadores[i].clube_anterior + "\";\n\n"
            jogador += "\t\t\t :validade_contrato \"" + jogadores[i].validade_contrato + "\";\n\n"
            jogador += "\t\t\t :valor_mercado \"" + jogadores[i].valor_de_mercado + "\";\n\n"
            jogador += "\t\t\t :golos_marcados \"" + jogadores[i].golos_na_epoca + "\";\n\n"
            jogador += "\t\t\t :assistencias \"" + jogadores[i].assistencias_na_epoca + "\";\n\n"
            
            jogadores[i].nacionalidade.forEach(pais => {
                if(nacionalidade.indexOf(pais) == -1){
                    nacionalidade.push(pais)
                }
                jogador += "\t:temNacionalidade :" + removerAcentos(pais).replace(/\W/g,'_') +";\n"
            })

            jogador += "\t\t\t :nome \"" + jogadores[i].nome.replace(/\"/g,'\'') + "\".\n\n"
            console.log(jogador)    
        }
        console.log("\n### Nacionalidade ###\n")
        nacionalidade.forEach(a => {
            var pais = ""
            pais += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + removerAcentos(a).replace(/\W/g, '_') + '\n'
            pais += ":" + removerAcentos(a).replace(/\W/g, '_') + " a owl:NamedIndividual, :Nacionalidade;\n";
            pais += "\t :nome \"" + a.replace(/\"/g,'\'') + "\".\n\n"
            console.log(pais) 
        })
        console.log("\n### Palmarés ###\n")
        for(var i=0; i<palmares.length; i++){
            var taca = ""
            taca += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + removerAcentos(palmares[i].designação).replace(/\W/g, '_') + '\n'
            taca += ":" + removerAcentos(palmares[i].designação).replace(/\W/g, '_') + " rdf:type owl:NamedIndividual,\n\t\t\t :Palmares;\n";
            taca += "\t\t\t :nome \"" + palmares[i].designação.replace(/\"/g,'\'') + "\".\n\n"
            console.log(taca)    
        }
        console.log("\n### Estádio ###\n")
        estadio.forEach(e => {
            var estad = ""
            estad += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + removerAcentos(e.nome).replace(/\W/g, '_') + '\n'
            estad += ":" + removerAcentos(e.nome).replace(/\W/g, '_') + " rdf:type owl:NamedIndividual,\n\t\t\t :Estadio;\n";
            estad += "\t\t\t :imagem \"" + e.imagem.replace(/\"/g,'\'') + "\";\n\n"
            estad += "\t\t\t :coordenadas \"" + e.coordenadas.replace(/\"/g,'\'') + "\";\n\n"
            estad += "\t\t\t :nome \"" + e.nome.replace(/\"/g,'\'') + "\".\n\n"
            console.log(estad) 
        })
        /*
        for(var i=0; i<estadio.length; i++){
            var estad = ""
            estad += "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/LigaNos#" + removerAcentos(estadio[i].nome).replace(/\W/g, '_') + '\n'
            estad += ":" + removerAcentos(estadio[i].nome).replace(/\W/g, '_') + " rdf:type owl:NamedIndividual,\n\t\t\t :Estadio;\n";
            estad += "\t\t\t :imagem \"" + estadio[i].imagem.replace(/\"/g,'\'') + "\";\n\n"
            estad += "\t\t\t :coordenadas \"" + estadio[i].coordenadas.replace(/\"/g,'\'') + "\";\n\n"
            estad += "\t\t\t :nome \"" + estadio[i].nome.replace(/\"/g,'\'') + "\".\n\n"
            console.log(estad)    
        }
        */
    })

    function removerAcentos( newStringComAcento ) {
        var string = newStringComAcento;
          var mapaAcentosHex 	= {
            a : /[\xE0-\xE6]/g,
            A : /[\xC0-\xC6]/g,
            e : /[\xE8-\xEB]/g,
            E : /[\xC8-\xCB]/g,
            i : /[\xEC-\xEF]/g,
            I : /[\xCC-\xCF]/g,
            o : /[\xF2-\xF6]/g,
            O : /[\xD2-\xD6]/g,
            u : /[\xF9-\xFC]/g,
            U : /[\xD9-\xDC]/g,
            c : /\xE7/g,
            C : /\xC7/g,
            n : /\xF1/g,
            N : /\xD1/g,
          };
      
          for ( var letra in mapaAcentosHex ) {
              var expressaoRegular = mapaAcentosHex[letra];
              string = string.replace( expressaoRegular, letra );
          }
      
          return string;
      }