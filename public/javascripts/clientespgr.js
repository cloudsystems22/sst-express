let btnAval = document.getElementById('btn-aval');
let relatorioGes = document.getElementById('planilhas');
let meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
]
let diasemana = [
    'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'
]
function clienteSetores(id){
    let data = document.getElementById('hddData' + id).value;
    relatorioGes.innerText = '';
    let settings = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({ id, data })
    }
    fetch('/relavisual/clienteSetor', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            //dados = JSON.parse(dados);
            console.log(dados);
            let setores = dados[0].Setores;
            
            setores.forEach(s => {
                //cabeçalho
                if(s.setores_riscos.length > 0){
                    let tableGes = document.createElement('table');
                    let headerGes = document.createElement('thead');
                    let trGes = document.createElement('tr');
                    let tdHed = document.createElement('td');
                    let tdData = document.createElement('td');
                    
                    //atribuir 
                    tableGes.setAttribute('class', 'table-ges');
                    headerGes.setAttribute('class', 'header-ges');
    
                    tdHed.innerText = 'TABELA DE INDICAÇÃO DE PERIGOS POR GES (Grupo de Exposição Similar)';
                    //TODO: Organizar datas
                    let date = s.setores_riscos[0].perigos_ges[0].data;
                    let data = new Date(date+" 00:00:00");
                    let dia = data.getDay();
                    let mes = data.getMonth();
                    let ano = data.getFullYear();
                    tdData.innerText = diasemana[dia] + ", " + data.getDate() + " de " + meses[mes] + " de " + ano;
    
                    trGes.appendChild(tdHed);
                    trGes.appendChild(tdData);
                    headerGes.appendChild(trGes);
    
                    tableGes.appendChild(headerGes);
                    
                    //setor descrição
                    let tableSetor = document.createElement('table');
                    let headerSetor = document.createElement('thead');
                    let tridGes = document.createElement('tr');
                    let trSetorum = document.createElement('tr');
                    let trDescrum = document.createElement('tr');
                    let trDescrdois = document.createElement('tr');
                    let tdGesId = document.createElement('td');
                    let spanIdGes = document.createElement('span');
                    let tdLblSetor = document.createElement('td');
                    let tdSetor = document.createElement('td');
                    let tdLblNumFun = document.createElement('td');
                    let tdNumFun = document.createElement('td');
                    let tdLblFase = document.createElement('td');
                    let tdFase = document.createElement('td');
                    let tdLblDescr = document.createElement('td');
                    let tdDescr = document.createElement('td');

                    tableSetor.setAttribute('class', 'table-ges');
                    headerSetor.setAttribute('class', 'head-setor');
                    spanIdGes.setAttribute('class', 'id-ges');
                    tdGesId.setAttribute('class', 'td-normal');
                    tdGesId.setAttribute('colspan', '6');
                    tdLblSetor.setAttribute('class', 'td-normal');
                    tdSetor.setAttribute('class', 'td-bold');
                    tdLblNumFun.setAttribute('class', 'td-normal');
                    tdNumFun.setAttribute('class', 'td-bold');
                    tdLblFase.setAttribute('class', 'td-normal');
                    tdFase.setAttribute('class', 'td-bold');
                    tdLblDescr.setAttribute('class', 'td-normal');
                    tdLblDescr.setAttribute('colspan', '6');
                    tdDescr.setAttribute('class', 'td-bold');
                    tdDescr.setAttribute('colspan', '6');

                    tdGesId.innerText = 'GES:';
                    spanIdGes.innerText = s.id;
                    tdLblSetor.innerText = 'Setor:';
                    tdSetor.innerText = s.setores;
                    tdLblNumFun.innerText = 'Total de trabalhadores expostos:';
                    let totalFunc = (parseInt(s.num_func_m) + parseInt(s.num_func_f));
                    tdNumFun.innerText = s.num_func_m + ' masc. ' + s.num_func_f + ' fem. ' + 'total:' +  totalFunc;
                    tdLblFase.innerText = 'Fase:';
                    //TODO: Organizar por tipo de fases;
                    tdFase.innerText = s.setores_riscos[0].perigos_ges[0].fase;
                    
                    tdLblDescr.innerText = 'Descrição do setor:';
                    tdDescr.innerText = s.descricao;

                    tdGesId.appendChild(spanIdGes);
                    tridGes.appendChild(tdGesId);
                    trSetorum.appendChild(tdLblSetor);
                    trSetorum.appendChild(tdSetor);
                    trSetorum.appendChild(tdLblNumFun);
                    trSetorum.appendChild(tdNumFun);
                    trSetorum.appendChild(tdLblFase);
                    trSetorum.appendChild(tdFase);
                    trDescrum.appendChild(tdLblDescr);
                    trDescrdois.appendChild(tdDescr);

                    headerSetor.appendChild(tridGes);
                    headerSetor.appendChild(trSetorum);
                    headerSetor.appendChild(trDescrum);
                    headerSetor.appendChild(trDescrdois);

                    tableSetor.appendChild(headerSetor);

                    //Tabela riscos
                    let tableAval = document.createElement('table');
                    let headAval = document.createElement('thead');
                    let trHRisco = document.createElement('tr');
                    let tdAgent = document.createElement('td');
                    let tdPerigo = document.createElement('td');
                    let tdDano = document.createElement('td');
                    let tdLTe = document.createElement('td');
                    let tdFontg = document.createElement('td');
                    let tdIntens = document.createElement('td');
                    let tdTecnic = document.createElement('td');
                    let tdP = document.createElement('td');
                    let tdG = document.createElement('td');
                    let tdRisc = document.createElement('td');
                    let tdIN = document.createElement('td');
                    let tdAcoes = document.createElement('td');
                    let tdMonit = document.createElement('td');                 

                    tdAgent.innerText = 'Agente / Tipo';
                    tdPerigo.innerText = 'Perigo/ fonte de risco';
                    tdDano.innerText = 'Dano';
                    tdLTe.innerText = 'Limite de Exposição';
                    tdFontg.innerText = 'Fonte geradora';
                    tdIntens.innerText = 'Intensidade';
                    tdTecnic.innerText = 'Tecnica';
                    tdP.innerText = 'P';
                    tdG.innerText = 'G';
                    tdRisc.innerText = 'Risco';
                    tdIN.innerText = 'IN';
                    tdAcoes.innerText = 'Ações';
                    tdMonit.innerText = 'Monitoramento';

                    tableAval.setAttribute('class', 'table-aval');
                    tableAval.setAttribute('id', 't-risco' + s.id);
                    let tRisco = document.getElementById('t-risco' + s.id);

                    headAval.setAttribute('class', 'head-aval');

                    trHRisco.appendChild(tdAgent);
                    trHRisco.appendChild(tdPerigo);
                    trHRisco.appendChild(tdDano);
                    trHRisco.appendChild(tdLTe);
                    trHRisco.appendChild(tdFontg);
                    trHRisco.appendChild(tdIntens);
                    trHRisco.appendChild(tdTecnic);
                    trHRisco.appendChild(tdP);
                    trHRisco.appendChild(tdG);
                    trHRisco.appendChild(tdRisc);
                    trHRisco.appendChild(tdIN);
                    trHRisco.appendChild(tdAcoes);
                    trHRisco.appendChild(tdMonit);

                    headAval.appendChild(trHRisco);
                    tableAval.appendChild(headAval);

                    //inserir avaliações
                    let perBody = document.createElement('tbody');
                    perBody.setAttribute('class', 'corpo-aval');
                                                          
                    let perigos = s.setores_riscos;
                    console.log(perigos);
                    perigos.forEach(p =>{
                        let trAval = document.createElement('tr');
                        let tdRAgent = document.createElement('td');
                        let tdRPerigo = document.createElement('td');
                        let tdRDano = document.createElement('td');
                        let tdRLTe = document.createElement('td');
                        let tdRFontg = document.createElement('td');
                        let tdRIntens = document.createElement('td');
                        let tdRTecnic = document.createElement('td');
                        let tdRP = document.createElement('td');
                        let tdRG = document.createElement('td');
                        let tdRRisc = document.createElement('td');
                        let tdRIN = document.createElement('td');
                        let tdRAcoes = document.createElement('td');
                        let tdRMonit = document.createElement('td');

                        tdRAgent.innerText = p.agentes_riscos.tipo;
                        tdRPerigo.innerText = p.agentes_riscos.risco + " " + p.perigos_ges[0].descr_risco;
                        tdRDano.innerText = p.perigos_ges[0].danos;
                        tdRLTe.innerText = p.perigos_ges[0].lim_expo;
                        tdRFontg.innerText = p.perigos_ges[0].fonte_geradora;
                        tdRIntens.innerText = p.perigos_ges[0].intensidade;
                        tdRTecnic.innerText = p.perigos_ges[0].tecnica_util;
                        tdRP.innerText = p.perigos_ges[0].pequ;
                        tdRG.innerText = p.perigos_ges[0].grand;
                        tdRRisc.innerText = p.perigos_ges[0].risco;
                        tdRIN.innerText = p.perigos_ges[0].inn;
                        tdRAcoes.innerText = p.perigos_ges[0].defin_acoes;
                        tdRMonit.innerText = p.perigos_ges[0].monitoramento;

                        trAval.appendChild(tdRAgent);
                        trAval.appendChild(tdRPerigo);
                        trAval.appendChild(tdRDano);
                        trAval.appendChild(tdRLTe);
                        trAval.appendChild(tdRFontg);
                        trAval.appendChild(tdRIntens);
                        trAval.appendChild(tdRTecnic);
                        trAval.appendChild(tdRP);
                        trAval.appendChild(tdRG);
                        trAval.appendChild(tdRRisc);
                        trAval.appendChild(tdRIN);
                        trAval.appendChild(tdRAcoes);
                        trAval.appendChild(tdRMonit);
                        perBody.appendChild(trAval);

                    });
                    tableAval.appendChild(perBody)
                    //tRisco.appendChild(perBody);

                    //incluir na div
                    relatorioGes.appendChild(tableGes);
                    relatorioGes.appendChild(tableSetor);
                    relatorioGes.appendChild(tableAval);
                    //console.log(ger);

                }
                
            });
            
                        
        }).catch(function (error){
            alert("Erro ao carregar relatório!" + error);
        })
}


